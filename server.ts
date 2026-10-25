import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import dotenv from 'dotenv';
import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import { GoogleGenAI, Modality } from '@google/genai';
import {
  apiRouter,
  evaluateLocalSkylineIntent,
  SKYLINE_SYSTEM_INSTRUCTION,
} from './server/routes/api';

dotenv.config();

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '6mb' }));

  // Mount Full-Stack REST API Routes
  app.use('/api', apiRouter);

  const distPath = path.resolve(process.cwd(), 'dist');

  if (!isProd || !fs.existsSync(distPath)) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const httpServer = http.createServer(app);

  // Real-Time Gemini 3.8 Live Voice WebSocket Bridge (/ws/ai-live)
  const wss = new WebSocketServer({ server: httpServer, path: '/ws/ai-live' });

  wss.on('connection', async (clientWs: WebSocket) => {
    const apiKey = process.env.GEMINI_API_KEY;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let liveSession: any = null;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        liveSession = await ai.live.connect({
          model: 'gemini-3.8-live',
          config: {
            responseModalities: [Modality.AUDIO],
            systemInstruction: {
              parts: [{ text: SKYLINE_SYSTEM_INSTRUCTION }],
            },
          },
          callbacks: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onmessage: (msg: any) => {
              if (clientWs.readyState !== WebSocket.OPEN) return;
              const parts = msg?.serverContent?.modelTurn?.parts || [];
              for (const part of parts) {
                if (part?.inlineData?.data) {
                  clientWs.send(
                    JSON.stringify({
                      type: 'audio',
                      audioBase64: part.inlineData.data,
                    })
                  );
                }
                if (part?.text) {
                  clientWs.send(
                    JSON.stringify({
                      type: 'text',
                      text: part.text,
                    })
                  );
                }
              }
            },
            onerror: () => {
              // Handled gracefully via local intent fallback
            },
          },
        });
      } catch {
        liveSession = null;
      }
    }

    clientWs.send(
      JSON.stringify({
        type: 'ready',
        model: 'gemini-3.8-live',
        liveConnected: Boolean(liveSession),
      })
    );

    clientWs.on('message', (raw) => {
      try {
        const payload = JSON.parse(raw.toString()) as {
          type?: string;
          text?: string;
          audioBase64?: string;
        };

        if (payload.type === 'audio' && payload.audioBase64 && liveSession) {
          liveSession.sendRealtimeInput({
            media: {
              data: payload.audioBase64,
              mimeType: 'audio/pcm;rate=16000',
            },
          });
          return;
        }

        if (payload.type === 'prompt' && payload.text) {
          const fallback = evaluateLocalSkylineIntent(payload.text);
          clientWs.send(
            JSON.stringify({
              type: 'voice_reply',
              text: fallback.reply,
              needsHumanFallback: fallback.needsHumanFallback,
              model: 'gemini-3.8-live',
            })
          );
        }
      } catch {
        // Ignore malformed frame
      }
    });

    clientWs.on('close', () => {
      try {
        liveSession?.close?.();
      } catch {
        // Ignore close errors
      }
    });
  });

  httpServer.listen(port, '0.0.0.0', () => {
    console.log(`SkyLine Digital Agency Full-Stack Server listening on http://0.0.0.0:${port}`);
  });
}

void startServer();
