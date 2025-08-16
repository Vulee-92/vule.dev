import { Box, Typography, styled } from '@mui/material';
import { motion } from 'framer-motion';

const StyledPill = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  padding: '8px 16px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '50px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  zIndex: 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.05)',
  }
}));

interface HeroPillProps {
  text: string;
  initialX: number;
  initialY: number;
}

export const HeroPill = ({ text, initialX, initialY }: HeroPillProps) => {
  // Random rotation between -15 and 15 degrees
  const rotation = Math.random() * 30 - 15;
  
  return (
    <StyledPill
      initial={{ 
        x: initialX,
        y: initialY,
        opacity: 0,
        scale: 0.8,
        rotate: rotation
      }}
      animate={{ 
        opacity: 1,
        scale: 1,
        x: initialX,
        y: [initialY - 20, initialY + 20, initialY - 20],
        rotate: [rotation - 5, rotation + 5, rotation - 5],
      }}
      transition={{
        opacity: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
        scale: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
        y: {
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        rotate: {
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }
      }}
    >
      <Typography 
        variant="body2"
        sx={{ 
          fontWeight: 500,
          color: 'white',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </Typography>
    </StyledPill>
  );
};
