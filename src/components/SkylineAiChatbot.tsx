import React, { useState, useRef, useEffect } from 'react';
import {
  PhoneCall,
  Send,
  X,
  ArrowRight,
  Mic,
  MicOff,
  Radio,
  Zap,
  Volume2,
} from 'lucide-react';
import {
  SKYLINE_SACHIN_WHATSAPP_NUMBER,
  SKYLINE_CALL_NUMBER,
} from '../data/agencyData';
import { WhatsAppLogoIcon, SkyLineAiChatIcon } from './BrandIcons';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  userQueryContext?: string;
  showFallbackActions?: boolean;
}

const QUICK_REPLY_CHIPS = [
  'Pricing & Packages',
  'Local Business Map Pack',
  'WhatsApp AI Bot Demo',
  'Talk to Founders',
];

function evaluateClientFallbackIntent(query: string): {
  reply: string;
  needsHumanFallback: boolean;
} {
  const q = query.toLowerCase();

  if (
    q.includes('price') ||
    q.includes('pricing') ||
    q.includes('package') ||
    q.includes('cost') ||
    q.includes('budget')
  ) {
    return {
      reply:
        'SkyLine Digital Agency offers 3 fixed-milestone tiers:\n• Local Business / Starter: ₹25,000 – ₹60,000\n• Growth Website + WhatsApp Automation: ₹60,000 – ₹1,50,000\n• Full-Stack SaaS / Performance Ad Engine: ₹1,50,000 – ₹3,50,000+\nTimelines: Fast-Track 10–18 Days | Standard Sprint 3–6 Weeks.',
      needsHumanFallback: true,
    };
  }

  if (
    q.includes('local') ||
    q.includes('map') ||
    q.includes('clinic') ||
    q.includes('salon') ||
    q.includes('review')
  ) {
    return {
      reply:
        'Our Local Business Map Pack Engine ranks clinics, salons, showrooms, and retail stores #1 on Google Maps, installs Smart QR 5-Star Review Standees, and automates 24/7 WhatsApp booking—driving 3.2x more daily calls and walk-ins.',
      needsHumanFallback: true,
    };
  }

  if (
    q.includes('whatsapp') ||
    q.includes('bot') ||
    q.includes('demo') ||
    q.includes('crm') ||
    q.includes('ai')
  ) {
    return {
      reply:
        'We engineer 24/7 Autonomous WhatsApp AI Bots on the Official WhatsApp Cloud API that respond in under 1.2s, share catalogs, qualify budgets, and sync appointments directly to your calendar.',
      needsHumanFallback: true,
    };
  }

  if (
    q.includes('founder') ||
    q.includes('talk') ||
    q.includes('aashif') ||
    q.includes('sachin') ||
    q.includes('call') ||
    q.includes('human') ||
    q.includes('location') ||
    q.includes('email')
  ) {
    return {
      reply:
        'SkyLine Digital Agency is founded by Aashif Khan (Full-Stack & Cybersecurity Architect) and Sachin Sahu (Java Backend & Distributed Systems Architect) in Indore, Bhopal, Madhya Pradesh, India (Official Email: skylinedigital@gmail.com). Connect directly with us below:',
      needsHumanFallback: true,
    };
  }

  if (q.includes('refer') || q.includes('15%') || q.includes('commission')) {
    return {
      reply:
        'Our Partner Referral Program pays a direct 15% UPI/Bank commission on any referred client project as soon as their onboarding invoice clears.',
      needsHumanFallback: false,
    };
  }

  return {
    reply:
      'I can connect you straight to our Founding Architects for a custom scope, discount discussion, or live technical teardown. Choose your preferred channel below:',
    needsHumanFallback: true,
  };
}

export const SkylineAiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiMode, setAiMode] = useState<'standard' | 'fast'>('standard');
  const [isRecordingMic, setIsRecordingMic] = useState(false);
  const [liveVoiceActive, setLiveVoiceActive] = useState(false);
  const [liveStatusText, setLiveStatusText] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: 'Welcome to SkyLine Digital Agency! Ask me about our Web/SaaS engineering, 24/7 WhatsApp AI Bots, Local Google Map Pack packages, pricing tiers, or timelines.',
      showFallbackActions: true,
      userQueryContext: 'Hi SkyLine Digital Agency! I would like to discuss a project.',
    },
  ]);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const liveWsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    return () => {
      liveWsRef.current?.close();
    };
  }, []);

  const speakReply = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.04;
        window.speechSynthesis.speak(utterance);
      } catch {
        // Ignore speech synthesis errors on headless browsers
      }
    }
  };

  const sendMessage = async (rawText: string, speakResponse = false) => {
    const trimmed = rawText.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
    };

    const nextHistory = [...messages, userMsg].map((m) => ({
      role: m.sender === 'user' ? ('user' as const) : ('model' as const),
      text: m.text,
    }));

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          messages: nextHistory,
          mode: aiMode,
        }),
      });

      if (response.ok) {
        const data = (await response.json()) as {
          reply?: string;
          needsHumanFallback?: boolean;
        };
        const fallback = evaluateClientFallbackIntent(trimmed);
        const replyText = data.reply || fallback.reply;
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: replyText,
            userQueryContext: trimmed,
            showFallbackActions: data.needsHumanFallback ?? true,
          },
        ]);
        if (speakResponse || liveVoiceActive) {
          speakReply(replyText);
        }
      } else {
        const fallback = evaluateClientFallbackIntent(trimmed);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: fallback.reply,
            userQueryContext: trimmed,
            showFallbackActions: true,
          },
        ]);
      }
    } catch {
      const fallback = evaluateClientFallbackIntent(trimmed);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: fallback.reply,
          userQueryContext: trimmed,
          showFallbackActions: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Microphone Audio Transcription via /api/ai/transcribe (gemini-3.5-transcribe)
  const toggleMicRecording = async () => {
    if (isRecordingMic) {
      mediaRecorderRef.current?.stop();
      setIsRecordingMic(false);
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      void sendMessage('Pricing & Packages', true);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64 =
            typeof reader.result === 'string' ? reader.result.split(',')[1] || '' : '';
          if (!base64) return;
          setIsTyping(true);
          try {
            const res = await fetch('/api/ai/transcribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                audioBase64: base64,
                mimeType: blob.type || 'audio/webm',
              }),
            });
            if (res.ok) {
              const data = (await res.json()) as { transcript?: string };
              if (data.transcript) {
                setIsTyping(false);
                void sendMessage(data.transcript, true);
                return;
              }
            }
          } catch {
            // Fallback
          }
          setIsTyping(false);
        };
        reader.readAsDataURL(blob);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecordingMic(true);
    } catch {
      void sendMessage('Pricing & Packages', true);
    }
  };

  // Real-Time Gemini 3.8 Live Voice WebSocket Toggle (/ws/ai-live)
  const toggleLiveVoiceSession = () => {
    if (liveVoiceActive) {
      liveWsRef.current?.close();
      liveWsRef.current = null;
      setLiveVoiceActive(false);
      setLiveStatusText(null);
      return;
    }

    const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${proto}//${window.location.host}/ws/ai-live`;
    try {
      const ws = new WebSocket(wsUrl);
      liveWsRef.current = ws;
      setLiveVoiceActive(true);
      setLiveStatusText('Connecting to SkyLine Live Voice...');

      ws.onopen = () => {
        setLiveStatusText('Gemini 3.8 Live Voice Active — Speak or click a prompt');
        ws.send(
          JSON.stringify({
            type: 'prompt',
            text: 'Pricing & Packages overview',
          })
        );
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as {
            type?: string;
            text?: string;
            needsHumanFallback?: boolean;
          };
          if (data.type === 'voice_reply' && data.text) {
            setMessages((prev) => [
              ...prev,
              {
                id: `live-${Date.now()}`,
                sender: 'bot',
                text: data.text!,
                showFallbackActions: data.needsHumanFallback ?? true,
              },
            ]);
            speakReply(data.text);
          }
        } catch {
          // Ignore non-JSON frames
        }
      };

      ws.onclose = () => {
        setLiveVoiceActive(false);
        setLiveStatusText(null);
      };
    } catch {
      setLiveVoiceActive(false);
      setLiveStatusText(null);
    }
  };

  return (
    <>
      {/* Launcher Button in Bottom-Right Floating Action Stack (Custom Branded Chat-Logo Icon — Zero Robot Icon) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open SkyLine AI Assistant"
        data-testid="skyline-ai-launcher"
        className="h-12 pl-2 pr-4 rounded-full bg-[#09090B] text-[#F4F4F5] border border-white/20 shadow-2xl inline-flex items-center justify-center gap-2.5 hover:scale-105 transition-transform cursor-pointer"
      >
        <SkyLineAiChatIcon size="sm" />
        <span className="font-display text-xs font-bold tracking-tight whitespace-nowrap">
          SkyLine AI
        </span>
      </button>

      {/* Chat Drawer / Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="SkyLine AI Assistant"
          data-testid="skyline-ai-dialog"
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-40 z-50 w-[calc(100vw-2rem)] sm:w-[400px] max-h-[80vh] rounded-3xl surface-card border border-[var(--border-strong)] shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header with Custom Branded <SkyLineAiChatIcon /> + Mode & Live Voice Controls */}
          <div className="px-4 py-3.5 bg-[#09090B] text-[#F4F4F5] flex items-center justify-between gap-2 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <SkyLineAiChatIcon size="md" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-sm text-white">
                    SkyLine AI Assistant
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                </div>
                <div className="text-[10px] font-mono-tech text-zinc-400">
                  {aiMode === 'fast' ? 'Flash-Lite Low-Latency' : 'Gemini 3.8 Flash Core'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Fast vs Standard Mode Toggle */}
              <button
                type="button"
                onClick={() =>
                  setAiMode((prev) => (prev === 'standard' ? 'fast' : 'standard'))
                }
                title="Toggle Fast vs Standard AI Mode"
                className={`px-2.5 py-1 rounded-full font-mono-tech text-[10px] font-bold inline-flex items-center gap-1 cursor-pointer border transition-colors ${
                  aiMode === 'fast'
                    ? 'bg-white text-[#09090B] border-white'
                    : 'bg-white/10 text-zinc-200 border-white/15 hover:bg-white/15'
                }`}
              >
                <Zap className="w-3 h-3" />
                <span>{aiMode === 'fast' ? 'Fast' : 'Pro'}</span>
              </button>

              {/* Live Voice Session Toggle */}
              <button
                type="button"
                onClick={toggleLiveVoiceSession}
                aria-label="Toggle Gemini Live Voice Mode"
                title="Live Voice Mode"
                className={`px-2.5 py-1 rounded-full font-mono-tech text-[10px] font-bold inline-flex items-center gap-1 cursor-pointer border transition-colors ${
                  liveVoiceActive
                    ? 'bg-[#10B981] text-[#09090B] border-[#10B981]'
                    : 'bg-white/10 text-zinc-200 border-white/15 hover:bg-white/15'
                }`}
              >
                <Radio className="w-3 h-3" />
                <span>Live</span>
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close SkyLine AI Assistant"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white inline-flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Live Voice Status Banner */}
          {liveStatusText && (
            <div className="px-4 py-2 bg-[#18181B] text-[#E4E4E7] border-b border-white/10 flex items-center justify-between text-[11px] font-mono-tech">
              <span className="inline-flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-[#10B981] animate-pulse" />
                <span>{liveStatusText}</span>
              </span>
            </div>
          )}

          {/* Quick-Reply Chips */}
          <div className="px-4 py-2.5 bg-[var(--bg-elevated)] border-b border-[var(--border-hairline)] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_REPLY_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => void sendMessage(chip)}
                className="px-3 py-1.5 rounded-full surface-card text-[11px] font-display font-semibold text-[var(--text-primary)] hover:border-[var(--text-primary)] whitespace-nowrap cursor-pointer shrink-0 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div
            ref={scrollContainerRef}
            className="p-4 space-y-3.5 overflow-y-auto flex-1 max-h-[340px] bg-[var(--bg-canvas)]"
          >
            {messages.map((msg) => {
              const waText = encodeURIComponent(
                `Hi SkyLine Digital Agency! My question: ${msg.userQueryContext || msg.text}`
              );
              const waHref = `https://wa.me/${SKYLINE_SACHIN_WHATSAPP_NUMBER}?text=${waText}`;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-[#141518] text-[#F4F3EF] rounded-br-xs'
                        : 'surface-card text-[var(--text-primary)] rounded-bl-xs'
                    }`}
                  >
                    {msg.text}

                    {/* Mandatory Fallback Action Buttons Inside Bot Bubble */}
                    {msg.sender === 'bot' && msg.showFallbackActions && (
                      <div className="mt-3 pt-2.5 border-t border-[var(--border-hairline)] grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <a
                          href={waHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-xl bg-[#25D366] text-white font-display font-semibold text-[11px] inline-flex items-center justify-center gap-1.5 hover:opacity-95 transition-opacity"
                        >
                          <WhatsAppLogoIcon className="w-3.5 h-3.5 shrink-0" />
                          <span>Chat on WhatsApp</span>
                          <ArrowRight className="w-3 h-3 shrink-0" />
                        </a>

                        <a
                          href={`tel:${SKYLINE_CALL_NUMBER}`}
                          className="px-3 py-2 rounded-xl bg-[#141518] text-[#F4F3EF] border border-white/15 font-display font-semibold text-[11px] inline-flex items-center justify-center gap-1.5 hover:opacity-95 transition-opacity"
                        >
                          <PhoneCall className="w-3.5 h-3.5 text-[#E4E4E7] shrink-0" />
                          <span>Call Lead Architect</span>
                          <ArrowRight className="w-3 h-3 shrink-0" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-start">
                <div className="surface-card rounded-2xl px-4 py-2.5 text-xs text-[var(--text-secondary)]">
                  SkyLine AI is analyzing...
                </div>
              </div>
            )}
          </div>

          {/* Input Bar with Audio Transcription Mic Button */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void sendMessage(input);
            }}
            className="p-3 bg-[var(--bg-surface)] border-t border-[var(--border-hairline)] flex items-center gap-2"
          >
            <button
              type="button"
              onClick={() => void toggleMicRecording()}
              aria-label={isRecordingMic ? 'Stop voice recording' : 'Voice input microphone'}
              title={isRecordingMic ? 'Stop Recording' : 'Speak your question'}
              className={`w-9 h-9 rounded-xl inline-flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                isRecordingMic
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'surface-elevated text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {isRecordingMic ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about pricing, Map Pack, or AI bots..."
              className="flex-1 px-3.5 py-2.5 rounded-xl surface-elevated text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--text-primary)]"
            />
            <button
              type="submit"
              aria-label="Send message to SkyLine AI"
              className="w-10 h-10 rounded-xl btn-platinum-primary inline-flex items-center justify-center shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
