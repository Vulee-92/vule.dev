// src/components/AboutSection.tsx
import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';

const aboutText = {
  section1: "Hi! I’m Le Bui Thanh Vu, a developer who loves both technology and music. Thanks for stopping by—great to meet you!",
  section2: "To me, every line of code tells a story and sparks creativity. I believe technology isn’t just about solving problems, but also about creating wonder and bringing joy to people.",
  section3: "Music is my other big passion. That’s why I created Hymns Center—a place where tech and music come together to offer fun and meaningful learning experiences. 🎸✨",
};


const HighlightedText = () => {
  const [highlightOpacity, setHighlightOpacity] = useState(1);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const fadeStart = viewportHeight * 0.7;
        
        if (rect.top > fadeStart) {
          setHighlightOpacity(1);
        } else if (rect.top < -rect.height * 0.5) {
          setHighlightOpacity(0);
        } else {
          const newOpacity = 1 - (fadeStart - rect.top) / (fadeStart + rect.height * 0.5);
          setHighlightOpacity(Math.max(0, newOpacity));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getHighlightStyle = (opacity: number) => ({
    background: `linear-gradient(to right, rgba(255, 255, 255, ${opacity}), rgba(255, 255, 255, ${opacity}))`,
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    WebkitBackgroundClip: 'text',
    transition: 'opacity 0.3s ease-out',
  });

  return (
    <Box sx={{
      bgcolor: '#000',
      color: '#fff',
      py: 10,
      px: { xs: 2, md: 5 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Box sx={{ maxWidth: 1000 }}>
        <Typography
          ref={textRef}
          variant="h2"
          sx={{
            fontWeight: 400,
            fontSize: { xs: '1.5rem', md: '2rem' },
            lineHeight: 1.5,
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.4)',
            ...getHighlightStyle(highlightOpacity),
          }}
        >
          {aboutText.section1}
          <Box component="span" sx={{ display: 'block', mt: 4, mb: 4 }}>
            &mdash;
          </Box>
          <Box component="span" sx={{
            display: 'block',
            fontWeight: 400,
            fontSize: { xs: '1.5rem', md: '2rem' },
            lineHeight: 1.5,
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.4)',
            ...getHighlightStyle(highlightOpacity),
          }}>
            {aboutText.section2}
          </Box>
          <Box component="span" sx={{ display: 'block', mt: 4, mb: 4 }}>
            &mdash;
          </Box>
          <Box component="span" sx={{
            display: 'block',
            fontWeight: 400,
            fontSize: { xs: '1.5rem', md: '2rem' },
            lineHeight: 1.5,
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.4)',
            ...getHighlightStyle(highlightOpacity),
          }}>
            {aboutText.section3}
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default HighlightedText;