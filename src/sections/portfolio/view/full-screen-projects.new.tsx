// 'use client';

// import { motion, useScroll, useTransform } from 'framer-motion';
// import { useRef } from 'react';
// import { Box, Container, Typography, styled, alpha } from '@mui/material';

// const HeroText = styled(motion.h1)(({ theme }) => ({
//   fontSize: 'clamp(8rem, 15vw, 20rem)',
//   fontWeight: 800,
//   lineHeight: 0.8,
//   letterSpacing: '-0.02em',
//   margin: 0,
//   color: theme.palette.mode === 'dark' ? '#fff' : '#111',
//   position: 'relative',
//   textTransform: 'uppercase',
//   zIndex: 3,
// }));

// const ProjectCard = styled(motion.section)(({ theme }) => ({
//   position: 'sticky',
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100vh',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-start',
//   padding: theme.spacing(8),
//   overflow: 'hidden',
//   '&::before': {
//     content: '""',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: 'linear-gradient(45deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)',
//     zIndex: 1,
//   },
// }));

// // [Các styled components khác giữ nguyên...]

// const FullScreenProjects = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const heroRef = useRef<HTMLDivElement>(null);
  
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ['start start', 'end end'],
//   });

//   const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.7]);
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
//   const heroY = useTransform(scrollYProgress, [0, 0.1], [0, 100]);

//   return (
//     <Box sx={{ position: 'relative' }}>
//       {/* Main Scroll Container */}
//       <Box 
//         ref={containerRef} 
//         sx={{ 
//           position: 'relative',
//           minHeight: `${(projects.length + 1) * 100}vh`,
//         }}
//       >
//         {/* Hero Container - Using position: sticky correctly */}
//         <Box
//           ref={heroRef}
//           sx={{
//             height: '100vh',
//             position: 'sticky',
//             top: 0,
//             width: '100%',
//             zIndex: 4,
//             bgcolor: 'background.default', // Prevent transparency issues
//           }}
//         >
//           <Container
//             maxWidth={false}
//             sx={{
//               height: '100%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//           >
//             <motion.section
//               style={{
//                 scale: heroScale,
//                 opacity: heroOpacity,
//                 y: heroY,
//               }}
//             >
//               <HeroText>Work</HeroText>
//             </motion.section>
//           </Container>
//         </Box>

//         {/* Projects Container - Offset to start under hero */}
//         <Box 
//           sx={{ 
//             position: 'relative',
//             marginTop: '-100vh', // Offset để bù trừ chiều cao của hero section
//           }}
//         >
//           {projects.map((project, index) => {
//             const progress = useTransform(
//               scrollYProgress,
//               [(index + 1) / (projects.length + 1), (index + 2) / (projects.length + 1)],
//               [0, 1]
//             );

//             const scale = useTransform(progress, [0, 1], [1, 0.85 + (index * 0.05)]);
//             const y = useTransform(progress, [0, 1], ['0%', `${(projects.length + index) * 5}%`]);

//             return (
//               <ProjectCard
//                 key={project.id}
//                 style={{
//                   scale,
//                   y: `${index * 5}%`,
//                   zIndex: projects.length - index,
//                   backgroundColor: project.color,
//                 }}
//               >
//                 <ProjectContent>
//                   {/* [Nội dung ProjectCard giữ nguyên...] */}
//                 </ProjectContent>
//               </ProjectCard>
//             );
//           })}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default FullScreenProjects;
