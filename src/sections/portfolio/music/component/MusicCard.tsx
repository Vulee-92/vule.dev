"use client";

import { motion } from "framer-motion";
import { Box, Card, Typography, Chip, Stack } from "@mui/material";

interface ProjectCardProps {
  project: {
    title: string;
    image: string; // Thêm trường image để hiển thị
    // ... các thuộc tính khác như mô tả, công nghệ
  };
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const MusicCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      // Áp dụng style cho toàn bộ thẻ
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Card
        sx={{
          // Loại bỏ shadow, dùng màu nền để phân biệt
          boxShadow: 'none',
          borderRadius: '12px',
          backgroundColor: 'transparent',
          height: '100%',
        }}
      >
        <Box
          sx={{
            height: 800, // Chiều cao cố định cho hình ảnh
            borderRadius: '8px',
            overflow: 'hidden',
            // Tạo hiệu ứng zoom-in nhẹ khi hover
            "&:hover img": {
              transform: 'scale(1.05)',
            },
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease-in-out',
            }}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h3" component="div" fontWeight="bold" sx={{color: '#fff'}}>
            {project.title}
          </Typography>
          {/* Thêm các chi tiết khác nếu cần */}
        </Box>
      </Card>
    </motion.div>
  );
};