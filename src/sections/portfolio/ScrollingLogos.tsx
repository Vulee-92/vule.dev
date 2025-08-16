// src/components/ScrollingLogos.tsx
import React from 'react';
import { Box, Stack } from '@mui/material';
import { keyframes } from '@mui/system';

const logos = [
  'https://assets.website-files.com/6249c00b080838183060133a/6249c0903332467d53086812_zudio-logo.svg',
  'https://assets.website-files.com/6249c00b080838183060133a/6249c0897b7132039860c410_get-my-parking-logo.svg',
  'https://assets.website-files.com/6249c00b080838183060133a/6249c0827b7132029a60c354_lollypop-design-logo.svg',
  'https://assets.website-files.com/6249c00b080838183060133a/6249c07b46187747e4566710_icici-bank-logo.svg',
  'https://assets.website-files.com/6249c00b080838183060133a/6249c06d15f33f67f6314f24_easebuzz-logo.svg',
  'https://assets.website-files.com/6249c00b080838183060133a/6249c05e08083852086015b6_siemens-logo.svg',
  'https://assets.website-files.com/6249c00b080838183060133a/6249c0563332463e27086687_boAt-logo.svg',
];

const scrollAnimation = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
`;

const ScrollingLogos = () => {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        width: '100%',
        height: '50px',
        py: 4,
        position: 'relative',
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100px',
          zIndex: 2,
        },
        '&::before': {
          
          left: 0,
          background: 'linear-gradient(to right, #000, transparent)',
        },
        '&::after': {
          right: 0,
          background: 'linear-gradient(to left, #000, transparent)',
        },
      }}
    >
      
      <Stack
        direction="row"
        spacing={8}
        sx={{
          animation: `${scrollAnimation} 30s linear infinite`,
          display: 'flex',
          whiteSpace: 'nowrap',
          minWidth: '200%',
          alignItems: 'center',
          '&:hover': {
            animationPlayState: 'paused',
          },
        }}
      >
        {[...logos, ...logos].map((logo, index) => (
          <Box key={index} component="img" src={logo} alt={`Logo ${index}`} sx={{ height: 30, filter: 'grayscale(100%) brightness(200%)' }} />
        ))}
      </Stack>
    </Box>
  );
};

export default ScrollingLogos;