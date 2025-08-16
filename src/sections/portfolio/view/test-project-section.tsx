'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Box, Container, Typography, styled, alpha } from '@mui/material';

const HeroText = styled(motion.h1)(({ theme }) => ({
  fontSize: 'clamp(4rem, 5vw, 13rem)',

  fontWeight: 800,
  lineHeight: 0.8,
  letterSpacing: '-0.02em',
  margin: 0,
  color: theme.palette.mode === 'dark' ? '#fff' : '#111',
  position: 'relative',
  textTransform: 'uppercase',
}));

const ProjectCard = styled(motion.section)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(4),
  overflow: 'hidden',
  cursor: 'pointer',
  marginBottom: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    '& .project-image': {
      transform: 'scale(1.05)',
    },
    '& .project-overlay': {
      backgroundColor: alpha('#000', 0.2),
    },
    boxShadow: theme.shadows[10],
  },
}));

const ProjectImage = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
});

const ProjectOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: alpha('#000', 0.3),
  transition: 'background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
});

const ProjectContent = styled(Box)({
  position: 'relative',
  zIndex: 1,
  color: '#fff',
  maxWidth: '60%',
});

const projects = [
  {
    id: 1,
    title: 'Monogram Shop',
    description: 'A full-featured e-commerce platform built with Next.js and TypeScript',
    category: 'Web Development',
    image: '/assets/images/cover/cover-1.webp',
    url: '/work/monogram',
  },
  {
    id: 2,
    title: 'Spotify Clone',
    description: 'A music streaming app built with React and Node.js',
    category: 'Full Stack Development',
    image: '/assets/images/cover/cover-2.webp',
    url: '/work/spotify',
  },
  {
    id: 3,
    title: 'Portfolio 2025',
    description: 'A modern portfolio website showcasing my work',
    category: 'UI/UX Design',
    image: '/assets/images/cover/cover-3.webp',
    url: '/work/portfolio',
  },
];

const TestProjectSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <Box 
      ref={containerRef} 
      sx={theme => ({
        backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f5f5f5',
        minHeight: '100vh',
        width: '100%'
      })}
    >
      <Container 
        maxWidth={false} 
        sx={{ 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        <motion.section
          style={{
            scale: heroScale,
            opacity: heroOpacity,
            y: heroY,
          }}
        >
          <HeroText
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Work
          </HeroText>
        </motion.section>
      </Container>

      <Container maxWidth="xl" sx={{ py: 10 }}>
        {projects.map((project, index) => (
          <motion.section
            key={project.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <ProjectCard
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectImage 
                src={project.image} 
                alt={project.title}
                className="project-image"
              />
              <ProjectOverlay className="project-overlay" />
              <ProjectContent>
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Typography 
                    variant="overline" 
                    sx={{ 
                      opacity: 0.8,
                      letterSpacing: '0.2em',
                      mb: 1,
                      display: 'block'
                    }}
                  >
                    {project.category}
                  </Typography>
                </motion.section>
                
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '4rem' },
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      mb: 2,
                      lineHeight: 1
                    }}
                  >
                    {project.title}
                  </Typography>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: '1.5rem', md: '2rem' },
                      fontWeight: 400,
                      opacity: 0.8
                    }}
                  >
                    {project.description}
                  </Typography>
                </motion.section>
              </ProjectContent>
            </ProjectCard>
          </motion.section>
        ))}
      </Container>
    </Box>
  );
};

export default TestProjectSection;
