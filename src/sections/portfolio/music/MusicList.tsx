"use client";

import { Box, Container, Typography, Grid, styled } from "@mui/material";
import { motion } from "framer-motion";
import { MusicCard } from "./component/MusicCard";

// Dữ liệu dự án mẫu
const projectsData = [
  {
    title: "Nền tảng thiết kế Thiệp cưới Trực tuyến",
    image: "https://res.cloudinary.com/dkwyql8zi/image/upload/v1754892736/sanpham/gjomf0o7grcpfgmeaxm2.png",
    description: "Phát triển một nền tảng web app đa năng, tự động hóa toàn bộ quy trình thiết kế và quản lý thiệp cưới, tối ưu hóa trải nghiệm khách hàng và quản lý đơn hàng cho admin.",
    technologies: ["React", "Redux"],
  },
  {
    title: "Hệ thống Điều phối Dịch vụ Vận tải",
    image: "https://res.cloudinary.com/dkwyql8zi/image/upload/v1754892736/sanpham/gjomf0o7grcpfgmeaxm2.png",
    description: "Dự án Murror là một ứng dụng...",
    technologies: ["Next.js", "TypeScript"],
  },
  {
    title: "Google Playstore App",
    image: "https://res.cloudinary.com/dkwyql8zi/image/upload/v1754892736/sanpham/gjomf0o7grcpfgmeaxm2.png",
    description: "Ứng dụng cho Google Playstore...",
    technologies: ["React Native"],
  },
  {
    title: "Google Playstore Appư",
    image: "https://res.cloudinary.com/dkwyql8zi/image/upload/v1754892736/sanpham/gjomf0o7grcpfgmeaxm2.png",
    description: "Ứng dụng cho Google Playstore...",
    technologies: ["React Native"],
  },
  // ... thêm các dự án khác
];

const containerVariants = {
  visible: {
    transition: { staggerChildren: 0.2 }
  },
};

const HeroText = styled(motion.h1)(({ theme }) => ({
   fontSize: 'clamp(8rem, 5vw, 18rem)',
  fontWeight: 800,
  lineHeight: 0.8,
  letterSpacing: '-0.02em',
  margin: 0,
  textAlign: 'center',
  color: '#fff',
  position: 'relative',
  textTransform: 'uppercase',
  zIndex: 3,
}));

export default function MusicList() {
  return (
    <Box sx={{ bgcolor: "#000" }}>
     <div className="section" >
               <Box
                 sx={{
                   height: '100vh',
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
                   style={{
                     width: '100%',
                   }}
                 >
                   <HeroText
                   >
                     PROJECTS
                   </HeroText>
                 </motion.div>
               </Box>
             </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Grid container spacing={7} sx={{ m: 7 }}>
          {projectsData.map((project, index) => (
            <Grid size={{ xs:12, sm:6, md:6}} key={index}>
              <MusicCard project={project} />
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
}