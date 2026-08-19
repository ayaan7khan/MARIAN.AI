'use client';

import React, { useEffect, useRef } from 'react';

export const NeuralVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = canvas.parentElement?.clientHeight || 500;
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      
      time += 0.005;

      // Draw subtle orbital rings
      ctx.beginPath();
      ctx.ellipse(cx, cy + 50, 180, 60, time * 0.5, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(212, 20, 61, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy + 50, 220, 80, -time * 0.3, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(212, 20, 61, 0.05)';
      ctx.stroke();

      // Draw glowing central cube (isometric projection)
      const size = 60;
      const h = size * Math.sqrt(3) / 2; // height of a triangle

      const points = [
        { x: cx, y: cy - size }, // Top
        { x: cx + h, y: cy - size/2 }, // Top Right
        { x: cx + h, y: cy + size/2 }, // Bottom Right
        { x: cx, y: cy + size }, // Bottom
        { x: cx - h, y: cy + size/2 }, // Bottom Left
        { x: cx - h, y: cy - size/2 }, // Top Left
        { x: cx, y: cy } // Center
      ];

      // Draw cube lines
      ctx.strokeStyle = 'rgba(212, 20, 61, 0.8)';
      ctx.lineWidth = 1.5;
      
      // Outer hexagon
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for(let i=1; i<6; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();
      ctx.stroke();

      // Inner lines
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      ctx.lineTo(points[6].x, points[6].y);
      ctx.moveTo(points[2].x, points[2].y);
      ctx.lineTo(points[6].x, points[6].y);
      ctx.moveTo(points[4].x, points[4].y);
      ctx.lineTo(points[6].x, points[6].y);
      ctx.stroke();

      // Add glow
      ctx.shadowBlur = 30;
      ctx.shadowColor = 'rgba(212, 20, 61, 0.6)';
      
      // Floating particles
      for(let i=0; i<15; i++) {
        const px = cx + Math.cos(time * 2 + i) * (80 + Math.sin(time + i)*20);
        const py = cy + Math.sin(time * 2 + i) * (80 + Math.cos(time + i)*20);
        
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212, 20, 61, 0.8)';
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      // Draw 'M' in the center
      ctx.font = '24px serif';
      ctx.fillStyle = '#D4143D';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('M', cx, cy + 5);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[450px] md:h-[550px] rounded-2xl bg-[#080808] border border-[#242424] overflow-hidden shadow-2xl flex items-center justify-center">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#D4143D]/5 via-transparent to-transparent pointer-events-none" />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Floating telemetry overlay card */}
      <div className="absolute bottom-6 left-6 p-4 rounded-xl bg-[#050505]/90 backdrop-blur-md border border-[#242424] max-w-xs text-left space-y-2 shadow-2xl z-10">
        <div className="flex items-center justify-between font-sans text-[10px] text-[#A8A29A] uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4143D] animate-pulse" />
            MARIAN CORE
          </span>
        </div>
        <div className="text-xs text-[#F3E7CF] leading-relaxed font-mono opacity-80">
          <div><span className="text-[#D4143D]">&gt;</span> Model: Omni-V3</div>
          <div><span className="text-[#D4143D]">&gt;</span> Status: Online</div>
          <div><span className="text-[#D4143D]">&gt;</span> Latency: 12ms</div>
        </div>
      </div>
    </div>
  );
};
