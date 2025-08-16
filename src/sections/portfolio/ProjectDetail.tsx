'use client';

import React, { useRef, useEffect, useState } from "react";
import { Box, Typography, Container, Grid, Link, Button, Chip, Stack, styled } from '@mui/material';
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from 'react-router-dom';
import { NotFoundView } from '../error';
import { Header } from "./header";
import ResponsiveWebsiteEmbed from "src/components/mockup/ResponsiveWebsiteEmbed";
import { DeviceView } from "src/theme";

// --- Dữ liệu chi tiết cho các dự án ---
interface ProjectDetail {
    id: number;
    slug: string;
    title: string;
    shortDescription: string;
    heroImage: string;
    role: string;
    duration: string;
    technologies: string[];
    liveDemo?: string | null;
    github?: string | null;
    problem: string;
    goal: string;
    process: { title: string; description: string; image?: string }[];
    screenshots: string[];
    device: string[]; // ['mobile', 'desktop'] | ['mobile'] | ['desktop']
    results: string;
    learnings: string;
    initialDeviceView: string; // 'mobile' | 'desktop'
}

const mockProjectData: ProjectDetail[] = [
    {
        "id": 1,
        "slug": "mo-wedding",
        "title": "Nền tảng Thiệp Cưới Online & Quản lý Tiệc Cưới Toàn Diện",
        "shortDescription": "Phát triển một nền tảng web app toàn diện, tự động hóa quy trình tạo, quản lý và gửi thiệp cưới online. Ứng dụng tích hợp các tính năng cá nhân hóa, quản lý khách mời thông minh và cung cấp công cụ mạnh mẽ cho quản trị viên.",
        "heroImage": "https://res.cloudinary.com/dkwyql8zi/image/upload/v1754892736/sanpham/gjomf0o7grcpfgmeaxm2.png",
        "role": "Full-stack Developer",
        "duration": "08/2025 - Hiện tại",
        "technologies": [
            "ReactJS",
            "Node.js",
            "Express.js",
            "MongoDB",
            "TypeScript",
            "Material-UI",
            "Framer Motion",
            "Redux Toolkit",
            "Redux Saga",
            "Cloudinary API",
            "Google Sheets API",
            "Telegram Bot API",
            "JWT",
            "Docker",
            "Vercel",
            "Render"
        ],
        "liveDemo": "https://mo-wedding.vercel.app/",
        "github": "https://github.com/vulee-92/wedding-app",
        "device": [
            "mobile",
            "desktop",
            "tablet"
        ],
        "initialDeviceView": "desktop",
        "problem": "Các cặp đôi gặp khó khăn trong việc tạo thiệp cưới cá nhân hóa và quản lý danh sách khách mời một cách hiệu quả. Quy trình thủ công hiện tại tốn kém thời gian, chi phí và thiếu tính chuyên nghiệp.",
        "goal": "Xây dựng một nền tảng toàn diện để tự động hóa quy trình từ tạo thiệp đến quản lý khách mời. Nâng cao trải nghiệm người dùng, cung cấp công cụ quản lý hiệu quả và hiện đại hóa ngành cưới hỏi.",
        "process": [
            {
                "title": "Giai đoạn 1: Phát triển Front-end và Thiết kế UI/UX",
                "description": "Sử dụng ReactJS, Material-UI và Framer Motion để xây dựng giao diện người dùng trực quan, có tính thẩm mỹ cao. Tập trung vào trải nghiệm mượt mà, thân thiện với người dùng trên mọi thiết bị và tích hợp hiệu ứng chuyển động tinh tế. Đảm bảo tính nhất quán và dễ bảo trì bằng cách sử dụng TypeScript.",
                "image": "https://res.cloudinary.com/dxfsa7foy/image/upload/v1755318431/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-08-16_lu%CC%81c_11.27.04_o9xyx5.png"
            },
            {
                "title": "Giai đoạn 2: Xây dựng Back-end và API",
                "description": "Phát triển các API RESTful mạnh mẽ bằng Node.js và Express.js. Sử dụng MongoDB để lưu trữ dữ liệu thiệp cưới, người dùng và khách mời. Tích hợp Cloudinary để quản lý hình ảnh và sử dụng Google Sheets API để xử lý RSVP.",
                "image": "https://res.cloudinary.com/dkwyql8zi/image/upload/v1754891500/sanpham/j9epfbqcycyvjsxhd97m.png"
            },
            {
                "title": "Giai đoạn 3: Tích hợp và Tối ưu hóa Hệ thống",
                "description": "Xây dựng các tính năng nâng cao như hệ thống quản trị (Admin Dashboard), quản lý mã khuyến mãi, và các quy trình bảo mật (JWT Authentication). Tích hợp Telegram Bot để gửi thông báo real-time, đảm bảo các cập nhật quan trọng được thông báo ngay lập tức.",
                "image": "https://res.cloudinary.com/dkwyql8zi/image/upload/v1754891500/sanpham/j9epfbqcycyvjsxhd97m.png"
            }
        ],
        "screenshots": [
            "https://res.cloudinary.com/dkwyql8zi/image/upload/v1754892736/sanpham/gjomf0o7grcpfgmeaxm2.png",
            "https://res.cloudinary.com/dkwyql8zi/image/upload/v1754891500/sanpham/j9epfbqcycyvjsxhd97m.png",
            "https://res.cloudinary.com/dxfsa7foy/image/upload/v1755318431/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-08-16_lu%CC%81c_11.27.04_o9xyx5.png"
        ],
        "results": "Hệ thống đã tự động hóa toàn bộ quy trình từ thiết kế đến quản lý, giúp các cặp đôi tiết kiệm thời gian và chi phí. Nền tảng quản lý mạnh mẽ giúp đội ngũ admin làm việc hiệu quả hơn và nâng cao sự hài lòng của khách hàng.",
        "learnings": "Nắm vững việc xây dựng ứng dụng full-stack với Node.js và React. Thành thạo việc tích hợp các API bên thứ ba phức tạp (Google Sheets, Telegram Bot) và triển khai hệ thống thông báo theo thời gian thực. Hiểu sâu hơn về tối ưu hóa hiệu suất và bảo mật ứng dụng web."
    },
    {
        id: 2,
        slug: 'car-dispatch-system',
        title: 'Hệ thống Điều phối Dịch vụ Vận tải',
        shortDescription: 'Phát triển hệ thống web app quản lý và điều phối xe dịch vụ, tối ưu hóa quy trình vận hành và nâng cao hiệu quả kinh doanh.',
        heroImage: 'https://res.cloudinary.com/dkwyql8zi/image/upload/v1723380127/demo-car-dispatch-app_e3d9f2.png',
        role: 'Full-stack Developer',
        duration: '06/2024 - 08/2024',
        technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Docker'],
        liveDemo: "https://res.cloudinary.com/dxfsa7foy/image/upload/v1755318431/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-08-16_lu%CC%81c_11.27.04_o9xyx5.png",
        device: ['mobile', 'desktop'],
        initialDeviceView: 'desktop', // Mặc định hiển thị desktop
        github: null,
        problem: 'Quy trình điều phối xe dịch vụ thủ công và thiếu hiệu quả, dẫn đến việc chậm trễ và khó khăn trong việc quản lý tài xế, khách hàng.',
        goal: 'Xây dựng một hệ thống ba cấp người dùng: Admin, Điều phối viên, và Tài xế, nhằm tự động hóa quy trình điều phối và cung cấp khả năng quản lý chuyên sâu.',
        process: [
            {
                title: 'Phân tích và Lập kế hoạch',
                description: 'Nghiên cứu nhu cầu của người dùng và xác định các tính năng cần thiết. Phác thảo kiến trúc hệ thống và lựa chọn công nghệ phù hợp.',
            },
            {
                title: 'Tối ưu hóa quy trình',
                description: 'Áp dụng các công nghệ hiện đại như Next.js và NestJS để đảm bảo hiệu suất và khả năng mở rộng. Sử dụng PostgreSQL để quản lý dữ liệu phức tạp một cách hiệu quả.',
            },
        ],
        screenshots: [
            'https://res.cloudinary.com/dkwyql8zi/image/upload/v1723380127/demo-car-dispatch-screenshot1_d5b7y9.png',
            'https://res.cloudinary.com/dkwyql8zi/image/upload/v1723380127/demo-car-dispatch-screenshot2_e4c8d1.png',
        ],
        results: 'Hệ thống đã giảm thời gian điều phối xuống 50%, nâng cao sự hài lòng của khách hàng và tối ưu hóa lộ trình của tài xế.',
        learnings: 'Học cách xây dựng các ứng dụng phức tạp với nhiều vai trò người dùng và quản lý dữ liệu hiệu quả với PostgreSQL. Hiểu rõ hơn về kiến trúc microservices với NestJS.'
    },
    {
        id: 3,
        slug: 'manager-apartment',
        title: 'Hệ thống Quản lý Căn hộ và Dịch vụ Cho thuê Phòng',
        shortDescription: ' Xây dựng hệ thống quản lý căn hộ và dịch vụ cho thuê phòng, bao gồm quản lý hóa đơn, thông báo và yêu cầu hỗ trợ.',
        heroImage: 'https://res.cloudinary.com/difiyurn7/image/upload/v1754916493/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-08-08_lu%CC%81c_10.11.27_qbei1x.png',
        role: 'Full-stack Developer',
        duration: '2025',
        device: ['mobile'],
        initialDeviceView: 'mobile', // Mặc định hiển thị mobile
        technologies: ['NextJs', 'NodeJs', 'MongoDB', 'ExpressJs', 'Material-UI', 'Framer Motion', 'Cloudinary API', 'Vercel'],
        liveDemo: "https://vulee-portfolio-git-main-vulee92s-projects.vercel.app/assets/video/blog1.MP4",
        github: 'https://github.com/your-username/music-store',
        problem: 'Nhu cầu quản lý căn hộ và dịch vụ cho thuê phòng ngày càng tăng, nhưng các hệ thống hiện tại còn thiếu tính năng và khó sử dụng.',
        goal: 'Phát triển một hệ thống quản lý toàn diện, dễ sử dụng, cho phép người dùng quản lý hóa đơn, thông báo và yêu cầu hỗ trợ một cách hiệu quả.',
        process: [
            {
                title: 'Phân tích và Lập kế hoạch',
                description: 'Nghiên cứu nhu cầu của người dùng và xác định các tính năng cần thiết. Phác thảo kiến trúc hệ thống và lựa chọn công nghệ phù hợp.',
            },
            {
                title: 'Phát triển Backend',
                description: 'Sử dụng Node.js và MongoDB để xây dựng API RESTful. Tạo cơ sở dữ liệu để lưu trữ thông tin căn hộ, hóa đơn và yêu cầu hỗ trợ.',
            },
            {
                title: 'Phát triển Frontend',
                description: 'Sử dụng Next.js để xây dựng giao diện người dùng. Tạo các trang quản lý căn hộ, hóa đơn và yêu cầu hỗ trợ với Material-UI.',
                image: 'https://res.cloudinary.com/difiyurn7/image/upload/v1754916493/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-08-08_lu%CC%81c_10.11.27_qbei1x.png'
            },
            {
                title: 'Triển khai và Kiểm thử',
                description: 'Triển khai ứng dụng lên Vercel. Thực hiện kiểm thử chức năng và hiệu suất để đảm bảo hệ thống hoạt động ổn định.',
            },
            {
                title: 'Bảo trì và Cập nhật',
                description: 'Theo dõi hiệu suất hệ thống và thu thập phản hồi từ người dùng. Cập nhật tính năng và sửa lỗi định kỳ để cải thiện trải nghiệm người dùng.',
            }
        ],
        screenshots: [
            'https://res.cloudinary.com/dkwyql8zi/image/upload/v1723380127/demo-music-store-screenshot1_a3b2c1.png',
            'https://res.cloudinary.com/dkwyql8zi/image/upload/v1723380127/demo-music-store-screenshot2_x9y8z7.png',
        ],
        results: 'Hệ thống đã giúp người dùng quản lý căn hộ và dịch vụ cho thuê phòng một cách hiệu quả, giảm thiểu thời gian xử lý hóa đơn và yêu cầu hỗ trợ.',
        learnings: 'Học cách xây dựng hệ thống quản lý phức tạp với nhiều tính năng và vai trò người dùng khác nhau. Nâng cao kỹ năng phát triển ứng dụng web với Next.js và Node.js.'
    },
    {
        id: 4,
        slug: 'telegram-bot-customer-support',
        title: 'Tối Ưu Hóa Chăm Sóc Khách Hàng Với Telegram Bot',
        shortDescription: 'Trong thời đại số hóa, việc chăm sóc khách hàng hiệu quả là một trong những yếu tố quan trọng quyết định sự thành công của doanh nghiệp. Tuy nhiên, với các shop online nhỏ, việc duy trì đội ngũ nhân viên hỗ trợ 24/7 là một thách thức lớn về cả nguồn lực và chi phí.',
        heroImage: 'https://res.cloudinary.com/dkwyql8zi/image/upload/v1723380127/demo-car-dispatch-app_e3d9f2.png',
        role: 'Full-stack Developer',
        duration: '06/2024 - 08/2024',
        technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Docker'],
        liveDemo: "https://mo-bedding.vercel.app/",
        device: ['mobile', 'desktop'],
        initialDeviceView: 'desktop', // Mặc định hiển thị desktop
        github: null,
        problem: 'Quy trình điều phối xe dịch vụ thủ công và thiếu hiệu quả, dẫn đến việc chậm trễ và khó khăn trong việc quản lý tài xế, khách hàng.',
        goal: 'Chúng tôi đã phát triển một giải pháp đơn giản nhưng hiệu quả, tận dụng sức mạnh của nền tảng Telegram để tự động hóa quá trình hỗ trợ khách hàng. Hệ thống hoạt động theo quy trình sau:',
        process: [
            {
                title: 'Quy Trình Hoạt Động',
                description: `1. Khách hàng đặt câu hỏi trên website

2. Hệ thống tự động gửi thông báo tới Telegram của admin

3. Admin có thể trả lời mọi lúc, mọi nơi thông qua Telegram

4. Phản hồi được tự động gửi lại cho khách hàng`,
            },
            {
                title: 'Tính Năng Nổi Bật',
                description: `• Tích hợp Telegram Bot để gửi và nhận thông báo
                • Quản lý câu hỏi và phản hồi một cách dễ dàng
                • Hỗ trợ đa nền tảng, từ desktop đến mobile
                • Tự động hóa quy trình chăm sóc khách hàng
                `,
            },
            {
                title: 'Lợi Ích Mang Lại',
                description: `• Tiết kiệm thời gian và chi phí cho doanh nghiệp
                • Nâng cao trải nghiệm khách hàng với phản hồi nhanh chóng
                • Dễ dàng quản lý và theo dõi các câu hỏi
                • Tăng cường khả năng tương tác và chăm sóc khách hàng
                • Tích hợp dễ dàng với các hệ thống hiện có
                • Tối ưu hóa quy trình làm việc của đội ngũ admin
                • Giảm thiểu rủi ro mất thông tin khách hàng
                • Tăng cường bảo mật thông tin khách hàng
                • Dễ dàng mở rộng và tùy chỉnh theo nhu cầu doanh nghiệp
                • Tích hợp với các công cụ phân tích để theo dõi hiệu suất
                • Hỗ trợ đa nền tảng, từ desktop đến mobile
                • Tăng cường khả năng tương tác với khách hàng thông qua các tính năng như tìm kiếm thông minh và quản lý trạng thái câu hỏi
                • Cải thiện khả năng quản lý và theo dõi các câu hỏi từ khách hàng
                • Tăng cường khả năng tương tác và chăm sóc khách hàng thông qua các tính năng như tìm kiếm thông minh và quản lý trạng thái câu hỏi`,
            },
        ],
        screenshots: [
            'https://res.cloudinary.com/dkwyql8zi/image/upload/v1723380127/demo-car-dispatch-screenshot1_d5b7y9.png',
            'https://res.cloudinary.com/dkwyql8zi/image/upload/v1723380127/demo-car-dispatch-screenshot2_e4c8d1.png',
        ],
        results: 'Hệ thống đã giúp giảm 50% thời gian phản hồi khách hàng, đồng thời nâng cao trải nghiệm người dùng với khả năng hỗ trợ nhanh chóng và hiệu quả. Đội ngũ admin có thể quản lý và theo dõi các câu hỏi một cách dễ dàng thông qua Telegram.',
        learnings: 'Học cách tích hợp API Telegram để xây dựng hệ thống thông báo real-time. Nâng cao kỹ năng phát triển ứng dụng web với Next.js và NestJS, đồng thời làm quen với quản lý cơ sở dữ liệu PostgreSQL trong môi trường Docker.'
    },
    {
        id: 5,
        slug: 'pixel-duo',
        title: 'Hymns - Số Hoá Quản Lý Lớp Học Âm Nhạc Với Mini Games Thú Vị',
        shortDescription: 'Hymns là một dự án đột phá trong lĩnh vực giáo dục âm nhạc, kết hợp công nghệ hiện đại với phương pháp giảng dạy truyền thống. Được phát triển với mục tiêu số hoá và tối ưu hoá quy trình quản lý lớp học âm nhạc, Hymns không chỉ là một công cụ quản lý mà còn là một nền tảng học tập tương tác, mang đến trải nghiệm học nhạc hoàn toàn mới.',
        heroImage: 'https://res.cloudinary.com/dkwyql8zi/image/upload/v1723380127/demo-car-dispatch-app_e3d9f2.png',
        role: 'Full-stack Developer',
        duration: '06/2024 - 08/2024',
        technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Docker'],
        liveDemo: "https://mo-bedding.vercel.app/",
        device: ['mobile', 'desktop'],
        initialDeviceView: 'desktop', // Mặc định hiển thị desktop
        github: null,
        problem: 'Quy trình điều phối xe dịch vụ thủ công và thiếu hiệu quả, dẫn đến việc chậm trễ và khó khăn trong việc quản lý tài xế, khách hàng.',
        goal: 'Chúng tôi đã phát triển một giải pháp đơn giản nhưng hiệu quả, tận dụng sức mạnh của nền tảng Telegram để tự động hóa quá trình hỗ trợ khách hàng. Hệ thống hoạt động theo quy trình sau:',
        process: [
            {
                title: 'Quy Trình Hoạt Động',
                description: `1. Khách hàng đặt câu hỏi trên website

2. Hệ thống tự động gửi thông báo tới Telegram của admin

3. Admin có thể trả lời mọi lúc, mọi nơi thông qua Telegram

4. Phản hồi được tự động gửi lại cho khách hàng`,
            },
            {
                title: 'Tính Năng Nổi Bật',
                description: `• Tích hợp Telegram Bot để gửi và nhận thông báo
                • Quản lý câu hỏi và phản hồi một cách dễ dàng
                • Hỗ trợ đa nền tảng, từ desktop đến mobile
                • Tự động hóa quy trình chăm sóc khách hàng
                `,
            },
            {
                title: 'Lợi Ích Mang Lại',
                description: `• Tiết kiệm thời gian và chi phí cho doanh nghiệp
                • Nâng cao trải nghiệm khách hàng với phản hồi nhanh chóng
                • Dễ dàng quản lý và theo dõi các câu hỏi
                • Tăng cường khả năng tương tác và chăm sóc khách hàng
                • Tích hợp dễ dàng với các hệ thống hiện có
                • Tối ưu hóa quy trình làm việc của đội ngũ admin
                • Giảm thiểu rủi ro mất thông tin khách hàng
                • Tăng cường bảo mật thông tin khách hàng
                • Dễ dàng mở rộng và tùy chỉnh theo nhu cầu doanh nghiệp
                • Tích hợp với các công cụ phân tích để theo dõi hiệu suất
                • Hỗ trợ đa nền tảng, từ desktop đến mobile
                • Tăng cường khả năng tương tác với khách hàng thông qua các tính năng như tìm kiếm thông minh và quản lý trạng thái câu hỏi
                • Cải thiện khả năng quản lý và theo dõi các câu hỏi từ khách hàng
                • Tăng cường khả năng tương tác và chăm sóc khách hàng thông qua các tính năng như tìm kiếm thông minh và quản lý trạng thái câu hỏi`,
            },
        ],
        screenshots: [
            'https://res.cloudinary.com/dkwyql8zi/image/upload/v1723380127/demo-car-dispatch-screenshot1_d5b7y9.png',
            'https://res.cloudinary.com/dkwyql8zi/image/upload/v1723380127/demo-car-dispatch-screenshot2_e4c8d1.png',
        ],
        results: 'Hệ thống đã giúp giảm 50% thời gian phản hồi khách hàng, đồng thời nâng cao trải nghiệm người dùng với khả năng hỗ trợ nhanh chóng và hiệu quả. Đội ngũ admin có thể quản lý và theo dõi các câu hỏi một cách dễ dàng thông qua Telegram.',
        learnings: 'Học cách tích hợp API Telegram để xây dựng hệ thống thông báo real-time. Nâng cao kỹ năng phát triển ứng dụng web với Next.js và NestJS, đồng thời làm quen với quản lý cơ sở dữ liệu PostgreSQL trong môi trường Docker.'
    },
];

// Đây là một animation đơn giản cho các section khi cuộn, bạn có thể tùy chỉnh
const InViewWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
        >
            {children}
        </motion.div>
    );
};
// Component Chip và logic vẽ đường nối
const ConnectedChips = ({ technologies }: { technologies: string[] }) => {

    const containerRef = useRef<HTMLDivElement>(null);

    const chipRefs = useRef<(HTMLDivElement | null)[]>([]);



    const [connections, setConnections] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);



    const drawConnections = () => {

        if (!containerRef.current) return;



        const newConnections = [];

        const containerRect = containerRef.current.getBoundingClientRect();

        const positions = chipRefs.current.map(chip => {

            if (chip) {

                const rect = chip.getBoundingClientRect();

                return {

                    x: rect.left + rect.width / 2 - containerRect.left,

                    y: rect.top + rect.height / 2 - containerRect.top,

                };

            }

            return null;

        }).filter(Boolean);



        for (let i = 0; i < positions.length - 1; i++) {

            for (let j = i + 1; j < positions.length; j++) {

                const p1 = positions[i];

                const p2 = positions[j];

                if (p1 && p2) {

                    // Chỉ vẽ đường nối giữa các chip gần nhau

                    const distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

                    if (distance < 200) { // Ngưỡng khoảng cách, bạn có thể điều chỉnh

                        newConnections.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y });

                    }

                }

            }

        }

        setConnections(newConnections);

    };



    useEffect(() => {

        drawConnections();

        window.addEventListener('resize', drawConnections);

        return () => window.removeEventListener('resize', drawConnections);

    }, [technologies]);



    const parentVariants = {

        hidden: { opacity: 0 },

        visible: {

            opacity: 1,

            transition: {

                staggerChildren: 0.1,

                delayChildren: 0.2

            }

        }

    };



    const childVariants = {

        hidden: { opacity: 0, scale: 0.5, y: 20 },

        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }

    };



    return (

        <Box position="relative" ref={containerRef}>

            <svg

                style={{

                    position: 'absolute',

                    top: 0,

                    left: 0,

                    width: '100%',

                    height: '100%',

                    pointerEvents: 'none',

                    zIndex: 0,

                }}

            >

                {connections.map((conn, index) => (

                    <motion.line

                        key={index}

                        x1={conn.x1}

                        y1={conn.y1}

                        x2={conn.x2}

                        y2={conn.y2}

                        stroke="#666"

                        strokeWidth="1"

                        initial={{ pathLength: 0 }}

                        animate={{ pathLength: 1 }}

                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}

                    />

                ))}

            </svg>

            <motion.div

                variants={parentVariants}

                initial="hidden"

                animate="visible"

                style={{ position: 'relative', zIndex: 1 }}

            >

                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>

                    {technologies.map((tech, index) => (

                        <motion.div key={tech} variants={childVariants} ref={(el) => void (chipRefs.current[index] = el)}
>

                            <Chip label={tech} size="small" sx={{

                                bgcolor: 'rgba(255, 255, 255, 0.1)',

                                color: 'text.primary',

                                backdropFilter: 'blur(10px)',

                                WebkitBackdropFilter: 'blur(10px)',

                                border: '1px solid rgba(255, 255, 255, 0.2)',

                                px: 2,

                                py: 1,

                                borderRadius: '999px',

                                '&:hover': {

                                    bgcolor: 'rgba(255, 255, 255, 0.2)',

                                }

                            }} />

                        </motion.div>

                    ))}

                </Stack>

            </motion.div>

        </Box>

    );

};

// Component chính CaseStudy
export default function CaseStudy() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const projectData = mockProjectData.find(p => p.slug === slug);
    const currentIndex = mockProjectData.findIndex(p => p.slug === slug);

    if (!projectData) {
        return <NotFoundView />;
    }

    const nextProject = mockProjectData[(currentIndex + 1) % mockProjectData.length];

    return (
        <>
            <Header />
            <AnimatePresence mode="wait">
                <motion.div
                    key={slug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 8 }, mt: 5, pb: 0 }}>
                        <Grid container spacing={{ xs: 4, md: 6 }}>
                            {/* Cột trái: Tiêu đề, hình ảnh và nội dung chính */}
                            <Grid size={{ xs: 12, md: 8 }} >
                                <motion.div
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {/* Typography cho tiêu đề chính */}
                                    <Typography
                                        variant="h2"
                                        fontWeight="bold"
                                        gutterBottom
                                        sx={{
                                            fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4.5rem' },
                                            lineHeight: 1.2
                                        }}
                                    >
                                        {projectData.title}
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4 }}>
                                        {projectData.shortDescription}
                                    </Typography>

                                    {/* Hero Image */}
                                    {/* <Box
                                        component="img"
                                        src={projectData.heroImage}
                                        sx={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: 2,
                                            boxShadow: 'none',
                                            mb: { xs: 4, md: 8 }
                                        }}
                                    /> */}

                                    {/* Buttons */}
                                    <Box sx={{ display: 'flex', gap: 2, mb: 8 }}>
                                        {/* {projectData.liveDemo && (
                                            <Button component={Link} href={projectData.liveDemo} target="_blank" variant="outlined" sx={{
                                                fontWeight: 'bold',
                                                color: '#000',
                                                borderColor: '#000',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(0,0,0,0.05)'
                                                }
                                            }}>
                                                Live Demo
                                            </Button>
                                        )} */}

                                    </Box>
                                    <ResponsiveWebsiteEmbed
                                        url={projectData.liveDemo || projectData.liveDemo || ''}
                                        initialDeviceView={projectData.initialDeviceView as DeviceView} // Mặc định hiển thị mobile
                                        visibleDevices={projectData.device as DeviceView[]} // ['mobile', 'desktop'] | ['mobile'] | ['desktop']

                                        scales={{
                                            desktop: { xs: 0.2, md: 0.5 }, // Ghi đè scale mặc định cho desktop
                                            mobile: 0.5,  // Ghi đè scale mặc định cho mobile
                                            tablet: 0.3
                                        }}

                                    />
                                    {/* Nội dung chi tiết (Vấn đề, Quy trình, ...) */}
                                    <Box sx={{
                                        py: '4rem 0',
                                        '@media (max-width: 900px)': {
                                            padding: '2rem 0',
                                        }
                                    }}>
                                        {/* Vấn đề & Mục tiêu */}
                                        <Box mb={8}>
                                            <InViewWrapper>
                                                <Typography
                                                    variant="h4"
                                                    fontWeight="bold"
                                                    gutterBottom
                                                    sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
                                                >
                                                    Vấn đề và Mục tiêu
                                                </Typography>
                                                <Typography variant="body1">{projectData.problem}</Typography>
                                                <Box mt={2}>
                                                    <Typography variant="h5" fontWeight="bold">Mục tiêu chính:</Typography>
                                                    <Typography variant="body1">{projectData.goal}</Typography>
                                                </Box>
                                            </InViewWrapper>
                                        </Box>

                                        {/* Quy trình thực hiện */}
                                        <Box mb={8}>
                                            <InViewWrapper>
                                                <Typography
                                                    variant="h4"
                                                    fontWeight="bold"
                                                    gutterBottom
                                                    sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
                                                >
                                                    Quy trình thực hiện
                                                </Typography>
                                                {projectData.process.map((step, index) => (
                                                    <Box key={index} mt={4}>
                                                        <Typography variant="h6" fontWeight="bold">{step.title}</Typography>
                                                        <Typography>{step.description}</Typography>
                                                        {step.image && (
                                                            <Box component="img" src={step.image} sx={{ width: '100%', mt: 2, borderRadius: 2 }} />
                                                        )}
                                                    </Box>
                                                ))}
                                            </InViewWrapper>
                                        </Box>

                                        {/* Thư viện ảnh */}
                                        <Box mb={8}>
                                            <InViewWrapper>
                                                <Typography
                                                    variant="h4"
                                                    fontWeight="bold"
                                                    gutterBottom
                                                    sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
                                                >
                                                    Thư viện Giao diện
                                                </Typography>
                                                <Grid container spacing={2}>
                                                    {projectData.screenshots.map((image, index) => (
                                                        <Grid size={{ xs: 12, sm: 6 }} key={index}  >
                                                            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                                                                <Box component="img" src={image} sx={{ width: '100%', borderRadius: 2, boxShadow: 'none' }} />
                                                            </motion.div>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </InViewWrapper>
                                        </Box>

                                        {/* Kết quả và Bài học */}
                                        <Box>
                                            <InViewWrapper>
                                                <Typography
                                                    variant="h4"
                                                    fontWeight="bold"
                                                    gutterBottom
                                                    sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
                                                >
                                                    Kết quả và Bài học
                                                </Typography>
                                                <Box mb={2}>
                                                    <Typography variant="h5" fontWeight="bold">Kết quả đạt được:</Typography>
                                                    <Typography>{projectData.results}</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="h5" fontWeight="bold">Những điều đã học được:</Typography>
                                                    <Typography>{projectData.learnings}</Typography>
                                                </Box>
                                            </InViewWrapper>
                                        </Box>
                                    </Box>
                                </motion.div>
                            </Grid>

                            {/* Cột phải: Thông tin dự án */}
                            <Grid size={{ xs: 12, md: 4 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                                <Box
                                    component={motion.div}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    sx={{
                                        position: { md: 'sticky' },
                                        top: 100,
                                        p: 3,
                                        // Loại bỏ GradientBorderBox và thay bằng styling đơn giản
                                    }}
                                >
                                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Thông tin Dự án</Typography>
                                    <Typography variant="subtitle1" fontWeight="bold">Vai trò</Typography>
                                    <Typography variant="body2" sx={{ mb: 2 }}>{projectData.role}</Typography>
                                    <Typography variant="subtitle1" fontWeight="bold">Thời gian</Typography>
                                    <Typography variant="body2" sx={{ mb: 2 }}>{projectData.duration}</Typography>
                                    <Typography variant="subtitle1" fontWeight="bold">Liên kết</Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>

                                        {projectData.github && (
                                            <Button component={Link} href={projectData.github} target="_blank" variant="outlined" sx={{
                                                fontWeight: 'bold',
                                                color: '#000',
                                                borderColor: '#000',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(0,0,0,0.05)'
                                                }
                                            }}>
                                                Github
                                            </Button>
                                        )}
                                    </Box>
                                    <Typography variant="subtitle1" fontWeight="bold">Công nghệ</Typography>
                                    <Box mt={2}>
                                        <ConnectedChips technologies={projectData.technologies} />
                                    </Box>

                                </Box>
                            </Grid>
                        </Grid>
                    </Container>

                    {/* Phần "Dự án tiếp theo" */}
                    <Box
                        onClick={() => navigate(`/project/${nextProject.slug}`)}
                        sx={{
                            position: 'relative',
                            mt: 8,
                            py: 12,
                            px: 4,
                            backgroundColor: '#f5f5f5',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            transition: 'background-color 0.3s',
                            '&:hover': {
                                backgroundColor: '#e0e0e0',
                            },
                            textAlign: 'center',
                        }}
                    >
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Typography variant="body2" fontWeight="bold" sx={{ color: 'text.secondary', mb: 1 }}>
                                Dự án tiếp theo
                            </Typography>
                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                sx={{
                                    fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                                    lineHeight: 1.1
                                }}
                            >
                                {nextProject.title}
                            </Typography>
                        </motion.div>
                    </Box>
                </motion.div>
            </AnimatePresence>
        </>
    );
}

// Lưu ý: Các styled component GradientBorderBox và ContentSection được giữ lại,
// nhưng trong code chính tôi đã bỏ sử dụng GradientBorderBox để phù hợp với yêu cầu.
// ContentSection được thay thế bằng một Box với styling tương tự.