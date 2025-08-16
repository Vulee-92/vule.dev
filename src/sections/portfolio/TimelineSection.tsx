"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import React, { useEffect, useRef, useState } from "react"
import { Box, Container, styled, Typography } from "@mui/material"
import { timelineData } from "./timelineData"

// ... (các styled component và interface giữ nguyên)
interface TimelineEntry {
  year: string
  content: React.ReactNode
}
const HeroText = styled(motion.h1)(({ theme }) => ({
  fontSize: 'clamp(4rem, 5vw, 13rem)',
  fontWeight: 700,
  lineHeight: 1,
  letterSpacing: '-0.02em',
  margin: 0,
  color: '#111',
  position: 'relative',
  // textTransform: 'capitalize',
  zIndex: 3,
}));
const TimelineSection = ({ data = timelineData }: { data?: TimelineEntry[] }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [height, setHeight] = useState(0)
  const safeData = data || []
  const [activeYear, setActiveYear] = useState(safeData.length > 0 ? safeData[0].year : "")

  // ResizeObserver to calculate line height
  useEffect(() => {
    if (!lineRef.current) return

    const updateHeight = () => {
      if (lineRef.current) {
        const rect = lineRef.current.getBoundingClientRect()
        setHeight(rect.height)
      }
    }

    updateHeight()

    const resizeObserver = new ResizeObserver(updateHeight)
    resizeObserver.observe(lineRef.current)

    return () => {
      if (lineRef.current) resizeObserver.unobserve(lineRef.current)
    }
  }, [])

  // Scroll tracking for line animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 20%", "end 80%"],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const scale = useTransform(scrollYProgress, [300, 900], [0.6, 1]);
  // const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 500]);

  // IntersectionObserver to change active year when content is in the middle
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const options = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Use this to define the "middle" of the viewport
      threshold: 0,
    }

    itemRefs.current.forEach((el, index) => {
      if (!el) return
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveYear(data[index].year)
            }
          })
        },
        options
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [data])

  return (
    <Box ref={sectionRef} sx={{ minHeight: '100vh', width: '100%' }}>
      {/* Title */}
      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'sticky',
          left: 0,
        }}
      >
        <motion.section
          style={{
              scale,
            opacity: heroOpacity,
              // y: heroY,
          }}
        >
          <HeroText>Last 3 years of my professional journey
          </HeroText>
        </motion.section>
      </Container>

      {/* Timeline container */}
      <Container maxWidth="md" sx={{ position: "relative", pb: 10,  pl: 0 }} ref={lineRef}>
        {safeData.map((item, index) => (
          <Box
            key={index}
            ref={(el: HTMLDivElement | null) => {
              itemRefs.current[index] = el;
            }}
            sx={{
              display: "flex",
              pt: { xs: 4, md: 10 },
              gap: { xs: 0, md: 5 },
              alignItems: "flex-start",
            }}
          >
            {/* Left year (sticky) */}
            <Box
              sx={{
                position: "sticky",
                top: "50%", // Center the year vertically
                transform: "translateY(-50%)",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                minWidth: { xs: "50px", md: "200px" },
                pl: { xs: 0, md: 6 }
              }}
            >
              <Typography
                variant="h2" // Larger font size for the year
                sx={{
                  display: { xs: "none", md: "block" },
                  fontWeight: "bold",
                  pl: 6,
                  color: activeYear === item.year ? "text.primary" : "text.disabled",
                }}
              >
                {item.year}
              </Typography>
            </Box>

            {/* Right content */}
            <Box sx={{ flex: 1, pl: { xs: 5, md: 0 } }}>
              <Typography
                sx={{
                  display: { xs: "block", md: "none" },
                  fontWeight: "bold",
                  mb: 2,
                  color: "text.primary",
                }}
              >
                {item.year}
              </Typography>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                {/* Áp dụng font-size cho nội dung */}
                <Typography
                  sx={{
                    fontSize: { xs: "2em", md: "4em", lg: "5em" }, // Sử dụng rem cho kích thước font
                    lineHeight: "1.6", // Tăng chiều cao dòng để dễ đọc hơn
                  }}
                >
                  {item.content}
                </Typography>
              </motion.div>
            </Box>
          </Box>
        ))}

        {/* Timeline line */}
        <Box
          sx={{
            position: "absolute",
            left: { xs: 28, md: "auto" },
            top: 0,
            width: "2px",
            height: `${height}px`,
            overflow: "hidden",
            bgcolor: "divider",
            maskImage:
              "linear-gradient(to bottom,transparent 0%,black 10%,black 90%,transparent 100%)",
          }}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px]"
          >
            <Box
              sx={{
                width: "2px",
                height: "100%",
                background: "linear-gradient(to top, #a855f7, #3b82f6, transparent)",
                borderRadius: "999px",
              }}
            />
          </motion.div>
        </Box>
      </Container>
    </Box>
  )
}

export default TimelineSection