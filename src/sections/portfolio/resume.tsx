"use client";
import { useState, useEffect } from "react";
import { Box, Container, Divider, Grid, Typography, Link, Button, styled } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import { Header } from "./header";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeInOut" } }
} as const;

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeInOut" } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2, ease: "easeInOut" } }
} as const;

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);

const formatText = (text: any) => {
  if (!text) return "";
  return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
};

export default function LeBuiThanhVuResume() {
  const [lang, setLang] = useState("vi");
    const navigate = useNavigate();
  useEffect(() => {
    const savedLang = localStorage.getItem("resumeLang");
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const t = (vi: any, en: any) => (lang === "vi" ? vi : en);

  const handleLangChange = () => {
    const newLang = lang === "vi" ? "en" : "vi";
    setLang(newLang);
    localStorage.setItem("resumeLang", newLang);
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("resume-content");
    if (input) {
      const originalButtons = input.querySelectorAll('button');
      originalButtons.forEach(btn => btn.style.display = 'none');

      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("LeBuiThanhVu_Resume.pdf");

        setTimeout(() => {
          originalButtons.forEach(btn => btn.style.display = '');
        }, 100);
      });
    }
  };

  const education = [
    {
      school: t("Trường đại học Công nghệ TP.HCM (HUTECH)", "Ho Chi Minh City University of Technology (HUTECH)"),
      degree: t("Ngành: Công nghệ thông tin", "Major: Information Technology"),
      location: t("TP.HCM, Việt Nam", "Ho Chi Minh City, Vietnam"),
      period: "2018 – 2022",
      gpa: "GPA: 3.08 / 4.0",
      notes: t("Chuyên ngành: Công nghệ phần mềm", "Specialization: Software Technology"),
    },
  ];

  const experience = [
    {
      company: "THACO INDUSTRIES",
      role: "Frontend Developer",
      location: "Quảng Nam, Việt Nam",
      period: "03/2024 – 09/2024",
      bullets: [
        {
          desc: t(
            `Đóng góp vào quá trình phát triển giao diện người dùng cho các dự án công nghiệp quy mô lớn, **thường kết hợp với công nghệ IoT**.`,
            `Contributed to the development of user interfaces for large-scale industrial projects, **often integrating with IoT technology.**`
          ),
        },
        {
          desc: t(
            `**Các dự án đã tham gia:** Phần mềm quản lý kho, nền tảng chatbot và dự án quản lý tác vụ sử dụng **WebSockets** để đảm bảo cập nhật dữ liệu theo thời gian thực.`,
            `**Projects:** Warehouse management software, a chatbot platform, and a task management project using **WebSockets** for real-time data updates.`
          ),
        },
        {
          desc: t(
            `**Công nghệ sử dụng:** React, Redux, Ant Design, JavaScript.`,
            `**Technologies:** React, Redux, Ant Design, JavaScript.`
          ),
        },
      ],
    },
    {
      company: "Hymns Center",
      role: t("Người sáng lập và Quản lý", "Founder & Manager"),
      location: t("TP. Tam Kỳ, Quảng Nam", "Tam Ky City, Quang Nam"),
      period: t("06/2023 – Hiện tại", "06/2023 – Present"),
      bullets: [
        {
          desc: t(
            `Quản lý và vận hành trung tâm âm nhạc, đồng thời xây dựng website thương mại điện tử. **Đạt doanh thu 10 triệu đồng/tháng** ngay từ tháng đầu tiên.`,
            `Managed and operated a music center while also building an e-commerce website. **Achieved a monthly revenue of 10 million VND** from the first month.`
          ),
        },
      ],
    },
    {
      company: "Hồng Trị Mart",
      role: t("Quản lý cửa hàng", "Store Manager"),
      location: t("TP. Tam Kỳ, Quảng Nam", "Tam Ky City, Quảng Nam"),
      period: "11/2022 – 07/2023",
      bullets: [
        {
          desc: t(
            `Quản lý toàn bộ hoạt động, tối ưu hóa quy trình bán hàng và kho bằng **phần mềm SAPO**, góp phần đạt doanh thu hàng tháng từ **800 triệu đến 1.2 tỷ VND**.`,
            `Managed all store operations, optimizing sales and inventory processes using **SAPO software**, contributing to monthly revenues of **800 million to 1.2 billion VND.**`
          ),
        },
      ],
    },
    {
      company: "SENTECHS",
      role: "Fresher Front-end Developer",
      location: t("TP.HCM, Việt Nam", "Ho Chi Minh City, Vietnam"),
      period: "04/2022 – 09/2022",
      bullets: [
        {
          desc: t(
            `Tham gia phát triển giao diện người dùng cho các dự án với Apollo English, tập trung vào tối ưu hóa giao diện và cải thiện **khả năng tương thích trên các thiết bị (responsive)**.`,
            `Participated in developing user interfaces for projects with Apollo English, focusing on UI optimization and improving **responsiveness across devices**.`
          ),
        },
        {
          desc: t(
            `**Công nghệ sử dụng:** HTML, CSS, JavaScript, React, Material-UI.`,
            `**Technologies:** HTML, CSS, JavaScript, React, Material-UI.`
          ),
        },
      ],
    },
  ];

  const projects = [
    {
  title: t("Nền tảng Thiệp Cưới Online & Quản lý Tiệc Cưới", "Online Wedding Invitation & Event Management Platform"),
  role: "Full-stack Developer",
  period: t("08/2025 – Hiện tại", "08/2025 – Present"),
  bullets: [
    {
      desc: t(
        `Thiết kế và phát triển một nền tảng web app toàn diện, giúp các cặp đôi dễ dàng tạo thiệp cưới cá nhân hóa, gửi thiệp trực tuyến và quản lý khách mời chỉ trong một hệ thống duy nhất.`,
        `Designed and developed a comprehensive web application platform enabling couples to easily create personalized wedding invitations, send them online, and manage guests within a single system.`
      ),
    },
    {
      desc: t(
        `**Phía khách mời:** Cung cấp giao diện hiện đại, hỗ trợ tùy chỉnh thiệp trực quan, phản hồi tham dự (RSVP) trực tuyến, và viết lời chúc. Tối ưu hiển thị trên **mobile, tablet và desktop**.`,
        `**For Guests:** Delivered a modern interface with intuitive invitation customization, online RSVP, and guest message board. Optimized for **mobile, tablet, and desktop**.`
      ),
    },
    {
      desc: t(
        `**Phía Admin:** Xây dựng Dashboard quản trị thông minh cho phép theo dõi danh sách khách mời, tiến độ sự kiện, lịch sử đặt thiệp và mã khuyến mãi. Tích hợp hệ thống thông báo real-time qua **Telegram Bot** để cập nhật nhanh chóng.`,
        `**For Admins:** Built a smart admin dashboard to manage guest lists, track event progress, invitation orders, and promo codes. Integrated **real-time notifications** via Telegram Bot for instant updates.`
      ),
    },
    {
      desc: t(
        `**Trạng thái hiện tại:** Khi có đơn hàng, tiến hành thay data và deploy theo thông tin của khách. **Định hướng tương lai:** phát triển module **Template Builder** cho phép khách tự chọn mẫu, chỉnh sửa, thanh toán và triển khai thiệp trực tiếp mà không cần can thiệp từ admin.`,
        `**Current State:** Orders are currently fulfilled by updating client data and redeploying the app. **Future Plan:** Develop a **Template Builder** module that allows clients to select templates, customize, make payments, and self-deploy invitations without admin intervention.`
      ),
    },
    {
      desc: t(
        `**Kết quả:** Ra mắt sản phẩm đã ghi nhận **4 đơn đặt hàng ngay trong tháng đầu tiên**, chứng minh tính khả thi và nhu cầu thực tế từ thị trường.`,
        `**Results:** Achieved **4 paid orders in the first launch month**, demonstrating strong feasibility and real market demand.`
      ),
    },
    {
      desc: t(
        `**Công nghệ:** ReactJS, Node.js, Express.js, MongoDB, TypeScript, Material-UI, Framer Motion, Redux Toolkit, Redux Saga, Cloudinary API, Google Sheets API, Telegram Bot API, JWT, Docker, Vercel, Render.`,
        `**Technologies:** ReactJS, Node.js, Express.js, MongoDB, TypeScript, Material-UI, Framer Motion, Redux Toolkit, Redux Saga, Cloudinary API, Google Sheets API, Telegram Bot API, JWT, Docker, Vercel, Render.`
      ),
    },
  ],
  link: {
    live: "https://mo-wedding.vercel.app/",
    github: "https://github.com/vulee-92/wedding-app",
  }
},

    {
      title: t("Hệ thống Điều phối Dịch vụ Vận tải", "Car Service Dispatch System"),
      role: "Full-stack Developer",
      period: "06/2024 – 08/2024",
      bullets: [
        {
          desc: t(
            `Phát triển hệ thống web app quản lý và điều phối xe dịch vụ, **tối ưu hóa quy trình vận hành** và nâng cao hiệu quả kinh doanh.`,
            `Developed a web application for car service dispatch management, **optimizing operational processes** and enhancing business efficiency.`
          ),
        },
        {
          desc: t(
            `Xây dựng hệ thống ba cấp người dùng: **Admin**, **Điều phối viên**, và **Tài xế**.`,
            `Built a three-tiered user system: **Admin**, **Dispatcher**, and **Driver**.`
          ),
        },
        {
          desc: t(
            `**Công nghệ sử dụng:** Docker, PostgreSQL, Next.js, NestJS, VPS server.`,
            `**Technologies:** Docker, PostgreSQL, Next.js, NestJS, VPS server.`
          ),
        },
      ],
      link: {
        live: null, // Thêm link sản phẩm nếu có
        github: null, // Thêm link Github nếu có
      }
    },
    {
      title: t("Website bán nhạc cụ", "Music Store Website"),
      role: "Full-stack Developer",
      period: null, // Bổ sung thời gian
      bullets: [
        {
          desc: t(
            `Xây dựng trang web thương mại điện tử hoàn chỉnh, hỗ trợ quản lý sản phẩm, đơn hàng và tích hợp thanh toán trực tuyến.`,
            `Developed a full-featured e-commerce website with product management, order processing, and online payment integration.`
          ),
        },
        {
          desc: t(
            `**Công nghệ sử dụng:** ReactJs, NodeJs, MongoDB, ExpressJs`,
            `**Technologies:** ReactJs, NodeJs, MongoDB, ExpressJs`
          ),
        },
      ],
      link: {
        live: "https://hymnscenter.vercel.app",
        github: null,
      }
    },
    {
      title: t("Website đặt sân bóng đá", "Football Field Booking Website"),
      role: "Developer",
      period: null, // Bổ sung thời gian
      bullets: [
        {
          desc: t(
            `Phát triển hệ thống đặt sân bóng đá trực tuyến, cho phép người dùng xem lịch, đặt sân và quản lý lịch trình.`,
            `Created an online football field booking system, allowing users to view schedules, book fields, and manage reservations.`
          ),
        },
        {
          desc: t(
            `**Công nghệ sử dụng:** Java, SpringMVC, JDBC, MySQL, HTML, CSS, JQuery, Bootstrap`,
            `**Technologies:** Java, SpringMVC, JDBC, MySQL, HTML, CSS, JQuery, Bootstrap`
          ),
        },
      ],
      link: {
        live: null,
        github: null,
      }
    },
  ];

  const programmingSkills = {
    languages: "C#, Java, JavaScript, HTML, CSS",
    technologies: "ASP.NET MVC, ReactJS, Node.js, Express.js, MySQL, MongoDB, Docker, PostgreSQL, Next.js, NestJS, VPS",
  };

  const resumeTitle = t("LÊ BÙI THANH VŨ", "LE BUI THANH VU");
  const resumeSubtitle = "FULL-STACK DEVELOPER";

  return (
    <>
      <Container maxWidth="md" sx={{ py: 4}}>
      <AnimatePresence mode="wait">
        
        <motion.div key={lang} initial="hidden" animate="visible" exit="exit" variants={sectionVariants}>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography variant="h4" fontWeight="bold">{resumeTitle}</Typography>
              <Typography variant="body1" fontWeight="bold" sx={{ fontStyle: 'italic' }}>{resumeSubtitle}</Typography>
              <Typography variant="body2">{t("github.com/Vulee-92", "github.com/Vulee-92")}</Typography>
              <Typography variant="body2">{t("linkedin.com/in/vulee92", "linkedin.com/in/vulee92")}</Typography>
            </Grid>
            <Grid size={4} sx={{ textAlign: 'right' }}>
              <Button onClick={handleLangChange} variant="outlined" size="small" sx={{  mr: 1 }}>
                {lang === "vi" ? "English" : "Tiếng Việt"}
              </Button>
              <Button onClick={handleDownloadPDF} variant="contained" size="small">
                Download PDF
              </Button>
              <Typography variant="body2" sx={{ mt: 1 }}>Email: lebuiThanhvudev@gmail.com</Typography>
              <Typography variant="body2">Mobile: 0986 32 09 32</Typography>
              <Typography variant="body2">{t("Địa chỉ: Huyện Hoằng Hoá, Phường Hoà Đông, Hoà Thuận, Tp. Tam Kỳ, Quảng Nam", "Address: Hoang Hoa District, Hoa Dong Ward, Hoa Thuan, Tam Ky City, Quang Nam")}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 1.5, borderColor: 'black' }} />

          <div id="resume-content">
            {/* EDUCATION */}
            <MotionBox variants={sectionVariants}>
              <Typography variant="h6" fontWeight="bold">EDUCATION</Typography>
              <Divider sx={{ mt: 0.5, mb: 1, borderColor: 'black' }} />
              {education.map((edu, index) => (
                <MotionBox key={index} mb={1} variants={itemVariants}>
                  <Grid container>
                    <Grid size={8}>
                      <Typography variant="body1" fontWeight="bold">{edu.school}</Typography>
                      <Typography variant="body2">{edu.degree}</Typography>
                      <Typography variant="body2">{edu.notes}</Typography>
                    </Grid>
                    <Grid size={4} sx={{ textAlign: 'right' }}>
                      <Typography variant="body2">{edu.location}</Typography>
                      <Typography variant="body2" fontStyle="italic">{edu.period}</Typography>
                      <Typography variant="body2" fontStyle="italic">{edu.gpa}</Typography>
                    </Grid>
                  </Grid>
                </MotionBox>
              ))}
            </MotionBox>

            {/* EXPERIENCE */}
            <MotionBox mt={3} variants={sectionVariants}>
              <Typography variant="h6" fontWeight="bold">EXPERIENCE</Typography>
              <Divider sx={{ mt: 0.5, mb: 1, borderColor: 'black' }} />
              {experience.map((exp, index) => (
                <MotionBox key={index} mb={2} variants={itemVariants}>
                  <Grid container>
                    <Grid size={8}>
                      <Typography variant="body1" fontWeight="bold">{exp.company}</Typography>
                      <Typography variant="body2" fontStyle="italic">{exp.role}</Typography>
                    </Grid>
                    <Grid size={4} sx={{ textAlign: 'right' }}>
                      <Typography variant="body2">{exp.location}</Typography>
                      <Typography variant="body2" fontStyle="italic">{exp.period}</Typography>
                    </Grid>
                  </Grid>
                  <Box component="ul" sx={{ mt: 0.5, pl: 2, '& li': { mb: 0.5, display: 'list-item', listStyleType: 'disc' } }}>
                    {exp.bullets.map((bullet, i) => (
                      <li key={i}>
                        <Typography variant="body2" dangerouslySetInnerHTML={{ __html: formatText(bullet.desc) }} />
                      </li>
                    ))}
                  </Box>
                </MotionBox>
              ))}
            </MotionBox>

            {/* PROJECTS */}
            <MotionBox mt={3} variants={sectionVariants}>
              <Typography variant="h6" fontWeight="bold">PROJECTS</Typography>
              <Divider sx={{ mt: 0.5, mb: 1, borderColor: 'black' }} />
              {projects.map((proj, index) => (
                <MotionBox key={index} mb={2} variants={itemVariants}>
                  <Grid container>
                    <Grid size={8}>
                      <Typography variant="body1" fontWeight="bold">{proj.title}</Typography>
                      <Typography variant="body2" fontStyle="italic">{proj.role}</Typography>
                    </Grid>
                    <Grid size={4} sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" fontStyle="italic">{proj.period}</Typography>
                    </Grid>
                  </Grid>
                  <Box component="ul" sx={{ mt: 0.5, pl: 2, '& li': { mb: 0.5, display: 'list-item', listStyleType: 'disc' } }}>
                    {proj.bullets.map((bullet, i) => (
                      <li key={i}>
                        <Typography variant="body2" dangerouslySetInnerHTML={{ __html: formatText(bullet.desc) }} />
                      </li>
                    ))}
                    {proj.link?.live && (
                      <li style={{ marginTop: 1 }}>
                        <Typography variant="body2">
                          <Box component="span" fontWeight="bold">Live Demo: </Box>
                          <Link href={proj.link.live} target="_blank" rel="noopener noreferrer">{proj.link.live}</Link>
                        </Typography>
                      </li>
                    )}
                    {proj.link?.github && (
                      <li style={{ marginTop: 1 }}>
                        <Typography variant="body2">
                          <Box component="span" fontWeight="bold">Github: </Box>
                          <Link href={proj.link.github} target="_blank" rel="noopener noreferrer">{proj.link.github}</Link>
                        </Typography>
                      </li>
                    )}
                  </Box>
                </MotionBox>
              ))}
            </MotionBox>

            {/* PROGRAMMING SKILLS */}
            <MotionBox mt={3} variants={sectionVariants}>
              <Typography variant="h6" fontWeight="bold">PROGRAMMING SKILLS</Typography>
              <Divider sx={{ mt: 0.5, mb: 1, borderColor: 'black' }} />
              <Grid container>
                <Grid size={6}>
                  <Typography variant="body2">
                    <Box component="span" fontWeight="bold">Languages: </Box>
                    {programmingSkills.languages}
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="body2">
                    <Box component="span" fontWeight="bold">Technologies: </Box>
                    {programmingSkills.technologies}
                  </Typography>
                </Grid>
              </Grid>
            </MotionBox>
          </div>
        </motion.div>
      </AnimatePresence>
    </Container>
    </>
  
  );
}