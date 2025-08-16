"use client";
import { useState } from "react";
import { Box, Popover, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";

type Skill = {
  name: string;
  icon: string;
};

type SkillGroup = {
  group: string;
  icon: string;
  skills: Skill[];
};

const skillGroups: SkillGroup[] = [
  {
    group: "Languages",
    icon: "/icons/lang.svg", // icon code, ví dụ icon code.svg
    skills: [
      { name: "JavaScript", icon: "/icons/js.svg" },
      { name: "TypeScript", icon: "/icons/ts.svg" },
      { name: "Python", icon: "/icons/python.svg" },
    ],
  },
  {
    group: "Frameworks",
    icon: "/icons/framework.svg",
    skills: [
      { name: "React", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      { name: "Express", icon: "/icons/express.svg" },
    ],
  },
  {
    group: "APIs",
    icon: "/icons/api.svg",
    skills: [
      { name: "Stripe", icon: "/icons/stripe.svg" },
      { name: "Firebase", icon: "/icons/firebase.svg" },
      { name: "OpenAI", icon: "/icons/openai.svg" },
    ],
  },
  {
    group: "VPS",
    icon: "/icons/vps.svg",
    skills: [
      { name: "AWS", icon: "/icons/aws.svg" },
      { name: "Vercel", icon: "/icons/vercel.svg" },
      { name: "DigitalOcean", icon: "/icons/digitalocean.svg" },
    ],
  },
];

export default function SkillsDock() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activeGroup, setActiveGroup] = useState<SkillGroup | null>(null);

  const handleOpen = (
    event: React.MouseEvent<HTMLElement>,
    group: SkillGroup
  ) => {
    setAnchorEl(event.currentTarget);
    setActiveGroup(group);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveGroup(null);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        bgcolor: "rgba(255,255,255,0.2)",
        backdropFilter: "blur(15px)",
        px: 3,
        py: 1.5,
        borderRadius: "40px",
        display: "flex",
        gap: 3,
        zIndex: 1000,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      {skillGroups.map((group) => (
        <Stack key={group.group} spacing={0.5} alignItems="center">
          <motion.img
            src={group.icon}
            alt={group.group}
            style={{
              width: 50,
              height: 50,
              cursor: "pointer",
              WebkitBoxReflect:
                "below 5px linear-gradient(transparent, rgba(0,0,0,0.25))",
            }}
            whileHover={{ scale: 1.3 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={(e) => handleOpen(e, group)}
          />
          <Typography
            variant="caption"
            sx={{ color: "#fff", fontWeight: 500, userSelect: "none" }}
          >
            {group.group}
          </Typography>
        </Stack>
      ))}

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        disableRestoreFocus
        sx={{
          ".MuiPaper-root": {
            bgcolor: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(20px)",
            borderRadius: "20px",
            padding: "12px 20px",
          },
        }}
      >
        <Stack direction="row" spacing={2}>
          {activeGroup?.skills.map((skill) => (
            <Stack key={skill.name} alignItems="center" spacing={0.5}>
              <motion.img
                src={skill.icon}
                alt={skill.name}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  cursor: "default",
                  WebkitBoxReflect:
                    "below 4px linear-gradient(transparent, rgba(0,0,0,0.3))",
                }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <Typography variant="caption" sx={{ color: "#fff" }}>
                {skill.name}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Popover>
    </Box>
  );
}
