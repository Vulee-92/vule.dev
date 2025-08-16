import React, { useRef, useState, useLayoutEffect } from "react";
import { Box, Chip, Stack } from "@mui/material";
import { motion } from "framer-motion";

const ConnectedChips = ({ technologies }: { technologies: string[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [connections, setConnections] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const positions = chipRefs.current.map(chip => {
      if (!chip) return null;
      const rect = chip.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top
      };
    }).filter(Boolean) as { x: number; y: number }[];

    // Chỉ nối liền kề cho đẹp và đơn giản
    const newConnections = positions.slice(0, -1).map((p, i) => ({
      x1: p.x,
      y1: p.y,
      x2: positions[i + 1].x,
      y2: positions[i + 1].y
    }));

    setConnections(newConnections);
  }, [technologies]);

  return (
    <Box position="relative" ref={containerRef}>
      {/* SVG connections */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0
        }}
      >
        {connections.map((conn, index) => (
          <motion.line
            key={index}
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          />
        ))}
      </svg>

      {/* Chips */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          flexWrap: "wrap",
          justifyContent: "center",
          position: "relative",
          zIndex: 1
        }}
      >
        {technologies.map((tech, index) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            ref={el => void (chipRefs.current[index] = el)}
          >
            <Chip
              label={tech}
              size="small"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.1)",
                color: "text.primary",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                px: 2,
                py: 1,
                borderRadius: "999px",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.2)"
                }
              }}
            />
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
};

export default ConnectedChips;
