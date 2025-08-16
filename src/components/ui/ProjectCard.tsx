// components/ProjectCard.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@mui/material";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  featured?: boolean;
  tech?: string[];
  link?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  featured = false,
  tech = [],
  link = "#",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md shadow-md hover:shadow-xl transition-all duration-300"
    >
      {featured && (
        <Badge className="absolute top-4 right-4 bg-yellow-500 text-black">Featured</Badge>
      )}
      <a href={link} target="_blank" rel="noopener noreferrer">
        <div className="relative w-full h-52 overflow-hidden rounded-xl">
          <img
            src={image}
            alt={title}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-white group-hover:text-yellow-300 transition-all">
          {title}
        </h3>
        <p className="mt-2 text-sm text-white/70">{description}</p>
        {tech.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tech.map((item, index) => (
              <Badge
                key={index}
                className="bg-white/10 text-white/80 border border-white/10"
              >
                {item}
              </Badge>
            ))}
          </div>
        )}
      </a>
      <div className="absolute inset-0 pointer-events-none z-[-1]">
        <div className="absolute inset-0 animate-border-glow rounded-2xl border border-yellow-300 opacity-20 blur-lg" />
      </div>
    </motion.div>
  );
};

export default ProjectCard;
