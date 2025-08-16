"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"

interface PathData {
  d: string
  strokeWidth: number
}
interface SvgData {
  paths: PathData[]
  viewBox: string
  width: number
  height: number
}
interface Props {
  files: string[]
}

function SvgScrollSection({
  svg,
  start,
  end,
  scrollYProgress,
}: {
  svg: SvgData
  start: number
  end: number
  scrollYProgress: any
}) {
  const progress = useTransform(scrollYProgress, [start, end], [0, 1])

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>

    <motion.svg
      width={svg.width}
      height={svg.height}
      viewBox={svg.viewBox}
      fill="none"
    >
      {svg.paths.map((p, i) => (
        <motion.path
          key={i}
          d={p.d}
          stroke="black"
          strokeWidth={p.strokeWidth}
          fill="none"
          style={{ pathLength: progress }}
        />
      ))}
    </motion.svg>
    </div>
  )
}

export default function HandwritingScroll({ files }: Props) {
  const [svgs, setSvgs] = useState<SvgData[]>([])
  const ref = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)

  // Luôn gọi useScroll (tránh thay đổi số hook giữa các render)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  })

  // Chỉ khi client mount xong mới bắt đầu animation
  useEffect(() => {
    setIsReady(true)
  }, [])

  // Load SVGs
  useEffect(() => {
    async function loadSvgs() {
      const loaded: SvgData[] = []
      for (const file of files) {
        const res = await fetch(file)
        const text = await res.text()
        const parser = new DOMParser()
        const doc = parser.parseFromString(text, "image/svg+xml")
        const svgEl = doc.querySelector("svg")
        const paths = Array.from(doc.querySelectorAll("path")).map((p) => ({
          d: p.getAttribute("d") || "",
          strokeWidth: parseInt(p.getAttribute("stroke-width") || "4"),
        }))
        if (svgEl) {
          loaded.push({
            paths,
            viewBox: svgEl.getAttribute("viewBox") || "0 0 300 100",
            width: parseInt(svgEl.getAttribute("width") || "300"),
            height: parseInt(svgEl.getAttribute("height") || "100"),
          })
        }
      }
      setSvgs(loaded)
    }
    loadSvgs()
  }, [files])

  const step = svgs.length > 0 ? 1 / svgs.length : 1

  return (
    <section ref={ref} style={{ height: `${svgs.length * 150}vh` }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          background: "#fff",
        }}
      >
        {isReady &&
          svgs.map((svg, index) => (
            <SvgScrollSection
              key={index}
              svg={svg}
              start={step * index}
              end={step * (index + 1)}
              scrollYProgress={scrollYProgress}
            />
          ))}
      </div>
    </section>
  )
}
