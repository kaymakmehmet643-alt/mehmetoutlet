import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import {
  Bot,
  Send,
  Sparkles,
  BrainCircuit,
  Zap,
  X,
  Minimize2,
  Maximize2,
  RefreshCw,
  ShoppingBag,
  Layers,
  User,
  AlertCircle
} from 'lucide-react';

interface GeminiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollToRack: () => void;
  onOpenCombineStudio: () => void;
}

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  isOpen,
  onClose,
  onScrollToRack,
  onOpenCombineStudio,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-initial',
      role: 'assistant',
      text: 'Selam! Ben Şaban Outlet & Riko Kombin Atölyesi’nin baş stilistiyim. Askılıktaki outlet modellerimiz, 480 GSM kumaş kaliteleri veya Azak sokak kombinleri hakkında aklına takılan her şeyi sorabilirsin.',
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [enableHighThinking, setEnableHighThinking] = useState(false);
  const [fastMode, setFastMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, text: m.text })),
          enableHighThinking,
          fastMode,
        }),
      });

      const data = await response.json();

      if (data.error && !data.text) {
        throw new Error(data.error);
      }

      const botMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: data.text || 'Yanıt alınamadı.',
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        thinking: data.thinking,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        text: 'Bir bağlantı hatası oluştu. Lütfen tekrar deneyin.',
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 shadow-2xl ${
        isExpanded
          ? 'inset-4 sm:inset-10 flex flex-col'
          : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-full max-w-[95vw] sm:w-[440px] h-[600px] max-h-[85vh] flex flex-col'
      }`}
    >
      <div className="bg-neutral-900 border border-neutral-700/80 rounded-2xl flex flex-col h-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-neutral-950 shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">Riko & Şaban AI Stilist</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 font-semibold">
                  GEMINI
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                {enableHighThinking
                  ? 'Gemini 4 Argon (Yüksek Düşünme Aktif)'
                  : fastMode
                  ? 'Gemini 3.1 Flash Lite (Hızlı Mod)'
                  : 'Gemini 3.8 Flash (Moda Asistanı)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 hidden sm:block"
              aria-label={isExpanded ? 'Küçült' : 'Genişlet'}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
              aria-label="Sohbeti kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Intelligence / Mode Bar */}
        <div className="px-4 py-2 bg-neutral-950/80 border-b border-neutral-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEnableHighThinking(!enableHighThinking);
                if (!enableHighThinking) setFastMode(false);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium text-[11px] transition-all ${
                enableHighThinking
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                  : 'bg-neutral-800/80 text-neutral-400 hover:text-white'
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Yüksek Düşünme (Thinking)</span>
            </button>

            <button
              onClick={() => {
                setFastMode(!fastMode);
                if (!fastMode) setEnableHighThinking(false);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium text-[11px] transition-all ${
                fastMode
                  ? 'bg-blue-500 text-white font-bold'
                  : 'bg-neutral-800/80 text-neutral-400 hover:text-white'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>Hızlı</span>
            </button>
          </div>

          <button
            onClick={() =>
              setMessages([
                {
                  id: 'msg-initial',
                  role: 'assistant',
                  text: 'Sohbet sıfırlandı. Hangi kombin veya outlet ürünümüz hakkında konuşmak istersiniz?',
                  timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
                },
              ])
            }
            className="text-neutral-500 hover:text-neutral-300 p-1 rounded"
            title="Sohbeti temizle"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: 'thin' }}>
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-amber-500 text-neutral-950 font-medium rounded-tr-xs shadow-md'
                    : 'bg-neutral-800/90 text-neutral-100 rounded-tl-xs border border-neutral-700/60'
                }`}
              >
                {msg.thinking && (
                  <div className="mb-2 p-2 rounded-lg bg-neutral-950/60 border border-neutral-700/50 text-[11px] text-amber-300 font-mono">
                    <span className="font-bold block mb-0.5">🧠 Stil Muhakemesi:</span>
                    {msg.thinking}
                  </div>
                )}
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <span
                  className={`text-[9px] block mt-1 text-right ${
                    msg.role === 'user' ? 'text-neutral-900/70' : 'text-neutral-500'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-neutral-800 text-neutral-300 flex items-center justify-center shrink-0 mt-0.5 border border-neutral-700">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl bg-neutral-800/80 border border-neutral-700/60 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-neutral-400 ml-1">
                  {enableHighThinking ? 'Gemini 4 Argon derin kombin analizi yapıyor...' : 'Riko & Şaban yanıtlıyor...'}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 border-t border-neutral-800/80 bg-neutral-950/40 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
          {[
            'Taktik kargo pantolonla ne giyilir?',
            'Azak & Riko sokak kombini öner',
            '480 GSM hoodie kalıbı nasıl?',
            'Deri bomber cekete hangi beden uyar?',
          ].map(chip => (
            <button
              key={chip}
              onClick={() => handleSendMessage(chip)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-neutral-800 hover:bg-amber-500/20 hover:text-amber-300 text-neutral-400 border border-neutral-700/70 transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-neutral-950 border-t border-neutral-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Kombin, beden veya kumaş tavsiyesi sor..."
            className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-hidden focus:border-amber-500 transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 rounded-xl font-bold transition-colors shrink-0 shadow-md"
            aria-label="Mesaj gönder"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
