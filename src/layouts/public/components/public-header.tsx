import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';

export function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    controls.start({
      height: scrolled ? 70 : 90,
      paddingTop: scrolled ? 4 : 12,
      paddingBottom: scrolled ? 4 : 12,
      transition: { duration: 0.3, ease: 'easeOut' },
    });
  }, [scrolled, controls]);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 140, damping: 18 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        borderBottom: '2px solid black',
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          px: 4,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo - Brutalist, tilted */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            fontFamily: `'IBM Plex Mono', monospace`,
            transform: 'rotate(-10deg)',
            color: '#000',
            fontSize: '2rem',
          }}
        >
          Vulee
        </Typography>

        {/* Center menu */}
        <Box sx={{ display: 'flex', gap: 4 }}>
          {['ABOUT US', 'SERVICES', 'TECHNOLOGIES', 'PARTNERS'].map((item) => (
            <Typography
              key={item}
              sx={{
                fontSize: '0.9rem',
                fontWeight: 500,
                fontFamily: `'Inter', sans-serif`,
                color: '#000',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>

        {/* Contact us button */}
        <Button
          variant="outlined"
          sx={{
            color: '#000',
            borderColor: '#000',
            borderWidth: 2,
            borderRadius: 0,
            px: 3,
            py: 1,
            fontWeight: 600,
            fontFamily: `'Inter', sans-serif`,
            textTransform: 'none',
            fontSize: '1rem',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          Contact us
        </Button>
      </Box>
    </motion.div>
  );
}
