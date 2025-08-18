'use client';

import { motion, useScroll, useTransform, useViewportScroll } from 'framer-motion';
import { useRef } from 'react';
import { Box, Container, Typography, styled, Button, alpha, Grid } from '@mui/material';
import ResponsiveWebsiteEmbed from 'src/components/mockup/ResponsiveWebsiteEmbed';

// --- Styled Components (Không thay đổi) ---

const HeroText = styled(motion.h1)(({ theme }) => ({
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

const ViewAllProjectsButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  color: '#111',
  fontWeight: 800,
  textTransform: 'uppercase',
  padding: theme.spacing(2, 4),
  borderRadius: '50px',
  fontSize: '1.25rem',
  letterSpacing: '0.1em',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  transition: 'background-color 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: '#fff',
  },
  '& span': {
    position: 'relative',
    zIndex: 2,
  }
}));

const ViewProjectButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  color: '#111',
  fontWeight: 800,
  textTransform: 'uppercase',
  padding: theme.spacing(2, 4),
  borderRadius: '50px',
  fontSize: '1.25rem',
  letterSpacing: '0.1em',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  transition: 'background-color 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: '#fff',
  },
  '& span': {
    position: 'relative',
    zIndex: 2,
  }
}));

const ProjectCard = styled(motion.section)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  overflow: 'hidden',
  color: '#fff',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 100%)',
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
    zIndex: 2,
  }
}));

const ProjectContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 3,
  color: '#fff',
  textAlign: 'left',
  '& h2': {
    fontSize: 'clamp(2rem, 5vw, 4.5rem)',
    fontWeight: 700,
    lineHeight: 1.1,
    marginBottom: theme.spacing(2),
    color: '#fff',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  '& .category': {
    fontSize: '1rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: theme.spacing(2),
    opacity: 0.8,
  },
  '& .description': {
    fontSize: '1.25rem',
    lineHeight: 1.6,
    marginBottom: theme.spacing(4),
    maxWidth: '600px',
    opacity: 0.9,
  }
}));

// Dữ liệu dự án
const projects = [
  {
    id: 1,
    title: 'Nền tảng thiết kế Thiệp cưới Trực tuyến',
    description: 'Phát triển một nền tảng web app đa năng, tự động hóa toàn bộ quy trình thiết kế và quản lý thiệp cưới. Hệ thống tối ưu hóa trải nghiệm của khách hàng từ khâu chọn mẫu, điền thông tin đến theo dõi tiến độ.',
    category: 'Full-stack Development',
    tags: ['React', 'Node.js', 'MongoDB', 'Telegram API'],
    year: '2025',
    image: '',
    url: 'https://mo-wedding.vercel.app/',
    slug: 'mo-wedding',
    bgColor: '#000000ff',
    device: ['mobile', 'desktop', 'tablet'] as const,
  },
  {
    id: 2,
    title: 'Hệ thống Điều phối Dịch vụ Vận tải',
    description: 'Phát triển hệ thống web app quản lý và điều phối xe dịch vụ, tối ưu hóa quy trình vận hành và nâng cao hiệu quả kinh doanh. Xây dựng hệ thống ba cấp người dùng: Admin, Điều phối viên, và Tài xế.',
    category: 'Full-stack Development',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Docker'],
    year: '2024',
    image: '/assets/images/portfolio/car-dispatch.jpg',
    url: '',
    slug: 'car-dispatch-system',
    bgColor: '#000000ff',
    device: ['desktop'] as const,

  },
  {
    id: 3,
    title: 'Hệ thống Quản lý Căn hộ và Dịch vụ Cho thuê Phòng',
    description: 'Xây dựng hệ thống quản lý căn hộ và dịch vụ cho thuê phòng, bao gồm quản lý hóa đơn, thông báo và yêu cầu hỗ trợ. Tối ưu hóa trải nghiệm người dùng và quản lý đơn hàng cho admin.',
    category: 'Full-stack Development',
    tags: ['ReactJs', 'NodeJs', 'MongoDB', 'ExpressJs', 'Material-UI', 'Framer Motion', 'Cloudinary API', 'Vercel'],
    year: '2025',
    image: 'https://res.cloudinary.com/difiyurn7/image/upload/v1754916493/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-08-08_lu%CC%81c_10.11.27_qbei1x.png',
    url: '',
    bgColor: '#000000ff',
    slug: 'apartment-management',
    device: ['desktop'] as const,
  },
];

const FullScreenProjects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const buttonText = "view all projects".split('');

  return (
    <Box>
      <Box ref={containerRef} sx={{ position: 'relative' }}>
        <Container
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'sticky',
            left: 0,
          }}
        >
          <motion.section
            style={{
              opacity: heroOpacity,
            }}
          >
            <HeroText>Projects</HeroText>
          </motion.section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <ViewAllProjectsButton
              variant="contained"
              href="/projects"
              sx={{ mt: 4 }}
            >
              {buttonText.map((char, index) => (
                <motion.span
                  key={index}
                  whileHover={{
                    y: [-5, 5, -5, 5, 0],
                    transition: {
                      y: {
                        repeat: Infinity,
                        repeatType: 'reverse',
                        duration: 0.8,
                        ease: 'linear',
                      }
                    }
                  }}
                  transition={{ delay: index * 0.05 }}
                  style={{ display: 'inline-block' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </ViewAllProjectsButton>
          </motion.div>
        </Container>
        <ResponsiveWebsiteEmbed
          url="https://pixel-duo.vercel.app/"
          initialDeviceView="desktop" // Mặc định hiển thị mobile
          visibleDevices={['mobile', 'desktop', 'tablet']}

          scales={{
            desktop: { xs: 0.2, lg: 0.5 }, // Ghi đè scale mặc định cho desktop
            mobile: { xs: .5, lg: .8 },  // Ghi đè scale mặc định cho mobile
            tablet: { xs: 0.2, lg: .5 }
          }}

        />
        <Box sx={{ height: `${(projects.length + 1)}vh`, position: 'relative' }} />

        <Box sx={{ position: 'relative' }}>
          {projects.map((project, index) => {
            const progress = useTransform(
              scrollYProgress,
              [(index + 1) / (projects.length + 1), (index + 2) / (projects.length + 1)],
              [0, 1]
            );

            const scale = useTransform(progress, [0, 1], [1, 0.95]);
            const y = useTransform(progress, [0, 1], [0, -30 * index]);

            return (
              <ProjectCard
                key={project.id}
                style={{
                  // scale,
                  y,
                  // SỬA ĐỔI LỚN NHẤT: Đảo ngược zIndex
                  zIndex: index + 1,
                  backgroundColor: project.bgColor || '#000',
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
              >
                <Box sx={{
                  position: 'relative',
                  zIndex: 3,
                  width: '100%',
                }}>
                  {/* SỬ DỤNG GRID CONTAINER CỦA MUI */}
                  <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center" justifyContent="center">
                    {/* Phần nội dung mô tả dự án */}
                    <Grid size={{ xs: 12, md: 6 }} >
                      <ProjectContent>
                        <motion.div
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2, duration: 0.8 }}
                        >
                          <Typography
                            className="category"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                              '&::before': {
                                content: '""',
                                width: '40px',
                                height: '2px',
                                background: 'currentColor',
                                display: 'inline-block'
                              }
                            }}
                          >
                            {project.category}
                          </Typography>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3, duration: 0.8 }}
                        >
                          <Typography variant="h2">
                            {project.title}
                          </Typography>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4, duration: 0.8 }}
                        >
                          <Typography
                            variant="h4"
                            sx={{
                              fontSize: { xs: '1.25rem', md: '1.5rem' },
                              fontWeight: 400,
                              opacity: 0.9,
                              mb: 4,
                              lineHeight: 1.5
                            }}
                          >
                            {project.description}
                          </Typography>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                        >
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                            {project.tags.map((tag) => (
                              <Box
                                key={tag}
                                sx={{
                                  px: 2,
                                  py: 0.5,
                                  border: '1px solid rgba(255,255,255,0.2)',
                                  borderRadius: '4px',
                                  fontSize: '0.875rem',
                                  color: 'rgba(255,255,255,0.8)',
                                  backdropFilter: 'blur(4px)',
                                  background: 'rgba(255,255,255,0.1)',
                                }}
                              >
                                {tag}
                              </Box>
                            ))}
                          </Box>
                          {project.url && (
                            <ViewProjectButton
                              variant="outlined"
                              href={project.slug ? `/project/${project.slug}` : project.url}
                              rel="noopener noreferrer"
                            >
                              View Project
                            </ViewProjectButton>
                          )}
                        </motion.div>
                      </ProjectContent>
                    </Grid>

                    {/* CONTAINER DÀNH RIÊNG CHO MOCKUP */}
                    <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <ResponsiveWebsiteEmbed
                          url={project.url || project.image}
                          initialDeviceView="mobile" // Mặc định hiển thị mobile
                          visibleDevices={project.device}

                          scales={{
                            desktop: { xs: 0.5, md: 0.5 }, // Ghi đè scale mặc định cho desktop
                            mobile: { xs: 0.5, md: 0.7 },  // Ghi đè scale mặc định cho mobile
                            tablet: { xs: 0.5, md: 0.5 }
                          }}

                        />

                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </ProjectCard>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default FullScreenProjects;