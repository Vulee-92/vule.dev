import { Box, Typography, styled } from '@mui/material';
import { motion, Variants, HTMLMotionProps } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';
import Logo from './logo';
import ResponsiveWebsiteEmbed from 'src/components/mockup/ResponsiveWebsiteEmbed';
import { Link } from 'react-router-dom';

// Styled components for animation containers
const AnimatedBox = styled(motion.div)({
  width: '100%',
  overflow: 'hidden',
});

const SectionTitle = styled(motion(Typography))({
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    background: '#111',
    transformOrigin: 'right',
  },
});

const StyledLink = styled('a')({
  fontSize: '1.25rem',
  color: '#444',
  textDecoration: 'underline',
  textDecorationColor: '#ccc',
  textDecorationThickness: '1px',
  fontWeight: 400,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'inline-block',
  '&:hover': {
    color: '#111',
    textDecorationColor: '#111',
    transform: 'translateY(-2px) scale(1.05)',
  },
});

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    }
  }
};

const titleVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

const textVariants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

const linkContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1
    }
  }
};

const linkItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const nameVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: "easeOut"
    }
  }
};

interface FooterSectionProps {
  title: string;
  children: ReactNode;
  delay?: number;
}

const FooterSection = ({ title, children, delay = 0 }: FooterSectionProps) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <AnimatedBox
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
      sx={{ mb: 8 }}
    >
      <SectionTitle
        variant="h2"
        sx={{
          fontWeight: 700,
          fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
          color: '#111',
          textTransform: 'lowercase',
          mb: 3,
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </SectionTitle>
      <motion.div >
        {children}
      </motion.div>
    </AnimatedBox>
  );
};

export default function Footer() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const siteLinks = ['home', 'projects', 'about', 'CV', 'music'];
  const socialLinks = ['savee', 'linkedin', 'instagram', 'email'];

  return (
    <Box
      ref={ref}
      component="footer"
      sx={{
        position: 'relative',
        color: '#111',
        pt: { xs: 12, md: 16 },
        pb: { xs: 8, md: 12 },
        px: { xs: 3, md: 10 },
        minHeight: '80vh',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 8, md: 16 },
          maxWidth: 1600,
          mx: 'auto',
          mb: 12,
        }}
      >
        {/* Left Column */}
        <Box>
          <FooterSection title="status" delay={0.2}>
            <Typography
              sx={{
                fontSize: { xs: 18, md: 20, lg: 22 },
                color: '#444',
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              I'm a freelance designer and developer specializing in creating engaging and effective web experiences.
              <br />
              <br />
              Need a stunning website to grow your business? Explore my projects to see how I can help you.
              <br />
              <a
                href={`https://pixel-duo.vercel.app/`}
                target="_blank"
                rel="noopener"
                style={{ color: '#444', fontWeight: 800, textDecoration: 'underline' }}
              >
                pixel-duo.vercel.app
              </a>

            </Typography>
          </FooterSection>




        </Box>

        {/* Right Column */}
        <Box>
          <FooterSection title="speciality" delay={0.3}>
            <Typography
              sx={{
                fontSize: { xs: 18, md: 20, lg: 22 },
                color: '#444',
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              Specializing in web design, development, and digital marketing, with a passion for creating user-friendly interfaces and engaging user experiences.

            </Typography>
          </FooterSection>

          <FooterSection title="credits" delay={0.5}>
            <Typography
              sx={{
                fontSize: { xs: 18, md: 20, lg: 22 },
                color: '#444',
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              This website is built with love using NextJS, Material-UI, Google App Scripts API and Framer Motion. Special thanks to the open-source community for their contributions.

            </Typography>
          </FooterSection>
          <FooterSection title="album" delay={0.4}>
            <Typography
              sx={{
                fontSize: { xs: 18, md: 20, lg: 22 },
                color: '#444',
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              Check out my latest album on YouTube, featuring a collection of my recent music projects.

            </Typography>
          </FooterSection>
          <FooterSection title="sitemap" delay={0.6}>
            <motion.div
              variants={linkContainerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {siteLinks.map((item) => (
                  <motion.div key={item} variants={linkItemVariants}>
                    <StyledLink href={item === 'home' ? '/' : `/${item.toLowerCase()}`}  >
                      <StyledLink>
                        {item}
                      </StyledLink>
                    </StyledLink>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </FooterSection>
          <FooterSection title="social" delay={0.7}>
            <motion.div
              variants={linkContainerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {socialLinks.map((item) => (
                  <motion.div key={item} variants={linkItemVariants}>
                    <StyledLink
                      href={`https://${item}.com/${item}`}
                      target="_blank"
                      rel="noopener"
                    >
                      {item}
                    </StyledLink>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </FooterSection>
        </Box>
      </Box>

      {/* Large Name at Bottom */}
      <motion.div
        variants={nameVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <Box sx={{ textAlign: 'center', mt: 12 }}>
          <Logo width={500} />

        </Box>
      </motion.div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Box
          sx={{
            textAlign: 'center',
            mt: 8,
            pt: 6,
            borderTop: '1px solid #e0e0e0',
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              color: '#666',
              fontWeight: 500,
            }}
          >
            Vulee 2025.
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
}
