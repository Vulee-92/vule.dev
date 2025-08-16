import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, useViewportScroll, useTransform, MotionValue } from 'framer-motion';

// Mảng chứa các URL hình ảnh
const originalImages = [
    'https://res.cloudinary.com/difiyurn7/image/upload/v1754920935/482059640_4102605086636918_3118572561799018954_n_gtfqsw.jpg',
    'https://res.cloudinary.com/difiyurn7/image/upload/v1754920935/482244723_4106175812946512_8676025367198842274_n_wae6m7.jpg',
    'https://res.cloudinary.com/difiyurn7/image/upload/v1754920935/481660568_4096775470553213_1580787663234595149_n_jlhhmp.jpg',
    'https://res.cloudinary.com/difiyurn7/image/upload/v1754920934/481452955_4096775480553212_7316282557582860570_n_rrtfcw.jpg',
    'https://res.cloudinary.com/difiyurn7/image/upload/v1754920935/482059640_4102605086636918_3118572561799018954_n_gtfqsw.jpg',
    'https://res.cloudinary.com/difiyurn7/image/upload/v1754920935/482244723_4106175812946512_8676025367198842274_n_wae6m7.jpg',
    'https://res.cloudinary.com/difiyurn7/image/upload/v1754920935/481660568_4096775470553213_1580787663234595149_n_jlhhmp.jpg',
    'https://res.cloudinary.com/difiyurn7/image/upload/v1754920934/481452955_4096775480553212_7316282557582860570_n_rrtfcw.jpg',
    'https://res.cloudinary.com/difiyurn7/image/upload/v1754920935/482059640_4102605086636918_3118572561799018954_n_gtfqsw.jpg',
    'https://res.cloudinary.com/difiyurn7/image/upload/v1754920935/482244723_4106175812946512_8676025367198842274_n_wae6m7.jpg',
    'https://res.cloudinary.com/difiyurn7/image/upload/v1754920935/481660568_4096775470553213_1580787663234595149_n_jlhhmp.jpg',
    'https://res.cloudinary.com/difiyurn7/image/upload/v1754920934/481452955_4096775480553212_7316282557582860570_n_rrtfcw.jpg',
    'https://res.cloudinary.com/difiyurn7/image/upload/v1754920935/482059640_4102605086636918_3118572561799018954_n_gtfqsw.jpg',
    'https://res.cloudinary.com/difiyurn7/image/upload/v1754920935/482244723_4106175812946512_8676025367198842274_n_wae6m7.jpg',
    'https://res.cloudinary.com/difiyurn7/image/upload/v1754920935/481660568_4096775470553213_1580787663234595149_n_jlhhmp.jpg',
    'https://res.cloudinary.com/difiyurn7/image/upload/v1754920934/481452955_4096775480553212_7316282557582860570_n_rrtfcw.jpg',
];

// Hàm xáo trộn mảng để hiển thị ngẫu nhiên
const shuffleArray = (array: string[]) => {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// Định nghĩa kiểu props cho component ImageColumn
interface ImageColumnProps {
  images: string[];
  yOffset: MotionValue<number>;
  rotate: string; 
}

// Component dùng để hiển thị một cột ảnh
const ImageColumn = ({ images, yOffset, rotate }: ImageColumnProps) => (
    <motion.div style={{ y: yOffset, rotate }}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            minWidth: '250px' 
        }}>
            {images.map((src, index) => (
                <Box
                    key={index}
                    component="img"
                    src={src}
                    alt={`Image ${index}`}
                    sx={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: 2,
                        objectFit: 'cover'
                    }}
                />
            ))}
        </Box>
    </motion.div>
);

export default function MosaicScrollSection() {
    const { scrollYProgress } = useViewportScroll();
    const [shuffledImages, setShuffledImages] = useState(originalImages);

    useEffect(() => {
        setShuffledImages(shuffleArray(originalImages));
    }, []);

    // Mảng chứa các giá trị dịch chuyển y cho 3 cột ảnh
    const yOffsets = [
        useTransform(scrollYProgress, [0, 1], [0, 250]), // Cột 1: Chạy xuống
        useTransform(scrollYProgress, [0, 1], [0, -500]), // Cột 2: Chạy lên
        useTransform(scrollYProgress, [0, 1], [0, 150]),  // Cột 3: Chạy xuống
    ];

    // Chỉ có một giá trị xoay duy nhất áp dụng cho tất cả các cột
    const rotation = '-5deg';

    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    minHeight: '200vh',
                    backgroundColor: '#000',
                    pt: 10,
                    pb: 10,
                    overflow: 'hidden',
                }}
            >
                <Box 
                    sx={{ 
                        position: 'sticky', 
                        top: 0, 
                        width: '100%',
                        maxWidth: '100vw',
                        px: { xs: 2, md: 4 }
                    }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 2,
                            minHeight: '100vh',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: 'none'
                        }}
                    >
                        {/* Render từng cột ảnh, tất cả đều nhận cùng một giá trị xoay */}
                        <ImageColumn images={shuffledImages.slice(0, 5)} yOffset={yOffsets[0]} rotate={rotation} />
                        <ImageColumn images={shuffledImages.slice(5, 10)} yOffset={yOffsets[1]} rotate={rotation} />
                        <ImageColumn images={shuffledImages.slice(10, 15)} yOffset={yOffsets[2]} rotate={rotation} />
                    </Box>
                </Box>
            </Box>
           
        </>
    );
}