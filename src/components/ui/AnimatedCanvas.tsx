'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pop = '#FF3E7F'; // Using raw hex since getComputedStyle might not be ready
    let W = 0, H = 0, DPR = 1, t = 0;
    let animationFrameId: number;

    function size() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = cv!.clientWidth;
      H = cv!.clientHeight;
      cv!.width = W * DPR;
      cv!.height = H * DPR;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    size();
    window.addEventListener('resize', size);

    function valley(x: number) {
      const d = (x - 0.5) * 2;
      return 1 - Math.exp(-d * d * 2.6);
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      const lines = 15, top = H * 0.34, bottom = H * 1.0, accLine = 9;
      
      for (let i = 0; i < lines; i++) {
        const p = i / (lines - 1);
        const baseY = top + (bottom - top) * p;
        const amp = (30 + p * 70);
        
        ctx!.beginPath();
        const seg = Math.max(26, Math.floor(W / 28));
        
        for (let s = 0; s <= seg; s++) {
          const xN = s / seg;
          const x = xN * W;
          const v = valley(xN);
          const wob = Math.sin(xN * 5 + t * 0.32 + i * 0.55) * amp * v + 
                     Math.sin(xN * 11 - t * 0.2 + i * 0.3) * amp * 0.25 * v;
          const y = baseY - wob;
          
          if (s === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        
        if (i === accLine) {
          ctx!.strokeStyle = pop;
          ctx!.globalAlpha = 0.5;
          ctx!.lineWidth = 1.4;
        } else {
          ctx!.strokeStyle = `rgba(203,164,92,${(0.04 + p * 0.17).toFixed(3)})`;
          ctx!.globalAlpha = 1;
          ctx!.lineWidth = 1;
        }
        ctx!.stroke();
        ctx!.globalAlpha = 1;
      }
      
      if (!reduce) {
        t += 0.014;
        animationFrameId = requestAnimationFrame(draw);
      }
    }

    draw();

    return () => {
      window.removeEventListener('resize', size);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0 opacity-90 pointer-events-none"
      style={{
        WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 48%, rgba(0,0,0,0.55) 78%, transparent 96%)',
        maskImage: 'linear-gradient(to bottom, #000 0%, #000 48%, rgba(0,0,0,0.55) 78%, transparent 96%)'
      }}
      aria-hidden="true"
    />
  );
}
