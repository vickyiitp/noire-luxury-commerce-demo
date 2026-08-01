'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, User, Compass } from 'lucide-react';
import { luxuryAudio } from '@/lib/audio';

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ConciergeModal: React.FC<ConciergeModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Good day. I am your Chief Concierge & Private Stylist at NOIRÉ ATELIER. How may I assist your acquisition selection or provide material advice today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSend = async (promptText?: string) => {
    const textToSend = promptText || input;
    if (!textToSend.trim() || loading) return;

    luxuryAudio.playSoftClick();

    const newMessages: Message[] = [...messages, { role: 'user', content: textToSend }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          conversationHistory: newMessages,
        }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Pardon me, our private concierge line experienced a momentary pause. May I assist you again?',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
      />

      {/* Drawer */}
      <div className="relative w-full md:w-[480px] h-full bg-neutral-950 border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl text-white">
        
        {/* Header */}
        <div>
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-light">Atelier AI Concierge</h3>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest">
                  Place Vendôme Private Stylist
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                luxuryAudio.playSoftClick();
                onClose();
              }}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Preset Prompts */}
          <div className="my-4 flex gap-2 overflow-x-auto no-scrollbar py-1">
            {[
              'Recommend a gift under $20,000',
              'What movement powers Chrono Noir I?',
              'Tell me about French Box Calfskin',
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="px-3 py-1.5 bg-neutral-900 border border-white/10 rounded-full text-[11px] text-neutral-300 whitespace-nowrap hover:border-amber-400 hover:text-amber-200 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation Message List */}
        <div className="my-4 flex-1 overflow-y-auto space-y-4 pr-2 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-[80%] leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-amber-400 text-black font-medium rounded-tr-none'
                    : 'bg-neutral-900 border border-white/10 text-neutral-200 font-light rounded-tl-none'
                }`}
              >
                {m.content}
              </div>

              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start items-center text-neutral-400 text-xs italic">
              <Bot className="w-4 h-4 text-amber-300 animate-spin" />
              <span>Consulting master watchmaker & atelier archive...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="pt-4 border-t border-white/10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Inquire with private concierge..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 bg-neutral-900 border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-3 bg-amber-400 text-black rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
