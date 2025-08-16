import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  styled,
  Container,
} from '@mui/material';
import { motion } from 'framer-motion';

// Styled components
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  position: 'relative',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: '20px !important',
  padding: '8px 16px',
  transition: 'all 0.3s ease-in-out',
  zIndex: 1,
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    transform: 'scale(1.05)',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  '&:not(.Mui-selected):hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    transform: 'scale(1.02)',
  },
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  '& .MuiToggleButtonGroup-grouped': {
    margin: '4px',
    border: 0,
    borderRadius: '20px',
  },
});

interface Point {
  x: number;
  y: number;
}

interface FlowLineProps {
  start?: Point;
  end?: Point;
}

const FlowLine = ({ start, end }: FlowLineProps) => {
  if (!start || !end) return null;

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  const lineStyle: React.CSSProperties = {
    position: 'absolute',
    height: '2px',
    background: 'linear-gradient(90deg, #2196F3 0%, #1976D2 100%)',
    transformOrigin: 'left center',
    pointerEvents: 'none',
    zIndex: 0,
  };

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{
        width: length,
        opacity: 1,
        left: start.x,
        top: start.y,
        transform: `rotate(${angle}deg)`,
      }}
      transition={{ duration: 0.3 }}
      style={lineStyle}
    />
  );
};

export default function ContactForm() {
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false); // Thêm state để theo dõi trạng thái form
  const [isSubmitting, setIsSubmitting] = useState(false); // Thêm state để disable nút khi đang gửi
  const [buttonPositions, setButtonPositions] = useState<Map<string, Point>>(new Map());
  const groupRef = useRef<HTMLDivElement | null>(null);

  const updateButtonPositions = () => {
    if (!groupRef.current) return;

    const newPositions = new Map<string, Point>();
    const buttons = groupRef.current.querySelectorAll<HTMLButtonElement>('.MuiToggleButton-root');

    buttons.forEach((button) => {
      const rect = button.getBoundingClientRect();
      const groupRect = groupRef.current!.getBoundingClientRect();
      newPositions.set(button.value, {
        x: rect.left + rect.width / 2 - groupRect.left,
        y: rect.top + rect.height / 2 - groupRect.top,
      });
    });

    setButtonPositions(newPositions);
  };

  useEffect(() => {
    updateButtonPositions();
    window.addEventListener('resize', updateButtonPositions);
    return () => window.removeEventListener('resize', updateButtonPositions);
  }, []);

  const handleServicesChange = (
    event: React.MouseEvent<HTMLElement>,
    newServices: string[]
  ) => {
    setServices(newServices);
    setTimeout(updateButtonPositions, 50); // Cập nhật lại vị trí sau animation
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true); // Đặt trạng thái đang gửi

    // Lấy dữ liệu từ form
    const formData = {
      'Full name': (event.currentTarget.elements.namedItem('Full name') as HTMLInputElement).value,
      'Your email address': (event.currentTarget.elements.namedItem('Your email address') as HTMLInputElement).value,
      'Tell us about your project': (event.currentTarget.elements.namedItem('Tell us about your project') as HTMLInputElement).value,
      'I\'m interested in...': services.join(', '), // Chuyển mảng services thành chuỗi
    };

    try {
      // Thay thế URL này bằng URL Apps Script đã deploy
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbyLGE0q2WVDYYdn-_ZLsFWLcd5_ikKazJOpwyoqS-Tyml3arQ0lw6STB8Unog7Png2B/exec';

      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Sử dụng chế độ no-cors vì Apps Script không trả về CORS header
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      // Mặc dù response.ok sẽ luôn là false với mode: 'no-cors',
      // ta vẫn có thể giả định thành công và cập nhật UI.
      if (response.ok || response.status === 0) {
        setIsSubmitted(true);
      } else {
        throw new Error('Lỗi khi gửi form.');
      }
    } catch (error) {
      console.error('Lỗi khi gửi form:', error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false); // Kết thúc quá trình gửi
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
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
            // scale: heroScale,
            // opacity: heroOpacity,
            // y: heroY,
          }}
        >
          <motion.img
            src="/assets/svg/Hello.svg"
            alt="Logo"
            width={400}
            height="auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.section>
      </Container>
      {/* Sử dụng conditional rendering để hiển thị giao diện phù hợp */}
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          <Typography variant="h2" gutterBottom>
            Cảm ơn bạn đã liên hệ! 🎉
          </Typography>
          <Typography variant="body1">
            Chúng tôi đã nhận được yêu cầu của bạn và sẽ phản hồi sớm nhất.
          </Typography>
        </motion.div>
      ) : (
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h1" sx={{ mb: 4 }}>
            Hey! 👋 Tell us all the things
          </Typography>

          <Typography variant="h4" sx={{ mb: 2 }}>
            I'm interested in...
          </Typography>

          <Box sx={{ position: 'relative' }} ref={groupRef}>
            {services.length >= 2 &&
              services.map((service, index) => {
                if (index === services.length - 1) return null;
                const start = buttonPositions.get(service);
                const end = buttonPositions.get(services[index + 1]);
                return (
                  <FlowLine
                    key={`${service}-${services[index + 1]}`}
                    start={start}
                    end={end}
                  />
                );
              })}

            <StyledToggleButtonGroup
              value={services}
              onChange={handleServicesChange}
              aria-label="services"
              color="primary"
            >
              <StyledToggleButton value="site">Site from scratch</StyledToggleButton>
              <StyledToggleButton value="app">App from scratch</StyledToggleButton>
              <StyledToggleButton value="ux">UX/UI Design</StyledToggleButton>
              <StyledToggleButton value="branding">Branding</StyledToggleButton>
              <StyledToggleButton value="ads">Ads</StyledToggleButton>
              <StyledToggleButton value="frontend">Front-end</StyledToggleButton>
              <StyledToggleButton value="motion">Motion Design</StyledToggleButton>
            </StyledToggleButtonGroup>
          </Box>

          <Stack spacing={3} sx={{ mt: 4 }}>
            <TextField fullWidth label="Full name" variant="standard" name="Full name" />
            <TextField fullWidth label="Your email address" type="email" variant="standard" name="Your email address" />
            <TextField
              fullWidth
              label="Tell us about your project"
              multiline
              rows={4}
              variant="standard"
              name="Tell us about your project"
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting} // Disable nút khi đang gửi form
              sx={{
                mt: 4,
                bgcolor: 'black',
                color: 'white',
                borderRadius: '25px',
                py: 1.5,
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.8)',
                },
              }}
            >
              {isSubmitting ? 'Đang gửi...' : 'SEND REQUEST'}
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}