import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const getPathData = (width: number, height: number) => {
  // Số điểm kiểm soát ngẫu nhiên
  const numPoints = Math.floor(Math.random() * 3) + 2; // Từ 2 đến 4 điểm
  
  let path = `M 0 ${height * Math.random() * 0.2 + height * 0.8}`; // Bắt đầu từ phía dưới

  for (let i = 0; i < numPoints; i++) {
    const cp1x = width * Math.random();
    const cp1y = height * Math.random();
    const cp2x = width * Math.random();
    const cp2y = height * Math.random();
    const ex = width * ((i + 1) / numPoints);
    const ey = height * Math.random();
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${ex} ${ey}`;
  }

  // Kết thúc đường cong ở cạnh phải của màn hình
  path += ` L ${width} ${height} L 0 ${height} Z`;

  return path;
};

const RandomCurveSVG: React.FC = () => {
  const [pathData, setPathData] = useState('');
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      const parent = document.getElementById('scrolling-logos-container');
      if (parent) {
        setSize({ width: parent.clientWidth, height: parent.clientHeight });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 0 && size.height > 0) {
      setPathData(getPathData(size.width, size.height));
    }
  }, [size]);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, // Đặt z-index thấp để nằm dưới các logo
      }}
    >
      <svg width="100%" height="100%" viewBox={`0 0 ${size.width} ${size.height}`} preserveAspectRatio="none">
        <path d={pathData} fill="#000" />
      </svg>
    </Box>
  );
};

export default RandomCurveSVG;