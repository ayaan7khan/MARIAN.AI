'use client';

import React from 'react';
import { MarianLogo } from '@/components/ui/MarianLogo';
import { Sparkles, Code2, Calendar, Brain, Shield } from 'lucide-react';

interface EmptyChatProps {
  onSelectPrompt: (prompt: string) => void;
}

export const EmptyChat: React.FC<EmptyChatProps> = ({ onSelectPrompt }) => {
  const promptStarters = [
    {
      icon: <Brain className="w-4 h-4 text-[#D4143D]" />,
      title: 'Architect Distributed System',
      prompt: 'Draft an architectural breakdown for a low-latency SSE token streaming pipeline connecting FastAPI and Next.js.',
    },
    {
      icon: <Calendar className="w-4 h-4 text-[#D4143D]" />,
      title: 'Google Calendar Schedule Sync',
      prompt: 'How can MARIAN parse Google Calendar events to find optimal focus blocks and propose schedule updates?',
    },
    {
      icon: <Code2 className="w-4 h-4 text-[#D4143D]" />,
      title: 'Code Audit & Security Review',
      prompt: 'Audit standard Next.js App Router API routes for XSS prevention, CSRF protection, and token validation best practices.',
    },
    {
      icon: <Shield className="w-4 h-4 text-[#D4143D]" />,
      title: 'Reasoning & Mathematical Proof',
      prompt: 'Explain the algorithmic bounds of Transformer multi-head self-attention latency relative to sequence length.',
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-3xl mx-auto space-y-8 select-none">
      <div className="space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-[#0D0D0D] border border-[#242424] shadow-lg">
          <MarianLogo size={40} showText={false} />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif tracking-tight text-[#F3E7CF]">
          How can <span className="font-serif italic text-[#D4143D]">MARIAN</span> help?
        </h1>
        <p className="text-sm text-[#A1A1AA] max-w-md mx-auto leading-relaxed">
          Intelligent, precise, and built for technical excellence. Choose a starter prompt or type anything below.
        </p>
      </div>

      {/* Grid of Starter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 w-full text-left">
        {promptStarters.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(item.prompt)}
            className="group p-4 rounded-xl bg-[#0D0D0D] border border-[#242424] hover:border-[#D4143D]/50 hover:bg-[#111111] transition-all duration-300 text-left space-y-1.5 shadow-sm"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-[#F3E7CF]">
              {item.icon}
              <span>{item.title}</span>
            </div>
            <p className="text-xs text-[#A1A1AA] group-hover:text-[#F3E7CF] transition-colors line-clamp-2 leading-relaxed">
              {item.prompt}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
