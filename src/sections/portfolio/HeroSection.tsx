// src/components/HeroSection.tsx
import React, { useRef } from 'react';
import { Box } from '@mui/material';
import DotParticlesWithText from 'src/components/ui/DotParticles';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroPill } from './components/HeroPill';
import SkillsDock from './SkillsDock';


function HeroSection({ heroScale }: { heroScale: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  
  return (
    <Box 
      ref={containerRef}
      className="section-snap"
      sx={{ 
        position: 'relative',
        minHeight: '150vh',
        overflow: 'hidden'
      }}
    >
      <motion.div
        initial={{ y: '100vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 2,
          duration: 0.8,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100vh',
          scale,
          opacity,
          y,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        

        {/* Main Content */}
        <DotParticlesWithText heroScale={heroScale} />
      </motion.div>
    </Box>
  );
}

export default HeroSection;