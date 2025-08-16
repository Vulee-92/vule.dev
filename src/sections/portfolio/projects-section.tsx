import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import Slider from 'react-slick';
import { Container, Typography, Box, IconButton, Stack, Chip, Link, Card, Grid, Dialog, DialogContent } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Iconify } from 'src/components/iconify';

const ProjectWrapper = styled(Box)(({ theme }) => ({
  background: '#fff',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundImage: 'url("/assets/background/dot-pattern.svg")',
    opacity: 0.3,
    pointerEvents: 'none'
  }
}));

const ProjectCard = styled(motion.div)(({ theme }) => ({
  background: '#ffffff',
  borderRadius: theme.spacing(3),
  overflow: 'hidden',
  boxShadow: '0 0 40px rgba(0, 0, 0, 0.03)',
  border: '1px solid rgba(0, 0, 0, 0.06)',
  height: '100%',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  margin: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0, 0, 3),
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.12)',
  }
}));

const ProjectImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 280,
  [theme.breakpoints.down('sm')]: {
    height: 220,
  },
  overflow: 'hidden',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.02) 100%)'
  },
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  '&:hover img': {
    transform: 'scale(1.05)',
  }
}));

const ProjectContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const TechChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  height: 28,
  padding: theme.spacing(0, 1),
  background: alpha(theme.palette.primary.main, 0.08),
  color: theme.palette.primary.darker,
  fontWeight: 600,
  fontSize: '0.75rem',
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.12),
  }
}));

const ProjectLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  transition: 'all 0.2s ease',
  padding: theme.spacing(0.5, 0),
  '& .icon': {
    marginRight: theme.spacing(0.8),
    fontSize: 20,
    transition: 'transform 0.2s ease',
  },
  '&:hover': {
    '& .icon': {
      transform: 'translateX(4px)',
    }
  }
}));

const VideoDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    maxWidth: '900px',
    width: '90%',
  }
}));

const NavigationArrow = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: 'rgba(0, 0, 0, 0.04)',
  borderRadius: '50%',
  color: '#000',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    transform: 'scale(1.1)',
  },
  '&.disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  }
}));

const NavigationWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const projects = [
  {
    id: 1,
    title: 'Hệ thống điều phối xe dịch vụ Tam Kỳ - Đà Nẵng',
    description: 'Nền tảng thương mại điện tử chuyên về điện thoại di động với tính năng quản lý inventory thời gian thực và dashboard phân tích.',
    image: './assets/images/projects/iphonetamky.png',
    technologies: ['Docker', 'NextJs', 'TailwindCSS', "NestJs", "DBeaver", "postgreSQL" ],
    demoLink: 'https://iphonetamky.vn/',
    githubLink: 'https://github.com/yourusername/phone-ecommerce',
    category: 'E-commerce',
  },
  {
    id: 2,
    title: 'Website Mua Bán Điện Thoại',
    description: 'Nền tảng thương mại điện tử chuyên về điện thoại di động với tính năng quản lý inventory thời gian thực và dashboard phân tích.',
    image: './assets/images/projects/iphonetamky.png',
    technologies: ['PHP', 'Wordpress', 'TailwindCSS'],
    demoLink: 'https://iphonetamky.vn/',
    githubLink: 'https://github.com/yourusername/phone-ecommerce',
    category: 'E-commerce',
  },
  {
    id: 3,
    title: 'Website Gia Đình Thở và Cười',
    description: 'Nền tảng cộng đồng giúp kết nối và chia sẻ kiến thức về sức khỏe tinh thần, tạo không gian giao lưu tích cực.',
    image: './assets/images/projects/giadinhthovacuoi.png',
    technologies: ['PHP', 'Wordpress', 'Bootstrap'],
    demoLink: 'https://giadinhthovacuoi.org/',
    githubLink: 'https://github.com/yourusername/breathing-community',
    category: 'Community Platform',
  },
  {
    id: 4,
    title: 'Dự Án Số Hóa Trung Tâm Âm Nhạc',
    description: 'Hệ thống quản lý trung tâm âm nhạc với tính năng quản lý lớp học, học viên, giáo viên và tài liệu giảng dạy trực tuyến.',
    image: './public/assets/images/projects/sohoaamnhac.JPG',
    technologies: ['React', 'Node.js', 'MongoDB', 'Material-UI'],
    demoLink: '#',
    githubLink: 'https://github.com/yourusername/music-center-digital',
    category: 'Education Technology',
    videoUrl: './public/assets/video/trochoi.MP4'
  }
];

export function ProjectsSection() {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const getAssetPath = (path: string) => {
    if (path.startsWith('http')) {
      return path;
    }
    
    if (import.meta.env.DEV) {
      return path;
    }
    
    return `${import.meta.env.BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`;
  };

  const handlePrevious = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        }
      }
    ],
    arrows: false,
  };

  const handleOpenVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <ProjectWrapper>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* <SectionHeading
            title="Dự án nổi bật"
            subtitle="Thiết kế website cho khách hàng ở các lĩnh vực: blog, thương mại điện tử bán điện thoại, sản phẩm handmade. Xây dựng dự án số hóa trung tâm và lớp học âm nhạc, hướng tới phát triển thành sản phẩm thương mại."
          /> */}

          <Box sx={{ 
            position: 'relative',
            px: { xs: 0, md: 8 },
            mx: { xs: 0, md: -4 }
          }}>
            <Slider ref={sliderRef} {...sliderSettings}>
              {projects.map((project) => (
                <Box key={project.id} sx={{ px: { xs: 0, md: 2 } }}>
                  <ProjectCard
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: project.id * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => project.videoUrl ? handleOpenVideo(project.videoUrl) : window.open(project.demoLink, '_blank')}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <ProjectImage>
                        <img src={getAssetPath(project.image)} alt={project.title} />
                      </ProjectImage>
                      {project.videoUrl && (
                        <IconButton
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            }
                          }}
                        >
                          <Iconify icon="solar:restart-bold" width={30} sx={{ color: '#fff' }} />
                        </IconButton>
                      )}
                    </Box>
                    
                    <ProjectContent>
                      <Typography 
                        variant="overline" 
                        sx={{ 
                          color: '#000',
                          fontWeight: 'bold',
                          letterSpacing: '1px',
                          display: 'block',
                          mb: 1,
                          fontSize: { xs: '0.7rem', md: '0.75rem' }
                        }}
                      >
                        {project.category}
                      </Typography>
                      
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          mb: 2,
                          fontWeight: 700,
                          color: 'text.primary',
                          fontSize: { xs: '1.25rem', md: '1.5rem' }
                        }}
                      >
                        {project.title}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          mb: 3,
                          color: 'text.secondary',
                          lineHeight: 1.6,
                          fontSize: { xs: '0.875rem', md: '1rem' }
                        }}
                      >
                        {project.description}
                      </Typography>

                      <Stack 
                        direction="row" 
                        spacing={1} 
                        flexWrap="wrap" 
                        gap={1}
                        sx={{ mb: 3 }}
                      >
                        {project.technologies.map((tech) => (
                          <TechChip 
                            key={tech} 
                            label={tech} 
                            size="small"
                            sx={{ 
                              fontSize: { xs: '0.75rem', md: '0.875rem' }
                            }} 
                          />
                        ))}
                      </Stack>

                      <Stack 
                        direction="row" 
                        spacing={3}
                        sx={{
                          pt: 2,
                          borderTop: '1px solid',
                          borderColor: 'divider'
                        }}
                      >
                        {project.demoLink && project.demoLink !== '#' && (
                          <ProjectLink 
                            href={project.demoLink}
                            target="_blank"
                            sx={{ 
                              color: '#000',
                              fontSize: { xs: '0.875rem', md: '1rem' }
                            }}
                          >
                            <Iconify icon="solar:eye-bold" className="icon" />
                            Live Demo
                          </ProjectLink>
                        )}
                        {project.githubLink && (
                          <ProjectLink 
                            href={project.githubLink}
                            target="_blank"
                            sx={{ 
                              color: 'text.primary',
                              fontSize: { xs: '0.875rem', md: '1rem' }
                            }}
                          >
                            <Iconify icon="socials:github" className="icon" />
                            Source Code
                          </ProjectLink>
                        )}
                      </Stack>
                    </ProjectContent>
                  </ProjectCard>
                </Box>
              ))}
            </Slider>

            <NavigationWrapper>
              <NavigationArrow
                onClick={handlePrevious}
                className={currentSlide === 0 ? 'disabled' : ''}
                sx={{
                  '&:hover': {
                    transform: 'scale(1.1) translateX(-4px)',
                  }
                }}
              >
                <Iconify icon="eva:arrow-ios-forward-fill" width={20} />
              </NavigationArrow>

              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: 'text.secondary',
                  minWidth: 60,
                  textAlign: 'center',
                }}
              >
                {currentSlide + 1} / {projects.length}
              </Typography>

              <NavigationArrow
                onClick={handleNext}
                className={currentSlide === projects.length - 1 ? 'disabled' : ''}
                sx={{
                  '&:hover': {
                    transform: 'scale(1.1) translateX(4px)',
                  }
                }}
              >
                <Iconify icon="eva:arrow-ios-forward-fill" width={20} />
              </NavigationArrow>
            </NavigationWrapper>
          </Box>
        </motion.div>
      </Container>

      <VideoDialog
        open={!!selectedVideo}
        onClose={handleCloseVideo}
        maxWidth={false}
        sx={{
          '& .MuiDialog-paper': {
            m: 2,
            borderRadius: 2,
            overflow: 'hidden',
          }
        }}
      >
        <DialogContent sx={{ p: 0, bgcolor: 'black' }}>
          <Box
            component="video"
            src={selectedVideo || ''}
            controls
            autoPlay
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '90vh',
              display: 'block',
            }}
          />
        </DialogContent>
      </VideoDialog>
    </ProjectWrapper>
  );
} 