'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Avatar, Stack } from '@mui/material';
import { motion, useAnimation, Variants } from 'framer-motion';

// --- Hằng số ---
const NUM_DOTS = 100;
const NUM_DOTS_MOBILE = 20;
const DOT_COLOR = '#111';
const SKILLS = ['React', 'Next.js', 'Node.js', 'Docker', 'TypeScript'];

// --- Hàm tiện ích ---
function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// --- Hook cho hiệu ứng gõ và xóa chữ ---
const useTypingEffect = (texts: string[]) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[textIndex % texts.length];
    let timeoutId: any;

    if (isTyping) {
      if (charIndex < currentText.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(prev => prev + currentText.charAt(charIndex));
          setCharIndex(prev => prev + 1);
        }, 100);
      } else {
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 1500);
      }
    } else {
      if (charIndex > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
          setCharIndex(prev => prev - 1);
        }, 50);
      } else {
        setIsTyping(true);
        setTextIndex(prev => prev + 1);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [texts, textIndex, charIndex, isTyping]);

  return displayedText;
};

// --- Component chính ---
interface DotParticlesWithTextProps {
  heroScale: number;
}

const DotParticlesWithText: React.FC<DotParticlesWithTextProps> = ({ heroScale }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight * 0.7 });
  const [avatarOffset, setAvatarOffset] = useState({ x: 0, y: 0 });
  const avatarRef = useRef<HTMLDivElement>(null);

  const controls = useAnimation();

  const isMobile = window.innerWidth < 768;
  const numDots = isMobile ? NUM_DOTS_MOBILE : NUM_DOTS;

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    mouse.current.x = mouseX;
    mouse.current.y = mouseY;

    const avatar = avatarRef.current;
    if (avatar) {
      const avatarRect = avatar.getBoundingClientRect();
      const avatarX = avatarRect.left + avatarRect.width / 2;
      const avatarY = avatarRect.top + avatarRect.height / 2;

      const dx = mouseX - avatarX;
      const dy = mouseY - avatarY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const influenceRadius = isMobile ? 100 : 150;
      if (distance < influenceRadius) {
        const force = (influenceRadius - distance) / influenceRadius;
        const angle = Math.atan2(dy, dx);
        setAvatarOffset({
          x: -Math.cos(angle) * force * (isMobile ? 10 : 15),
          y: -Math.sin(angle) * force * (isMobile ? 10 : 15),
        });
      } else {
        setAvatarOffset({ x: 0, y: 0 });
      }
    }
  };

  const handleMouseLeave = () => {
    mouse.current.x = -9999;
    mouse.current.y = -9999;
    setAvatarOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const dpr = window.devicePixelRatio || 1;
    let width = canvasSize.width;
    let height = canvasSize.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const prevMouse = { x: mouse.current.x, y: mouse.current.y };
    let mouseSpeed = 0;

    const dots = Array.from({ length: numDots }, () => ({
      x: random(0, width),
      y: random(0, height),
      r: random(isMobile ? 0.8 : 1.5, isMobile ? 1.5 : 2.5),
      baseR: 0,
      alpha: random(0.99, 1),
      color: DOT_COLOR,

      vx: random(-0.5, 0.5),
      vy: random(-1.5, -0.8),

      wiggle: random(0, Math.PI * 2),
      wiggleSpeed: random(0.01, 0.05),
    }));

    dots.forEach(dot => dot.baseR = dot.r);

    let animationId: number;

    function animate() {
      const dx = mouse.current.x - prevMouse.x;
      const dy = mouse.current.y - prevMouse.y;
      mouseSpeed = Math.min(Math.sqrt(dx * dx + dy * dy), 70);
      prevMouse.x = mouse.current.x;
      prevMouse.y = mouse.current.y;

      ctx.clearRect(0, 0, width, height);

      for (let dot of dots) {
        dot.wiggle += dot.wiggleSpeed;

        dot.x += dot.vx + Math.sin(dot.wiggle) * (isMobile ? 0.4 : 0.8);
        dot.y += dot.vy + Math.cos(dot.wiggle) * (isMobile ? 0.4 : 0.8);

        dot.r = dot.baseR + Math.sin(dot.wiggle * 2) * 0.2;

        if (dot.y < -20) {
          dot.x = random(0, width);
          dot.y = height + 20;

          dot.vy = random(-1.5, -0.8);
          dot.vx = random(-0.5, 0.5);
          dot.wiggle = random(0, Math.PI * 2);
          dot.wiggleSpeed = random(0.01, 0.05);
        }

        const dxDot = dot.x - mouse.current.x;
        const dyDot = dot.y - mouse.current.y;
        const distance = Math.sqrt(dxDot * dxDot + dyDot * dyDot);

        const influenceRadius = isMobile ? 400 : 700 + mouseSpeed * 10;
        const repulsionForce = isMobile ? 2 : 3;

        if (distance < influenceRadius) {
          const force = Math.pow((influenceRadius - distance) / influenceRadius, 2);
          const angle = Math.atan2(dyDot, dxDot);
          dot.x += Math.cos(angle) * force * (repulsionForce + mouseSpeed * 0.2);
          dot.y += Math.sin(angle) * force * (repulsionForce + mouseSpeed * 0.2);
        }

        ctx.save();
        ctx.globalAlpha = dot.alpha;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, Math.abs(dot.r), 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight * 0.7 });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasSize, numDots, isMobile]);

  const typingText = useTypingEffect(SKILLS);
  const parallaxTranslateY = (1 - heroScale) * -100;

  // Variants đã được sửa lỗi cho hiệu ứng animation
  const containerVariants: Variants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 2, md: 4 },
        px: { xs: 1, md: 2 },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'auto',
          zIndex: 1,
          transform: `translateY(${parallaxTranslateY}px)`,
          imageRendering: 'crisp-edges',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{
          width: '100%',
          textAlign: 'center',
          px: { xs: 2, md: 4 },
        }}>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: {
                xs: '4rem',
                sm: '5rem',
                md: '6rem',
                lg: '7rem',
                xl: '8rem',
              },
              lineHeight: { xs: 1.2, md: 1 },
              textAlign: 'center',
              letterSpacing: { xs: '1px', md: '1px' },
              color: '#111',
              userSelect: 'none',
              transition: 'all 0.3s ease-out',
            }}
          >
            <motion.div
              initial="hidden"
              animate={controls}
              variants={containerVariants}
              style={{
                display: 'flex',
                flexDirection: 'column', // Đặt mặc định là cột để ngắt dòng
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <motion.div style={{ display: 'flex', gap: '20px' }}>
                <motion.span variants={itemVariants}>
                  Crafting
                </motion.span>
               
              </motion.div>
              <motion.div style={{ display: 'flex', gap: '20px' }}>

               <motion.span variants={itemVariants}>
                  C<Box
                    component="span"
                    sx={{
                      position: 'relative',
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      mx: { xs: 0.5, md: 1 },
                      transition: 'transform 0.1s ease-out',
                      transform: `translate(${avatarOffset.x}px, ${avatarOffset.y}px)`,
                    }}
                    ref={avatarRef}
                  >
                    <Avatar
                      src="https://vulee-portfolio-git-main-vulee92s-projects.vercel.app/assets/images/avatar/vule.JPG"
                      alt="Vũ Lê"
                      sx={{
                        width: { xs: 60, sm: 80, md: 100, lg: 90 },
                        height: { xs: 60, sm: 80, md: 100, lg: 90 },
                        border: '2px solid #000000ff',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                      }}
                    />
                  </Box>de
                </motion.span>
              </motion.div>

              <motion.div style={{ display: 'flex', gap: '20px' }}>
                <motion.span variants={itemVariants}>
                  &
                </motion.span>
                <motion.span variants={itemVariants}>
                  Solutions
                </motion.span>
              </motion.div>
            </motion.div>
          </Typography>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            gap: { xs: 0.5, sm: 1 },
            marginTop: { xs: 4, md: 8 }
          }}>
            <Typography
              sx={{
                color: '#111',
                fontWeight: 600,
                fontSize: { xs: 20, sm: 24, md: 30, lg: 40 },
                userSelect: 'none',
                mr: { xs: 0, sm: 1 },
              }}
            >
              I specialize in
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography

              
              sx={{
                color: '#111',
                fontWeight: 600,
                fontSize: { xs: 20, sm: 24, md: 30, lg: 40 }
              }}>
                {typingText}
              </Typography>
              <Typography sx={{
                color: '#444',
                fontSize: { xs: 20, sm: 24, md: 30, lg: 40 }
              }}>
                |
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DotParticlesWithText;