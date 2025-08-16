'use client';
import React, { useRef } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { Icon } from '@iconify/react';

const timelineData = [
  {
    key: '2016',
    title: 'Freelance',
    position: 'Web Designer',
    duration: '3.5 years',
    location: 'Bangalore, India',
    description:
      'I started my career as a freelancer, designing websites, mobile apps, and dashboards for startups and small businesses...',
    icon: 'mdi:palette',
  },
  {
    key: '2018',
    title: 'PiSquare.io',
    position: 'UX Designer',
    duration: '2 years',
    location: 'Remote',
    description:
      'Worked with clients like Siemens, Dell, ICICI, etc. to design analytical dashboards for enterprise use.',
    icon: 'mdi:chart-box-outline',
  },
];

export default function TimelineSection() {
  return (
    <>
      {timelineData.map((item, index) => (
        <TimelineItem key={index} item={item} isLast={index === timelineData.length - 1} />
      ))}
    </>
  );
}

function TimelineItem({ item, isLast }: { item: any; isLast: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div className="section" style={{ position: 'relative' }}>
      <Box
        ref={ref}
        sx={{
          position: 'relative',
          width: '100%',
          px: { xs: 2, md: 8 },
          py: 10,
          bgcolor: 'black',
          color: 'white',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Vertical line with animation */}
        <Box
          component={motion.div}
          initial={{ height: 0 }}
          animate={{ height: inView ? '100%' : 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          sx={{
            position: 'absolute',
            top: 0,
            left: { xs: '30px', md: '120px' },
            width: '2px',
            bgcolor: '#888',
            background: 'linear-gradient(to bottom, #00FFAA, #0077FF)',
            zIndex: 0,
          }}
        />

        {/* Timeline content */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            position: 'relative',
          }}
        >
          {/* Year */}
          <Box
            sx={{
              minWidth: '100px',
              textAlign: 'right',
              pr: 4,
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 600,
            }}
          >
            {item.key}
          </Box>

          {/* Dot with glowing effect */}
          <Box
            component={motion.div}
            initial={{ scale: 0.6, opacity: 0.3 }}
            animate={inView ? { scale: 1.2, opacity: 1 } : {}}
            transition={{ duration: 0.6, type: 'spring' }}
            sx={{
              position: 'absolute',
              top: '12px',
              left: { xs: '30px', md: '120px' },
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00ffcc, #3366ff)',
              boxShadow: '0 0 10px #00ffcc',
              border: '2px solid white',
              zIndex: 2,
            }}
          />

          {/* Animated Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box sx={{ pl: 6, maxWidth: '600px' }}>
              <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                <Box
                  sx={{
                    bgcolor: '#111',
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 10px #00ffcc',
                  }}
                >
                  <Icon icon="mdi:chart-box-outline" color="#00ffcc" width="24" height="24" />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    {item.position}
                  </Typography>
                </Box>
              </Stack>

              <Typography variant="body2" mb={1} color="gray">
                {item.duration} &nbsp; ✦ &nbsp; {item.location}
              </Typography>

              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                {item.description}
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </div>
  );
}
