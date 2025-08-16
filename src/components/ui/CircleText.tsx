import React from 'react';

interface CircleTextProps {
  text: string;
  radius?: number;
  fontSize?: number;
  children?: React.ReactNode; // Để chèn icon vào giữa
}

const CircleText: React.FC<CircleTextProps> = ({
  text,
  radius = 60,
  fontSize = 16,
  children,
}) => {
  const circlePathId = 'circlePath';
  // Để chữ nối liền, bạn có thể thêm khoảng trắng ở cuối text
  const repeatedText = text.endsWith(' ') ? text : text + ' ';
  return (
    <div style={{ position: 'relative', width: radius * 2, height: radius * 2 }}>
      <svg
        width={radius * 2}
        height={radius * 2}
        style={{
          animation: 'rotate 8s linear infinite',
          transformOrigin: '50% 50%',
          display: 'block',
        }}
      >
        <defs>
          <path
            id={circlePathId}
            d={`
              M ${radius},${radius}
              m -${radius - fontSize},0
              a ${radius - fontSize},${radius - fontSize} 0 1,1 ${2 * (radius - fontSize)},0
              a ${radius - fontSize},${radius - fontSize} 0 1,1 -${2 * (radius - fontSize)},0
            `}
            fill="none"
          />
        </defs>
        <text
          fontSize={fontSize}
          fontWeight={700}
          fill="#222"
          letterSpacing="2px"
        >
          <textPath
            xlinkHref={`#${circlePathId}`}
            startOffset="0"
            textLength={2 * Math.PI * (radius - fontSize)}
            lengthAdjust="spacingAndGlyphs"
          >
            {repeatedText.repeat(3)}
          </textPath>
        </text>
      </svg>
      {/* Icon ở giữa */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: radius,
          height: radius,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CircleText;