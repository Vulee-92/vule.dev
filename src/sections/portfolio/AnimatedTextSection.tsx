import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { motion,  useAnimation, useScroll, useTransform } from 'framer-motion';

const designTools = [
  { name: 'Interactive Prototypes', icon: '🔄' },
  { name: 'Transitions', icon: '✨' },
  { name: 'Usability', icon: '👥' },
  { name: 'Microinteractions', icon: '⚡' },
  { name: 'Prototyping', icon: '🛠️' },
  { name: 'Design', icon: '🎨' },
];

const skillsTools = [
  { name: 'Design System', icon: '📐' },
  { name: 'Component Library', icon: '📚' },
  { name: 'Atomic Design', icon: '⚛️' },
  { name: 'Design Tokens', icon: '🎨' },
  { name: 'Figma', icon: '🎯' },
  { name: 'Xd', icon: '✨' },
  { name: 'Governance', icon: '🔄' },
];

const interfaceTools = [
  { name: 'Interface', icon: '💻' },
  { name: 'Playground', icon: '🎮' },
  { name: 'Interaction', icon: '🤝' },
  { name: 'Experience', icon: '✨' },
];
// Tools/skills data
const devSkills = [
  { name: 'ReactJS', icon: '⚛️' },
  { name: 'NextJS', icon: '⏭️' },
  { name: 'NodeJS', icon: '🟩' },
  { name: 'NestJS', icon: '�' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'PostgreSQL', icon: '�' },
  { name: 'VPS Server', icon: '�️' },
  { name: 'Motion', icon: '🎞️' },
  { name: 'MUI UI', icon: '🟦' },
  { name: 'TailwindCSS', icon: '🌬️' },
  { name: 'Antd', icon: '🐜' },
];
const musicHobbies = [
  { name: 'Âm nhạc', icon: '🎵' },
  { name: 'Guitar', icon: '🎸' },
];
const toolss = [
  { name: 'VSCode', icon: '�️' },
  { name: 'Photoshop', icon: '🅿️' },
  { name: 'Canva', icon: '🖌️' },
  { name: 'Logic Pro', icon: '�️' },
  { name: 'Final Cut', icon: '🎬' },
];

// Chỉnh styled-components có responsive
const LineHeight = '120px';

const Container = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '2rem',
  maxWidth: 1600,
  margin: '0 auto',
  gap: '2rem',
  [theme.breakpoints.down('sm')]: {
    padding: '1rem',
    gap: '1.2rem',
  }
}));

const MarqueeContainer = styled(motion.div)<{ active?: boolean }>(({ theme, active }) => ({
  width: '100%',
  overflow: 'hidden',
  background: active ? '#111' : 'none',
  padding: '0 1rem',
  height: LineHeight,
  display: 'flex',
  alignItems: 'center',
  borderRadius: '12px',
  transform: active ? 'scale(1)' : 'scale(0.98)',
  opacity: active ? 1 : 0,
  transition: 'transform 0.4s ease, opacity 0.4s ease',
  [theme.breakpoints.down('sm')]: {
    height: '70px',
    padding: '0 0.5rem',
  }
}));

const ToolItem = styled(Box)<{ active?: boolean }>(({ theme, active }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5em',
  fontWeight: 400,
  fontSize: '2.1rem',
  color: active ? '#fff' : '#A7A7A7',
  transition: 'color 0.2s',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
    gap: '0.3em',
  }
}));

const GrayText = styled(Typography)<{ active?: boolean; isLarge?: boolean }>(({ theme, active, isLarge }) => ({
  color: active ? '#fff' : '#A7A7A7',
  fontSize: isLarge ? '7rem' : '5.2rem',
  fontWeight: 300,
  letterSpacing: '-0.03em',
  transition: 'all 0.4s ease',
  [theme.breakpoints.down('sm')]: {
    fontSize: isLarge ? '2rem' : '1.6rem',
  }
}));

const BlackText = styled(Typography)<{ active?: boolean; isLarge?: boolean }>(({ theme, active, isLarge }) => ({
  color: active ? '#fff' : '#111',
  fontSize: isLarge ? '7rem' : '5.2rem',
  fontWeight: 400,
  letterSpacing: '-0.03em',
  transition: 'all 0.4s ease',
  [theme.breakpoints.down('sm')]: {
    fontSize: isLarge ? '2rem' : '1.6rem',
  }
}));

const AnimatedLine = styled(Box)<{ active?: boolean }>(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5em',
  width: '100%',
  background: active ? '#111' : 'none',
  borderRadius: '12px',
  cursor: 'pointer',
  height: LineHeight,
  padding: '0 1rem',
  transform: active ? 'scale(1.02)' : 'scale(1)',
  transition: 'all 0.4s ease',
  [theme.breakpoints.down('sm')]: {
    height: '70px',
    padding: '0 0.5rem',
  }
}));


interface TextLineProps {
  grayText: string;
  blackText: string;
  tools?: Array<{ name: string; icon: string }>;
  isLarge?: boolean;
}

const ToolsMarquee = ({ tools, active }: { tools: Array<{ name: string; icon: string }>, active?: boolean }) => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active && containerRef.current) {
      const width = containerRef.current.scrollWidth;
      controls.start({
        x: [-width/2, 0],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 15,
            ease: "linear"
          }
        }
      });
    } else {
      controls.stop();
    }
  }, [active, controls]);
  // Only duplicate once for smooth loop
  const displayTools = [...tools, ...tools];
  const [width, setWidth] = useState(0);
  const marqueeRef = (el: HTMLDivElement | null) => {
    if (el) setWidth(el.scrollWidth / 2);
  };

  // Animate when active
  React.useEffect(() => {
    if (active && width) {
      controls.start({
        x: [-0, -width],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 12,
            ease: 'linear',
          },
        },
      });
    } else {
      controls.stop();
      controls.set({ x: 0 });
    }
  }, [active, width, controls]);

  return (
    <MarqueeContainer active={active}>
      <Box
        component={motion.div}
        ref={marqueeRef}
        animate={controls}
        style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', gap: '2.5rem', fontSize: '2.1rem', color: active ? '#fff' : '#A7A7A7', width: 'max-content' }}
      >
        {displayTools.map((tool, idx) => (
          <ToolItem key={tool.name + idx} active={active}>
            <span>{tool.icon}</span>
            <span>{tool.name}</span>
          </ToolItem>
        ))}
      </Box>
    </MarqueeContainer>
  );
};

interface TextLineProps {
  grayText: string;
  blackText: string;
  tools?: Array<{ name: string; icon: string }>;
  isLarge?: boolean;
  isActive?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const TextLine = ({ 
  grayText, 
  blackText, 
  tools, 
  isLarge = false,
  isActive = false,
  onMouseEnter,
  onMouseLeave 
}: TextLineProps) => {
  return (
    <AnimatedLine
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      active={isActive}
      style={{ minHeight: '1.5em' }}
    >
      {!isActive || !tools ? (
        <>
          {grayText && <GrayText as="span" active={isActive} isLarge={isLarge}>{grayText + ' '}</GrayText>}
          {blackText && <BlackText as="span" active={isActive} isLarge={isLarge}>{blackText}</BlackText>}
        </>
      ) : (
        <ToolsMarquee tools={tools} active={true} />
      )}
    </AnimatedLine>
  );
};

export default function AnimatedTextSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    // Ensure the refs are hydrated
    if (!containerRef.current || !sectionRef.current) return;
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Box ref={sectionRef} sx={{ minHeight: '100vh', width: '100%' }}>
      <motion.div
        ref={containerRef}
        style={{
          scale,
          opacity
        }}
      >
        <Container>
          <TextLine 
            grayText="I am a" 
            blackText="Product Designer" 
            tools={designTools} 
            isLarge 
            isActive={activeIndex === 0}
            onMouseEnter={() => handleMouseEnter(0)}
            onMouseLeave={handleMouseLeave}
          />
          <TextLine 
            grayText="I create" 
            blackText="Interaction Design" 
            tools={skillsTools}
            isActive={activeIndex === 1}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
          />
          <TextLine 
            grayText="I think about" 
            blackText="Design system" 
            tools={skillsTools}
            isActive={activeIndex === 2}
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={handleMouseLeave}
          />
          <TextLine 
            grayText="Interface" 
            blackText="is my playground" 
            tools={interfaceTools}
            isActive={activeIndex === 3}
            onMouseEnter={() => handleMouseEnter(3)}
            onMouseLeave={handleMouseLeave}
          />
        </Container>
      </motion.div>
    </Box>
  );
}
