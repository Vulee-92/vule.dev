'use client';

import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Link,
  Container,
  IconButton,
  Typography,
} from '@mui/material';
import { Iconify } from 'src/components/iconify';
import Logo from './logo';
import { useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { text: 'Trang chủ', href: '/' },
  { text: 'Dự án', href: '/projects' },
  { text: 'About', href: '/about' },
  { text: 'Youtube', href: '/music' },
  { text: 'Liên hệ', href: '/contact' },
  { text: 'CV', href: '/cv' },
];

const CONTACT_INFO = {
  phone: '0986 32 09 32',
  phoneLink: 'tel:+84986320932'
};

const StyledHeader = styled(Box)(({ theme }) => ({
   position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 9999,
  padding: theme.spacing(2, 0),
  background: 'rgba(255, 255, 255, 0.01)', 
  WebkitBackdropFilter: 'blur(1px) saturate(180%)',
  backdropFilter: 'blur(3px) saturate(180%)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.03)',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.03), transparent)',
  }
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  color: '#000',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%)',
    opacity: 0,
    transition: 'all 0.3s ease',
  },
  '&:hover': {
    '&::before': {
      opacity: 1,
      transform: 'scale(1.5)',
    },
    '& .menu-icon': {
      transform: 'rotate(90deg) scale(1.1)',
    }
  }
}));

const CallButton = styled(Link)(({ theme }) => ({
  width: 40,
  height: 40,
  color: '#000',
  position: 'relative',
  marginRight: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  transition: 'all 0.3s ease',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    border: '2px solid rgba(0,0,0,0.1)',
    borderRadius: '50%',
    animation: 'ripple 2s infinite cubic-bezier(0.4, 0, 0.6, 1)',
  },
  '&::after': {
    animationDelay: '0.5s',
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(1)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(1.8)',
      opacity: 0,
    }
  },
  '&:hover': {
    background: 'rgba(0,0,0,0.05)',
    transform: 'translateY(-2px)',
    '& .phone-icon': {
      transform: 'scale(1.1) rotate(15deg)',
      color: '#000',
    }
  }
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  top: 20,
  right: 20,
  width: 48,
  height: 48,
  color: '#fff',
  zIndex: 1000,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    background: 'rgba(255, 255, 255, 0.1)',
  }
}));

const GridBackground = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  background: `
    linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
  `,
  backgroundSize: '50px 50px',
  opacity: 0.5,
});

const MenuContainer = styled(motion.div)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(45deg, #000000 0%, #1a1a1a 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999, // Set zIndex higher to avoid conflicts
});

const Particle = styled(motion.div)({
  position: 'absolute',
  width: '2px',
  height: '2px',
  background: 'rgba(255,255,255,0.5)',
  borderRadius: '50%',
});

const MenuItem = styled(motion.a)({
  color: '#fff',
  fontSize: '2.5rem',
  textDecoration: 'none',
  padding: '1rem',
  display: 'block',
  fontWeight: 500,
  position: 'relative',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#fff',
    transform: 'scale(1.1)',
    textShadow: '0 0 20px rgba(255,255,255,0.5)',
    '&::before': {
      transform: 'scaleX(1)',
      opacity: 1,
    }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #fff, transparent)',
    transform: 'scaleX(0)',
    opacity: 0,
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    transformOrigin: 'center',
  }
});

export function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [particles, setParticles] = useState(Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
  })));

  // Animation variants
  const menuVariants = {
    closed: {
      clipPath: 'circle(0% at calc(100% - 40px) 40px)',
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
      }
    },
    open: {
      clipPath: 'circle(150% at calc(100% - 40px) 40px)',
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
      }
    }
  };

  const itemVariants = {
    closed: { y: 50, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      }
    })
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  // The useEffect for active section is likely not needed for SPA navigation
  // but if you have a scroll-based section active indicator, you might need to adjust it
  // to work with react-router-dom routes.
  useEffect(() => {
    // This part is for scroll-based active section, not for navigation
    // Since you're navigating to new pages, this logic will need to be re-evaluated
    // or removed depending on your desired behavior.
    const handleScroll = () => {
      const sections = NAV_ITEMS.filter(item => item.href.startsWith('#')).map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          return scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    // Check if the current route is a hash-based link before adding the event listener
    const isHashLink = NAV_ITEMS.some(item => item.href.startsWith('#'));
    if (isHashLink) {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <>
      <StyledHeader
        sx={{
          visibility: isMenuOpen ? 'hidden' : 'visible',
          opacity: isMenuOpen ? 0 : 1,
          transition: 'all 0.3s ease',
          transform: isMenuOpen ? 'translateY(-100%)' : 'translateY(0)',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
           
            <Logo width={100}/>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CallButton href={CONTACT_INFO.phoneLink}>
                <Iconify
                  icon="solar:phone-bold" 
                  width={24}
                  className="phone-icon"
                  sx={{ 
                    transition: 'all 0.3s ease',
                  }} 
                />
              </CallButton>
              <MenuButton onClick={handleMenuClick}>
                <Iconify 
                  icon="custom:menu-duotone"
                  width={24}
                  className="menu-icon"
                  sx={{ 
                    transition: 'all 0.3s ease',
                  }} 
                />
              </MenuButton>
            </Box>
          </Box>
        </Container>
      </StyledHeader>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <CloseButton onClick={handleMenuClick}>
              <Iconify 
                icon="mingcute:close-line" 
                width={32}
                sx={{
                  filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
                }} 
              />
            </CloseButton>
            
            <MenuContainer
              initial="closed"
              animate="open"
              exit="closed"
              // variants={menuVariants}
            >
              <GridBackground />
              
              {particles.map((particle) => (
                <Particle
                  key={particle.id}
                  initial={{ x: `${particle.x}%`, y: `${particle.y}%`, opacity: 0 }}
                  animate={{
                    x: [
                      `${particle.x}%`,
                      `${particle.x + (Math.random() - 0.5) * 20}%`,
                      `${particle.x}%`
                    ],
                    y: [
                      `${particle.y}%`,
                      `${particle.y + (Math.random() - 0.5) * 20}%`,
                      `${particle.y}%`
                    ],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}

              <Box
                component={motion.div}
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  opacity: 0.15,
                  background: 'radial-gradient(circle at center, #ffffff22 0%, transparent 50%)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <Box sx={{ 
                textAlign: 'center',
                position: 'relative',
                zIndex: 2,
              }}>
                {NAV_ITEMS.map((item, i) => (
                  <MenuItem
                    key={item.text}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    custom={i}
                    variants={itemVariants}
                  >
                    {item.text}
                  </MenuItem>
                ))}
              </Box>
            </MenuContainer>
          </>
        )}
      </AnimatePresence>
    </>
  );
}