'use client';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
const sections = [
  {
    key: 'about',
    bg: 'none',
    content: "Hi, I'm Vu Le",
  },
  {
    key: 'technology',
    bg: 'none',
    content: "Technology",
  },
  {
    key: 'technology_detail',
    bg: 'none',
    content: "I’m Le Bui Thanh Vu, a software developer and designer who blends technology with creativity. To me, every line of code is a story — it’s not just about solving problems, but about creating moments of wonder and bringing joy to people. Over the years, I’ve built impactful, user-focused digital experiences that connect ideas with the people they’re made for.",
    isText: true,
  },
  {
    key: 'music',
    bg: 'none',
    content: "Music 🎸",
  },
  {
    key: 'music_detail',
    bg: 'none',
    content: "Music is my second language. It’s where I find inspiration and balance. That’s why I founded Hymns Center — a space where technology and music come together to create fun, meaningful, and inspiring learning experiences. 🎸✨",
    isText: true,
  },
  {
    key: 'also',
    bg: '#000',
    content: "Also... ",
  },
  {
    key: 'also_detail',
    bg: 'none',
    content: "Also... I believe in making things that matter — whether it’s a line of code, a piece of music, or an idea worth sharing.",
    isText: true,
  },
];


export default function AboutSectionSlides() {
  return (
    <>
      {sections.map((section) => (
        <div  key={section.key}>
          <Box
            sx={{
              height: '100vh',
              bgcolor: section.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 2,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Add motion here */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.4 }} // Only animate once when 40% visible
              // style={{
              //   width: '100%',
              // }}
            >
              <Typography
                variant={section.isText ? 'body1' : 'h1'}
                sx={{
                  fontWeight: section.isText ? 500 : 900,
                  fontSize: section.isText ? { xs: "18", md: 28 } : { xs: '4rem', md: '13vw' },
                  color: section.bg === '#000' ? '#fff' : '#111',
                  textTransform: 'lowercase',
                  letterSpacing: '-0.04em',
                  marginRight:  section.isText ? { xs: 0, md: 50 } : { xs: "18", md: 28 },
                  marginLeft:  section.isText ? { xs: 0, md: 50 } : { xs: "18", md: 28 },
                  textAlign: 'center',
                  lineHeight: section.isText ? 1.5 : 1.05,
                  // whiteSpace: 'pre-line',
                }}
              >
                {section.content}
              </Typography>
            </motion.div>
          </Box>
        </div>
      ))}
    </>
  );
}
