import React, { useRef } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { Icon } from '@iconify/react';

const TimelineItem = ({ item, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });

  // Biến thể cho hiệu ứng lượn sóng
  const itemVariants = {
    hidden: {
      x: index % 2 === 0 ? -100 : 100, // Thay đổi hướng xuất hiện dựa trên index
      y: 50,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: [50, -10, 20, 0], // Dịch chuyển dọc lượn sóng
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: [0.6, 0.05, -0.01, 0.9],
        y: {
          duration: 1.8, // Tăng thời gian chuyển động dọc
          ease: "easeInOut",
          repeat: 0,
          times: [0, 0.4, 0.7, 1],
        },
      },
    },
  };

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        mb: { xs: 8, md: 12 },
        pl: { xs: '48px', md: '80px' },
      }}
    >
      {/* Dot marker */}
      <Box
        sx={{
          position: 'absolute',
          left: { xs: '13px', md: '33px' }, // Di chuyển dot marker
          top: '8px',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          bgcolor: inView ? 'primary.main' : 'divider',
          transition: 'all 0.3s ease',
          zIndex: 1,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-4px',
            left: '-4px',
            right: '-4px',
            bottom: '-4px',
            borderRadius: '50%',
            border: '2px solid',
            borderColor: inView ? 'primary.main' : 'divider',
            opacity: 0.2,
            transition: 'all 0.3s ease',
          }
        }}
      />

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{
          marginLeft: index % 2 === 0 ? 0 : 'auto', // Đặt item xen kẽ
          maxWidth: '450px',
          textAlign: index % 2 === 0 ? 'left' : 'right',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.5rem', md: '1.75rem' },
            color: 'text.primary',
            mb: 1,
          }}
        >
          {item.position}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.1rem' },
            opacity: 0.8,
            mb: 2,
          }}
        >
          {item.title}
        </Typography>

        <Stack
          direction="row"
          spacing={3}
          sx={{
            color: 'text.secondary',
            opacity: 0.6,
            mb: 3,
            '& .info-item': {
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontSize: '0.9rem',
            },
          }}
        >
          <Box className="info-item">
            <Icon icon="mdi:clock-outline" width={18} />
            {item.duration}
          </Box>
          <Box className="info-item">
            <Icon icon="mdi:map-marker-outline" width={18} />
            {item.location}
          </Box>
        </Stack>

        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.8,
            color: 'text.secondary',
            fontSize: '1rem',
          }}
        >
          {item.description}
        </Typography>
      </motion.div>
    </Box>
  );
};

export default TimelineItem;