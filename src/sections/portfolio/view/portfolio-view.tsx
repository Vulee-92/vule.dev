'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimate, useTransform, useViewportScroll } from 'framer-motion';
import HeroSection from '../HeroSection';
import ProfileSection from '../ProfileSection';
import { QuoteSection } from '../quote-section';
import AnimatedQuoteSection from './AnimatedQuoteSection';
import ContactForm from '../Form';
import AnimatedTextSection from '../AnimatedTextSection';
import { Header } from '../header';
import Footer from '../Footer';
// import ProjectSections from './projectSection';
import TestProjectSection from './test-project-section';
import FullScreenProjects from './full-screen-projects';
import Intro from './intro';
import MusicSection from '../MusicSection';
import TimelineSection from '../TimelineSection';
import { Box, Chip, Stack, Typography } from '@mui/material';
import Handwriting from '../Handwriting';
import HandwritingScroll from '../HandwritingScroll';
import ResponsiveWebsiteEmbed from 'src/components/mockup/ResponsiveWebsiteEmbed';

const PortfolioView = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef(null);
  const endOfProfileRef = useRef(null);
  const [showIntro, setShowIntro] = useState(true);

  const isProfileInView = useInView(profileRef, {
    margin: '-20% 0px 0px 0px',
    once: false,
  });

  const isEndOfProfileInView = useInView(endOfProfileRef, {
    margin: '0px 0px -80% 0px',
    once: false,
  });

  const shouldAnimateHero = isProfileInView && !isEndOfProfileInView;

  const [scope, animate] = useAnimate();

  useEffect(() => {
    // Check if heroRef.current is not null before animating
    if (heroRef.current) {
      if (shouldAnimateHero) {
        // Khi bắt đầu cuộn vào ProfileSection
        animate(heroRef.current, { scale: 0.95, opacity: 0.6 }, { duration: 0.6, ease: 'easeInOut' });
      } else if (isEndOfProfileInView) {
        // Khi đã cuộn qua ProfileSection
        animate(heroRef.current, { opacity: 0, scale: 0.95 }, { duration: 0.3, ease: 'easeOut' });
      } else {
        // Khi ở trên HeroSection ban đầu
        animate(heroRef.current, { scale: 1, opacity: 1 }, { duration: 0.6, ease: 'easeInOut' });
      }
    }
  }, [shouldAnimateHero, isEndOfProfileInView, animate]);
  const { scrollY } = useViewportScroll();

  const scale = useTransform(scrollY, [10, 100], [0.6, 1]);


  const sampleTimelineData = [
    {
      year: "2024",
      content: (
        <Box>
          <Typography variant="h5" fontWeight="700">
            Freelancer – Các khách hàng khác nhau
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }} >
            09.2024 – Hiện tại
          </Typography>
          <Typography paragraph>
            Thiết kế và phát triển website cho khách hàng trong nhiều lĩnh vực khác nhau.
          </Typography>
          <Box component="ul" sx={{ pl: 3, mt: 1, mb: 2 }}>
            <Typography color="text.secondary" sx={{ fontSize: 13 }} >
              Tạo trang thương mại điện tử và blog
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: 13 }} >
              Số hóa dự án cho trung tâm & lớp nhạc
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            {["HTML", "CSS", "JavaScript", "React"].map((tech) => (
              <Chip key={tech} label={tech} size="small" />
            ))}
          </Stack>
        </Box>
      ),
    },
    {
      year: "2024",
      content: (
        <Box>
          <Typography variant="h5" fontWeight="700">
            Frontend Developer – THACO INDUSTRIES
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }} >
            03.2024 – 09.2024
          </Typography>
          <Typography paragraph>
            Tham gia phát triển giao diện và chức năng cho các dự án lớn.
          </Typography>
          <Box component="ul" sx={{ pl: 3, mt: 1, mb: 2 }}>
            <Typography color="text.secondary" sx={{ fontSize: 13 }} >
              Phần mềm quản lý kho
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: 13 }} >
              Chatbot Platform
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }} >
              Báo cáo tiền khả thi trạm sạc xe điện
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            {["React", "Redux", "Ant Design", "JavaScript"].map((tech) => (
              <Chip key={tech} label={tech} size="small" />
            ))}
          </Stack>
        </Box>
      ),
    },
    {
      year: "2024",
      content: (
        <Box>
          <Typography variant="h5" fontWeight="700">
            Mơ Wedding – Giải pháp thiệp cưới số hóa toàn diện cho cặp đôi hiện đại
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }} >
            07.2025 – Hiện tại
          </Typography>
          <Typography paragraph>
            Phát triển một nền tảng web app đa năng, tự động hóa toàn bộ quy trình thiết kế và quản lý thiệp cưới.
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {["React", "Node.js", "MongoDB", "Framer Motion"].map((tech) => (
              <Chip key={tech} label={tech} size="small" />
            ))}
          </Stack>
        </Box>
      ),
    },
    {
      year: "2024",
      content: (
        <Box>
          <Typography variant="h5" fontWeight="700">
            Hệ thống Điều phối Dịch vụ Vận tải
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }} >
            06.2024 – 08.2024
          </Typography>
          <Typography paragraph>
            Phát triển hệ thống web app quản lý và điều phối xe dịch vụ, tối ưu hóa quy trình vận hành.
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {["Next.js", "NestJS", "PostgreSQL", "Docker"].map((tech) => (
              <Chip key={tech} label={tech} size="small" />
            ))}
          </Stack>
        </Box>
      ),
    },
    {
      year: "2023",
      content: (
        <Box>
          <Typography variant="h5" fontWeight="700">
            Founder & Manager – Hymns Center
          </Typography>
          <Typography variant="h3" color="text.secondary" sx={{ fontSize: 13 }} >
            06.2023 – Hiện tại
          </Typography>
          <Typography paragraph>
            Quản lý toàn bộ hoạt động trung tâm, giảng dạy & phát triển chương trình học.
          </Typography>
          <Box component="ul" sx={{ pl: 3, mt: 1, mb: 2 }}>
            <Typography color="text.secondary" sx={{ fontSize: 13 }} >
              Tạo môi trường học tích cực, sáng tạo
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: 13 }} >
              Tổ chức sự kiện âm nhạc
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: 13 }} >
              Doanh thu 10 triệu/tháng ngay tháng đầu
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            {["Quản lý học tập", "Phần mềm âm nhạc"].map((tech) => (
              <Chip key={tech} label={tech} size="small" />
            ))}
          </Stack>
        </Box>
      ),
    },
    {
      year: "2023",
      content: (
        <Box>
          <Typography variant="h5" fontWeight="700">
            Phần mềm quản lý căn hộ
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }} >
            02.2023 – 05.2023
          </Typography>
          <Typography paragraph>
            Xây dựng hệ thống quản lý cư dân và dịch vụ căn hộ, bao gồm quản lý hóa đơn, thông báo và yêu cầu hỗ trợ.
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {["React", "Firebase", "MUI", "TypeScript"].map((tech) => (
              <Chip key={tech} label={tech} size="small" />
            ))}
          </Stack>
        </Box>
      ),
    },
    {
      year: "2022",
      content: (
        <Box>
          <Typography variant="h5" fontWeight="700">
            Store Manager – Hồng Trị Mart
          </Typography>
          <Typography variant="h3" color="text.secondary" sx={{ fontSize: 13 }} >
            11.2022 – 07.2023
          </Typography>
          <Typography paragraph>
            Quản lý cửa hàng và tối ưu trải nghiệm mua sắm.
          </Typography>
          <Box component="ul" sx={{ pl: 3, mt: 1, mb: 2 }}>
            <Typography color="text.secondary" sx={{ fontSize: 13 }} >
              Quản lý kho & hàng hóa
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: 13 }} >
              Định hình dịch vụ phù hợp nhu cầu
            </Typography>
          </Box>
          <Chip label="Phần mềm quản lý bán hàng" size="small" />
        </Box>
      ),
    },
    {
      year: "2022",
      content: (
        <Box>
          <Typography variant="h3" fontWeight="700">
            Fresher Front-end Developer – SENTECHS
          </Typography>
          <Typography variant="h3" sx={{ fontSize: 13 }} color="text.secondary" >
            04.2022 – 09.2022
          </Typography>
          <Typography paragraph>
            Thực hiện dự án thực tế với Apollo English.
          </Typography>
          <Box component="ul" sx={{ pl: 3, mt: 1, mb: 2 }}>
            <Typography color="text.secondary" sx={{ fontSize: 13 }} >
              Phát triển giao diện web
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: 13 }} >
              Fix bug & tối ưu responsive
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            {["HTML", "CSS", "JavaScript", "React", "Material-UI"].map((tech) => (
              <Chip key={tech} label={tech} size="small" />
            ))}
          </Stack>
        </Box>
      ),
    },
  ];


  return (
    <Box sx={{
      width: '100vw',        // bằng 100% viewport width
      overflowX: 'hidden',   // ẩn scroll ngang
    }}>
      {/* Intro Animation */}
      {showIntro && <Intro onComplete={() => setShowIntro(false)} />}
      <Header />

      {/* Main Content */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection heroScale={2} />
      </motion.section>
      <Handwriting />
      <motion.section
        style={{
          scale
        }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
      >
        <ProfileSection />

      </motion.section>

      {/* Music Section */}
      {/* <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <TimelineSection />
      </motion.section> */}

      <FullScreenProjects />     {/* End of Profile Marker */}
      <ContactForm />
      <AnimatedTextSection />
      <Footer />
    </Box>
  );
};

export default PortfolioView;