'use client';

import React, { useRef, useState } from 'react';
import { Box, styled, ToggleButton, ToggleButtonGroup, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Mockup } from './Mockup';

type DeviceView = 'mobile' | 'tablet' | 'desktop';
type ScaleValue = number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };

const deviceIcons = {
  mobile: {
    iconUrl: '/assets/mockup/iphone_mini.png',
    label: 'Mobile'
  },
  tablet: {
    iconUrl: '/assets/mockup/ipad_mini.png',
    label: 'Tablet'
  },
  desktop: {
    iconUrl: '/assets/mockup/macbook_mini.png',
    label: 'Macbook'
  },
};
const HeroText = (() => ({
  fontSize: 'clamp(4rem, 5vw, 13rem)',
  fontWeight: 800,
  lineHeight: 0.8,
  letterSpacing: '-0.02em',
  margin: 0,
  color: '#111',
  position: 'relative',
  textTransform: 'uppercase',
  zIndex: 3,
}));
const IframeWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '65vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(3),
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1),
  border: 'none',
  backgroundColor: 'transparent',
  color: theme.palette.text.secondary,
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.1)',
  },
  '&.Mui-selected': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    '&:before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      height: '3px',
      width: '80%',
      backgroundColor: theme.palette.primary.main,
      borderRadius: '2px',
    },
  },
}));

interface ResponsiveWebsiteEmbedProps {
  url: string;
  initialDeviceView?: DeviceView;
  mockupImages?: Partial<Record<DeviceView, string>>;
  scales?: Partial<Record<DeviceView, ScaleValue>>;
  visibleDevices?: readonly DeviceView[];
}

export default function ResponsiveWebsiteEmbed({
  url,
  initialDeviceView = 'desktop',
  mockupImages,
  scales,
  visibleDevices,
}: ResponsiveWebsiteEmbedProps) {
  
  const theme = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
  
  // Gọi tất cả các hooks lên cấp cao nhất của component
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));

  const allDeviceKeys = Object.keys(deviceIcons) as readonly DeviceView[];
  const devicesToDisplay = visibleDevices ? visibleDevices : allDeviceKeys;

  const initialView = devicesToDisplay.includes(initialDeviceView) ? initialDeviceView : devicesToDisplay[0];
  const finalInitialView = initialView || 'desktop';
  
  const [deviceView, setDeviceView] = useState<DeviceView>(finalInitialView);

  const handleDeviceChange = (
    _event: React.MouseEvent<HTMLElement>,
    newView: DeviceView | null,
  ) => {
    if (newView !== null) {
      setDeviceView(newView);
    }
  };
  
  // Hàm xử lý responsive scale đã được tối ưu
  const getResponsiveScale = (scaleSetting: ScaleValue | undefined): number | undefined => {
    if (typeof scaleSetting === 'object') {
      if (isLg && scaleSetting.lg !== undefined) return scaleSetting.lg;
      if (isMd && scaleSetting.md !== undefined) return scaleSetting.md;
      if (isSm && scaleSetting.sm !== undefined) return scaleSetting.sm;
      if (scaleSetting.xs !== undefined) return scaleSetting.xs;
      return undefined;
    }
    return scaleSetting;
  };

  const finalScale = getResponsiveScale(scales?.[deviceView]);
  

  return (
    <Box sx={{ my: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
         
            
        <ToggleButtonGroup
          value={deviceView}
          exclusive
          onChange={handleDeviceChange}
          aria-label="device view"
        >
          {devicesToDisplay.map((view) => {
            const device = deviceIcons[view];
            return (
              <StyledToggleButton key={view} value={view} aria-label={device.label}>
                <img src={device.iconUrl} alt={device.label} style={{ width: '40px', height: 'auto', marginBottom: '8px' }} />
                <Typography variant="caption" sx={{ mt: 1 }}>{device.label}</Typography>
              </StyledToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </Box>

      <IframeWrapper>
        <Mockup
          deviceView={deviceView}
          url={url}
          mockupImage={mockupImages?.[deviceView]}
          scale={finalScale}
        />
      </IframeWrapper>
    </Box>
  );
}