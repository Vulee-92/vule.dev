// src/components/ProfileSection.tsx
import React from 'react';
import { Box } from '@mui/material';
import ScrollingLogos from './ScrollingLogos';
import HighlightedText from './HighlightedText';
import RandomCurveSVG from 'src/components/ui/RandomCurveSVG';

const ProfileSection = () => {
  return (
    <Box sx={{
      bgcolor: '#000',
      color: '#fff',
      display: 'flex',
      paddingTop: '100px',
      minHeight: '100vh',
      position: 'relative',
      zIndex: 2,
      flexDirection: 'column',
    }}
    >  
    
      {/* <ScrollingLogos /> */}
      <HighlightedText />
    </Box>
  );
};

export default ProfileSection;