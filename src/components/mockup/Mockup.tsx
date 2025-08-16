import React, { useState } from 'react';
import { Box, styled, Skeleton } from '@mui/material';

type DeviceView = 'mobile' | 'tablet' | 'desktop';

interface MockupProps {
  deviceView: DeviceView;
  url: string;
  mockupImage?: string;
  scale?: number;
}

const defaultMockupImages = {
  mobile: '/assets/mockup/iphone.png',
  tablet: '/assets/mockup/ipad.png',
  desktop: '/assets/mockup/macbook.png',
};

const defaultMockupDimensions = {
  mobile: { container: { width: 432, height: 899, scale: 0.7 }, viewport: { width: 390, height: 844, top: 30, left: 21, clipPath: 'url(#viewport-mask1)' } },
  tablet: { container: { width: 932, height: 1291, scale: 0.6 }, viewport: { width: 834, height: 1210, top: 41, left: 48, clipPath: 'none' } },
  desktop: { container: { width: 1648, height: 947, scale: 0.48 }, viewport: { width: 1310, height: 850, top: 20, left: 170, clipPath: 'none' } },
};

const SvgDefinitions = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0 }} fill="none" xmlns="http://www.w3.org/2000/svg">
    <clipPath id="viewport-mask1">
      <path fillRule="evenodd" clipRule="evenodd" d="M61.9942 0H117.789C120.279 0 122.298 2.01925 122.298 4.51035V10.7121C122.298 21.6103 131.129 30.4449 142.023 30.4449H248.54C259.435 30.4449 268.266 21.6103 268.266 10.7121V4.51035C268.266 2.01925 270.285 0 272.775 0H328.006C348.013 0 363.37 2.31491 374.501 12.9673C386.3 24.258 390 36.3647 390 62.0174V681.122C390 685.81 390 686.962 390 689.81V782.31C390 807.963 386.864 819.742 375.065 831.033C363.933 841.685 348.577 844 328.569 844H62.5578C42.5506 844 27.194 841.685 16.0621 831.033C4.2632 819.742 0.000287411 807.463 0.000287411 781.81V165.31C0.000690563 162.31 0 157.328 0 154.48V62.0174C0 36.3647 3.69962 24.258 15.4986 12.9673C26.6304 2.31491 41.987 0 61.9942 0Z"></path>
    </clipPath>
  </svg>
);

const MockupContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'deviceView' && prop !== 'isLoaded' && prop !== 'mockupScale'
})<{ deviceView: DeviceView; isLoaded: boolean; mockupScale: number }>(({ theme, deviceView, isLoaded, mockupScale }) => {
  const { container, viewport } = defaultMockupDimensions[deviceView];

  return {
    position: 'relative',
    width: container.width,
    height: container.height,
    transform: `scale(${mockupScale})`,
    transformOrigin: 'top center',
    transition: 'all 0.5s ease-in-out',
    opacity: isLoaded ? 1 : 0.8,
    margin: 'auto',

    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `url(${defaultMockupImages[deviceView]})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      zIndex: 1,
    },

    '& > .viewport': {
      position: 'absolute',
      width: viewport.width,
      height: viewport.height,
      top: viewport.top,
      left: viewport.left,
      borderRadius: '40px',
      overflow: 'hidden',
      zIndex: 2,
      clipPath: viewport.clipPath,
    },
  };
});

const StyledIframe = styled('iframe')({
  width: '100%',
  height: '100%',
  border: 'none',
  backgroundColor: 'white',
});

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  backgroundColor: 'white',
});

const StyledVideo = styled('video')({
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Hiển thị đầy đủ video trong khung
  backgroundColor: 'white',
});

// Hàm để kiểm tra định dạng URL
const isVideoUrl = (url: string) => {
  return /\.(mp4|webm|ogg|mov)$/i.test(url);
};

const isImageUrl = (url: string) => {
  return /\.(jpeg|jpg|png|gif|webp|svg)$/i.test(url);
};

export const Mockup = ({ deviceView, url, mockupImage, scale }: MockupProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const mockupScale = scale !== undefined ? scale : defaultMockupDimensions[deviceView].container.scale;

  const isVideo = isVideoUrl(url);
  const isImage = isImageUrl(url);

  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  const handleVideoLoaded = () => {
    setIsLoaded(true);
  }

  const renderContent = () => {
    if (isVideo) {
      return (
        <StyledVideo
          src={url}
          onLoadedData={handleVideoLoaded}
          style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
          autoPlay
          loop
          muted
          playsInline
          key={deviceView}
        />
      );
    } else if (isImage) {
      return (
        <StyledImage
          src={url}
          alt="Embedded image"
          onLoad={handleLoad}
          style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
          key={deviceView}
        />
      );
    } else {
      return (
        <StyledIframe
          title="Embedded Website"
          src={url}
          onLoad={handleLoad}
          style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
          loading="lazy"
          key={deviceView}
        />
      );
    }
  }

  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <MockupContainer deviceView={deviceView} isLoaded={isLoaded} mockupScale={mockupScale}>
        <Box className="viewport">
          {!isLoaded && <Skeleton
            variant="rectangular"
            sx={{
              width: '100%',
              height: '100%',
              zIndex: 1,
            }}
          />}
          {renderContent()}
        </Box>
      </MockupContainer>
      {deviceView === 'mobile' && <SvgDefinitions />}
    </Box>
  );
};