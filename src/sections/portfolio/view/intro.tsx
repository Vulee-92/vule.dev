'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';

const IntroContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#000',
  overflow: 'hidden',
  // Thêm chiều cao tối thiểu để tránh giật
  minHeight: '100vh',
});

const SubText = styled(motion.p)({
  fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
  color: 'rgba(255,255,255,0.7)',
  marginTop: '20px',
  // fontFamily: "'Plus Jakarta Sans', sans-serif",
});

const IntroOverlay = styled(motion.div)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: '#fff',
  zIndex: 1001,
});

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [isDrawingComplete, setIsDrawingComplete] = useState(false);

  useEffect(() => {
    if (isDrawingComplete) {
      // Sau khi hiện subtext 1.5s thì chuyển trang
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isDrawingComplete, onComplete]);

  return (
    <AnimatePresence>
      <IntroContainer>
        {/* Handwriting SVG */}
        <Box
    sx={{
        width: '100%',
        maxWidth: { xs: 200, md: 400, lg: 500, xl: 500 }, // Điều chỉnh maxWidth cho từng breakpoint
        height: 'auto',
        margin: '0 auto',
        transform: 'translateZ(0)',
    }}
>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1126 637"
          fill="none"
          style={{
            width: '100%',
            height: '100%',
            // Thêm translateZ(0) để kích hoạt tăng tốc GPU
            transform: 'translateZ(0)',
          }}
        >
          <motion.path
            d="M11.5 358.852C13.0319 374.218 19.1557 396.642 21.5 416C24.2784 438.943 34.8026 477.463 41 503.831C47.2767 530.536 51.2928 548.428 64.5 583.5C72.194 603.932 80.5 609.679 99.5 617.499C108.823 621.336 139.742 623.076 149 621.5C172.5 617.499 181.329 608.164 201.5 587.112C220.147 567.65 234.351 542.228 244 521C254 499 258.303 481.092 264.5 462.5C270.697 443.908 273.606 418.551 279.038 398.381C284.305 378.82 286.001 361.219 287.556 358.852C302.605 335.942 283.703 453.857 287.556 503.831C289.117 524.074 292.175 545.192 302.202 569.193C320.189 612.245 325.486 607.379 342.5 617.499C360.674 628.309 389.005 626.297 397.5 623.999C417.681 618.54 433.105 614.176 445.5 587.112C456.765 562.515 464.366 536.79 471.33 514.275C478.605 490.751 476.294 466.635 484 439.501C491.462 413.228 486.619 376.701 482 358.852C474.258 328.936 471.738 464.695 470.925 533.447C470.543 565.838 477.5 587.112 487 605.681C489.554 610.673 497.118 616.304 501.5 617.499C507 618.999 510 618.499 514.5 617.499C541.5 611.499 555.823 584.616 566.5 562.999C575.5 544.777 589.835 513.001 604.5 486.584 C615.787 466.252 634 439.5 661 382.11C673.618 355.289 684.889 329.581 694.5 310.001C708 282.499 726.5 235.999 737.5 204.499C744.777 183.659 751.845 159.101 754.5 133.499C758.699 92.9989 757.98 64.2539 752.595 40.9265C750.185 30.488 741.146 19.666 730.196 14.6049C710.5 5.5016 683.785 20.4999 678 27.9986C664.498 45.5004 631.363 151.499 624.863 191.499C618.363 231.499 612.538 277.975 610.193 301.999C608.095 323.498 607 353.999 605.5 381.999C604.274 404.891 604.5 442.239 604.5 486.584 C604.5 516.999 605.5 540.999 610.193 560.721C614.676 579.557 617.637 594.529 628.5 601.499C635.771 606.164 648.005 607.213 666.55 605.681C690.758 603.681 715.193 590.064 730.057 573.974C754.5 547.513 788.653 516.571 802.778 491.226C816 467.499 818.298 436.378 816 416.277C814.94 407 809 395 800 390.512C783.103 382.086 780.582 384.913 769 388C764.661 389.156 748.5 394.528 742.5 416.277C723.758 484.213 748.695 517.339 758.699 547.513C770.168 582.106 789.029 595.664 799.69 600.203C821.5 609.488 855.374 599.507 877.031 587.924C911.57 569.452 947.187 553.07 967 518.5C982.552 491.366 985.188 461.91 986 416.277C986.181 406.083 981.077 396.483 976.5 390.512C972.894 385.807 970.038 384.477 963.098 382.11C945.5 376.106 942.031 376.987 926.5 388C895.768 409.792 895.958 480.397 904.5 511.5C911.586 537.303 920.4 562.381 937.5 582.499C946 592.499 971.435 598.711 976.5 599.499C999 602.999 998 601.999 1037 589.999C1071.87 579.269 1043.5 587.499 1064 579.999C1080.4 573.998 1088 568.999 1098 562.999C1102.81 560.114 1104 559.499 1114.5 552.999"
            stroke="white"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              ease: 'easeInOut',
            }}
            onAnimationComplete={() => setIsDrawingComplete(true)}
          />
        </motion.svg>
</Box>
        {/* {isDrawingComplete && (
          <SubText
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
                duration: 0.8,
                delay: 0.2, 
            }}
          >
            I'm a software engineer
          </SubText>
        )} */}

        {/* Overlay trắng fade lên khi xong */}
        {isDrawingComplete && (
          <IntroOverlay
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.8,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
          />
        )}
      </IntroContainer>
    </AnimatePresence>
  );
}
