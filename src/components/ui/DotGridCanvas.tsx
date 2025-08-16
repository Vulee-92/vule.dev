"use client";

import React, { useRef, useEffect } from "react";

interface DotGridCanvasProps {
  children: React.ReactNode;
}

interface Dot {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
}

const DotGridCanvas: React.FC<DotGridCanvasProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const trail = useRef<{ x: number; y: number }[]>([]);

  // 🎨 Màu cố định bạn có thể thay đổi ở đây
  const fixedColor = "rgba(0, 0, 0, ALPHA)"; // màu đen, thay đổi RGB nếu bạn muốn

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spacing = 15;
    const radius = 1;
    const influenceRadius = 100;
    const dots: Dot[] = [];

    for (let x = 0; x < canvas.width; x += spacing) {
      for (let y = 0; y < canvas.height; y += spacing) {
        dots.push({ x, y, originalX: x, originalY: y });
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Trail
      trail.current.push({ x: mouse.current.x, y: mouse.current.y });
      if (trail.current.length > 40) trail.current.shift();

      for (let i = 0; i < trail.current.length - 1; i++) {
        const p1 = trail.current[i];
        const p2 = trail.current[i + 1];
        const alpha = i / trail.current.length;

        const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        gradient.addColorStop(0, fixedColor.replace("ALPHA", `${alpha * 0.3}`));
        gradient.addColorStop(1, fixedColor.replace("ALPHA", `${alpha * 0.3}`));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // Dots
      dots.forEach((dot) => {
        const dx = mouse.current.x - dot.x;
        const dy = mouse.current.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < influenceRadius) {
          const force = (influenceRadius - dist) / influenceRadius;
          dot.x += dx * 0.02 * force;
          dot.y += dy * 0.02 * force;
        } else {
          dot.x += (dot.originalX - dot.x) * 0.05;
          dot.y += (dot.originalY - dot.y) * 0.05;
        }

        let opacity = 0.2;
        if (dist < influenceRadius) {
          opacity = 1 - dist / influenceRadius;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = fixedColor.replace("ALPHA", `${opacity}`);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default DotGridCanvas;
