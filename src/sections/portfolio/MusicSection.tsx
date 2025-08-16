"use client";
import React, { useRef } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
}

const YOUTUBE_VIDEOS: VideoItem[] = [
  {
    id: "a9UkboylqhY",
    title: "Thánh Ca 704 - NGÀI LÀ TẤT CẢ CHO TÔI | Hymns",
    thumbnail: "https://i.ytimg.com/vi/a9UkboylqhY/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC8vRyB02rZjt4w3lo4N9b4lz-M9Q",
  },
  {
    id: "sx1iJtBgumw",
    title: "Thánh ca 28 - PHƯỚC NGUYÊN TỪ TRỜI XIN CHẢY VÀO LÒNG | Hymns",
    thumbnail: "https://i.ytimg.com/an_webp/sx1iJtBgumw/mqdefault_6s.webp?du=3000&sqp=CIyy28QG&rs=AOn4CLAKC3PHinOUTlT-RBpyTzkY6C1Oow",
  },
  {
    id: "xG16JnqE6Oc",
    title: "Thánh ca 366 - JÊSUS NHƯ NGƯỜI CHĂN CHIÊN DẮT TÔI | Hymns",
    thumbnail: "https://i.ytimg.com/an_webp/xG16JnqE6Oc/mqdefault_6s.webp?du=3000&sqp=CNax28QG&rs=AOn4CLBZIbnNuYfkUPDJM6oYiqr9LYIDrQ",
  },
  // ...
];

export default function MusicScrollShowcase() {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {YOUTUBE_VIDEOS.map((video, index) => (
        <VideoSection
          key={video.id}
          video={video}
          index={index}
          total={YOUTUBE_VIDEOS.length}
        />
      ))}
    </Box>
  );
}

function VideoSection({
  video,
  index,
  total,
}: {
  video: VideoItem;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // khi bắt đầu vào viewport và khi ra khỏi
  });

  // Zoom effect
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.9]);
  // Opacity focus
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  // Blur
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], ["blur(8px)", "blur(0px)", "blur(8px)"]);

  return (
    <motion.div
      ref={ref}
      style={{
        height: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        scale,
        opacity,
        filter: blur,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "80%",
          height: "80%",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          cursor: "pointer",
        }}
        onClick={() =>
          window.open(`https://www.youtube.com/watch?v=${video.id}`, "_blank")
        }
      >
        <motion.img
          src={video.thumbnail}
          alt={video.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            p: 3,
            background:
              "linear-gradient(transparent, rgba(0,0,0,0.8))",
          }}
        >
          <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
            {video.title}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}
