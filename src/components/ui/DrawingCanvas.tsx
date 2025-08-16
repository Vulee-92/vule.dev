"use client";

import React, { useRef, useEffect, useState } from "react";

interface DrawingCanvasProps {
  children?: React.ReactNode;
  cursorImage?: string; // link ảnh con trỏ tùy chỉnh
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  children,
  cursorImage = "/assets/icons/cursor.png", // thay bằng URL hình con trỏ bạn muốn
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    const handleMouseDown = () => {
      isDrawing.current = true;
    };
    const handleMouseUp = () => {
      isDrawing.current = false;
      ctx.beginPath();
    };
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setMousePos({ x, y });

      if (!isDrawing.current) return;

      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#000";

      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      {/* Canvas để vẽ */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 0,
          cursor: "none", 
          pointerEvents: "auto", // để tương tác vẽ
        }}
      />

      {/* Nội dung hero section */}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>

      {/* Custom Cursor */}
      {cursorImage && (
        <img
          src={cursorImage}
          alt="custom cursor"
          style={{
            position: "fixed",
            top: mousePos.y,
            left: mousePos.x,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            width: "40px", // chỉnh size tuỳ theo ảnh của bạn
            height: "auto",
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
};

export default DrawingCanvas;
