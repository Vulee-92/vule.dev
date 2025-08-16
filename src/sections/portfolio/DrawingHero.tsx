"use client";

import React, { useRef, useEffect, useState } from "react";

interface DrawingHeroProps {
  cursorImage: string; // đường dẫn ảnh con trỏ tùy chỉnh
  children?: React.ReactNode; // nội dung giới thiệu
}

const DrawingHero: React.FC<DrawingHeroProps> = ({ cursorImage, children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Style nét vẽ
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });

      if (!isDrawing.current) return;
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.beginPath();
      ctx.moveTo(x, y);
      isDrawing.current = true;
    };

    const handleMouseUp = () => {
      isDrawing.current = false;
      ctx.closePath();
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        cursor: "none", // Ẩn chuột mặc định
      }}
    >
      {/* Canvas vẽ tay */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      />

      {/* Cursor ảnh */}
      <img
        src={cursorImage}
        alt="Custom Cursor"
        style={{
          position: "fixed",
          top: mousePos.y,
          left: mousePos.x,
          transform: "translate(-50%, -50%)",
          width: 32,
          height: 32,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Text giới thiệu */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          color: "#111",
          fontSize: "3rem",
          fontWeight: "bold",
          padding: "4rem",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DrawingHero;
