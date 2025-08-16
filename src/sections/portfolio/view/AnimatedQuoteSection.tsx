import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { QuoteSection } from '../quote-section';

const AnimatedQuoteSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Scale the section from a smaller size to full size, then back to a smaller size
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // Interpolate the background color from a transparent background to a dark terminal-like background
  const backgroundColor = useTransform(scrollYProgress, [0, 0.3, 1], ['rgba(0, 0, 0, 0)', '#000', '#000']);
  
  // Interpolate the text color from transparent to a glowing terminal green
  const textColor = useTransform(scrollYProgress, [0, 0.3, 1], ['rgba(0, 255, 0, 0)', '#00ff00', '#00ff00']);
  
  // Animate the opacity of the box shadow to create a subtle glow effect
  const boxShadowOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.8, 0.8]);

  return (
    <motion.section
      ref={ref}
      style={{
        scale,
        height: '100vh',
        width: '100vw',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Add a subtle box shadow to enhance the "terminal" feel
        boxShadow: `0 0 20px rgba(0, 255, 0, ${boxShadowOpacity})`,
      }}
    >
      <motion.div style={{ color: textColor }}>
        <QuoteSection />
      </motion.div>
    </motion.section>
  );
};

export default AnimatedQuoteSection;