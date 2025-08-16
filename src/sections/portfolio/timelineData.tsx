import React from 'react';
import { Box, Typography, Stack, Chip } from '@mui/material';

// Cấu trúc dữ liệu cho mỗi mục kinh nghiệm
export interface ExperienceItem {
  title: string;
  duration: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

// Component con để render nội dung kinh nghiệm
export const TimelineContent = ({ item }: { item: ExperienceItem }) => (
  <Box>
    <Typography variant="h5" fontWeight="700">
      {item.title}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }} >
      {item.duration}
    </Typography>

    <Typography paragraph mt={2}>
      {item.description}
    </Typography>

    <Box component="ul" sx={{ pl: 3, mt: 1, mb: 2 }}>
      {item.highlights.map((highlight, index) => (
        <Typography key={index} component="li" color="text.secondary" sx={{ fontSize: 13 }}>
          {highlight}
        </Typography>
      ))}
    </Box>

    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
      {item.technologies.map((tech) => (
        <Chip key={tech} label={tech} size="small" />
      ))}
    </Stack>
  </Box>
);

// Dữ liệu timeline đã được cấu trúc lại
export const timelineData = [
   {
    year: "2025",
    content: (
      <TimelineContent
        item={{
          title: "Hệ thống quản lý căn hộ",
          duration: "07.2023 – hiện nay",
          description: "Xây dựng hệ thống quản lý căn hộ và dịch vụ cho thuê phòng, bao gồm quản lý hóa đơn, thông báo và yêu cầu hỗ trợ.",
          highlights: [],
          technologies: ["React", "Firebase", "MUI", "TypeScript"]
        }}
      />
    ),
  },{
    year: "2025",
    content: (
      <TimelineContent
        item={{
          title: "Hệ thống Điều phối Dịch vụ Vận tải",
          duration: "06.2024 – 08.2024",
          description: "Phát triển hệ thống web app quản lý và điều phối xe dịch vụ, tối ưu hóa quy trình vận hành.",
          highlights: [],
          technologies: ["Next.js", "NestJS", "PostgreSQL", "Docker"]
        }}
      />
    ),
  },{
    year: "2025",
    content: (
      <TimelineContent
        item={{
          title: "Mơ Wedding – Giải pháp thiệp cưới số hóa toàn diện cho cặp đôi hiện đại",
          duration: "07.2025 – Hiện tại",
          description: "Phát triển một nền tảng web app đa năng, tự động hóa toàn bộ quy trình thiết kế và quản lý thiệp cưới.",
          highlights: [],
          technologies: ["React", "Node.js", "MongoDB", "Framer Motion"]
        }}
      />
    ),
  },
  
    {
    year: "2024",
    content: (
      <TimelineContent
        item={{
          title: "Freelancer – Các khách hàng khác nhau",
          duration: "09.2024 – Hiện tại",
          description: "Thiết kế và phát triển website cho khách hàng trong nhiều lĩnh vực khác nhau.",
          highlights: [
            "Tạo trang thương mại điện tử và blog",
            "Số hóa dự án cho trung tâm & lớp nhạc"
          ],
          technologies: ["HTML", "CSS", "JavaScript", "React"]
        }}
      />
    ),
  },
  {
    year: "2024",
    content: (
      <TimelineContent
        item={{
          title: "Frontend Developer – THACO INDUSTRIES",
          duration: "03.2024 – 09.2024",
          description: "Tham gia phát triển giao diện và chức năng cho các dự án lớn.",
          highlights: [
            "Phần mềm quản lý kho",
            "Chatbot Platform",
            "Báo cáo tiền khả thi trạm sạc xe điện"
          ],
          technologies: ["React", "Redux", "Ant Design", "JavaScript"]
        }}
      />
    ),
  },
   
  {
    year: "2023",
    content: (
      <TimelineContent
        item={{
          title: "Founder & Manager – Hymns Center",
          duration: "06.2023 – Hiện tại",
          description: "Quản lý toàn bộ hoạt động trung tâm, giảng dạy & phát triển chương trình học.",
          highlights: [
            "Tạo môi trường học tích cực, sáng tạo",
            "Tổ chức sự kiện âm nhạc",
            "Doanh thu 10 triệu/tháng ngay tháng đầu"
          ],
          technologies: ["Quản lý học tập", "Phần mềm âm nhạc"]
        }}
      />
    ),
  },
  
  {
    year: "2022",
    content: (
      <TimelineContent
        item={{
          title: "Store Manager – Hồng Trị Mart",
          duration: "11.2022 – 07.2023",
          description: "Quản lý cửa hàng và tối ưu trải nghiệm mua sắm.",
          highlights: [
            "Quản lý kho & hàng hóa",
            "Định hình dịch vụ phù hợp nhu cầu"
          ],
          technologies: ["Phần mềm quản lý bán hàng"]
        }}
      />
    ),
  },
  {
    year: "2022",
    content: (
      <TimelineContent
        item={{
          title: "Fresher Front-end Developer – SENTECHS",
          duration: "04.2022 – 09.2022",
          description: "Thực hiện dự án thực tế với Apollo English.",
          highlights: [
            "Phát triển giao diện web",
            "Fix bug & tối ưu responsive"
          ],
          technologies: ["HTML", "CSS", "JavaScript", "React", "Material-UI"]
        }}
      />
    ),
  },
];