import { useState } from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Grid, IconButton } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import MosaicScrollSection from '../RunningPhotosGrid';
import { Header } from './header';
import Footer from './Footer';
// import { SectionHeading } from '../shared/section-heading';

const VideoCard = styled(motion.div)(({ theme }) => ({
  // background: '#ffffff',
  borderRadius: theme.spacing(3),
  overflow: 'hidden',
  boxShadow: '0 0 40px rgba(0, 0, 0, 0.1)',
  border: '2px solid rgba(0, 0, 0, 0.1)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.4s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.12)',
  }
}));

const VideoWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingTop: '56.25%', // 16:9 Aspect Ratio
  width: '100%',
  '& iframe': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
  }
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const DescriptionBox = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.9rem',
  lineHeight: 1.8,
  overflow: 'hidden',
  transition: 'max-height 0.4s ease',
  maxHeight: 80,
  position: 'relative',
  marginBottom: theme.spacing(2),
  '&.expanded': {
    maxHeight: '1000px',
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40px',
    background: 'linear-gradient(to top, #ffffff, transparent)',
  },
  '&.expanded:after': {
    height: 0,
  }
}));



const ReadMoreButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: "#000000",
  fontSize: '0.9rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  marginTop: 'auto',
  '&:hover': {
    color: "#000000",
  }
}));

export const videos = [
  {
    id: 'FzR_TIGtNPE',
    title: 'Thánh ca 290 - NƯƠNG CÁNH VĨNH SINH | Hynms',
    description: 'Mỗi khi đàn bài "Nương Cánh Vĩnh Sinh", mình cảm nhận được sự bình an lạ thường. Giai điệu nhẹ nhàng như đôi cánh thiên thần, nâng tâm hồn ta vượt lên trên những lo toan thường nhật. Qua tiếng đàn guitar, mình mong được chia sẻ cảm xúc thiêng liêng và sự bình an này đến với mọi người. 🕊️'
  },
  {
    id: 'a9UkboylqhY',
    title: 'Thánh Ca 704 - NGÀI LÀ TẤT CẢ CHO TÔI | Hymns',
    description: '"Ngài Là Tất Cả Cho Tôi" - một bài hát đặc biệt với mình. Mỗi nốt nhạc như một lời tâm sự, một lời tạ ơn sâu sắc. Khi đàn bài này, mình luôn nhớ đến những khoảnh khắc được Chúa dìu dắt trong cuộc sống. Hy vọng giai điệu này sẽ chạm đến trái tim của những ai đang lắng nghe. 🙏'
  },
  {
    id: 'dq5YepwJHFM',
    title: 'Thánh ca 325 - GÁNH LÚA VỀ | Hymns',
    description: 'Mỗi bài Thánh Ca là một lời cầu nguyện, một sự tạ ơn. "Gánh Lúa Về" - một khúc nhạc đơn sơ về niềm vui của mùa gặt, về những hy vọng và đức tin. Qua tiếng đàn guitar, tôi muốn chia sẻ cảm xúc thiêng liêng và bình an này đến với mọi người...'
  },
  {
    id: 'sy-6XYYzgfA',
    title: 'November /orig. 岸部眞明 (Masaaki Kishibe) - Vulee',
    description: 'Tháng 11 - khi những chiếc lá cuối cùng của mùa thu nhẹ nhàng rơi. Bản nhạc của Masaaki Kishibe như một bức tranh âm nhạc, vẽ nên khung cảnh của một ngày cuối thu tĩnh lặng. Mỗi nốt nhạc, mỗi giai điệu đều mang đến những cảm xúc tinh tế, sâu lắng...'
  },
  {
    id: 'TMhzgkeln0Y',
    title: 'TRỜI SÁNG RỒI - NGUYÊN HÀ (OST TRỜI SÁNG RỒI, TA NGỦ ĐI THÔI)「ACOUSTIC VERSION」',
    description: 'Nếu bạn độc thân, thật tốt vì bạn tự do. Có rất nhiều người đang chờ để làm quen. Có một làn sương mỏng đang chờ ở đâu đó. Có một khoảnh khắc để học hỏi và yêu bản thân mình. Thế giới bao la rộng lớn đang chờ bạn khám phá. Cho đến một ngày nào đó khi bạn đủ mạnh mẽ để yêu bản thân mình đủ đề ôm lấy một ai đó, bạn sẽ giữ họ như bạn đã dành thời gian qua để yêu bản thân...'
  },
  {
    id: 'DtP2XNgnam4',
    title: '#EdSheeran PERFECT - ED SHEERAN - Fingerstyle Guitar Cover - by Vu Le',
    description: '"Perfect" - một tình khúc về tình yêu hoàn hảo. Qua những nốt nhạc fingerstyle, tôi muốn truyền tải câu chuyện về một tình yêu đẹp đẽ, thuần khiết. Khi âm nhạc là cầu nối của những trái tim, mỗi giai điệu đều mang theo một thông điệp yêu thương...'
  }
];
const HeroText = styled(motion.h1)(({ theme }) => ({
  fontSize: 'clamp(8rem, 5vw, 18rem)',
  fontWeight: 800,
  lineHeight: 0.8,
  letterSpacing: '-0.02em',
  margin: 0,
  textAlign: 'center',
  color: '#000',
  position: 'relative',
  textTransform: 'uppercase',
  zIndex: 3,
}));
export function YoutubeSection() {
  const [expandedCards, setExpandedCards] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const toggleDescription = (videoId: string) => {
    setExpandedCards(prev =>
      prev.includes(videoId)
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };


  return (
    <Box >
      <Header />
      <Box>
        <div className="section" >
          <Box
            sx={{
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 2,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Add motion here */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.4 }} // Only animate once when 40% visible
              style={{
                width: '100%',
              }}
            >
              <HeroText
               
              >
                GUITAR
              </HeroText>
            </motion.div>
          </Box>
        </div>
        {/* <MosaicScrollSection /> */}
        <Grid container spacing={4} sx={{
          m: 7}}>
          {videos.map((video, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={video.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <VideoCard>
                  <VideoWrapper>
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </VideoWrapper>

                  <ContentBox>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        lineHeight: 1.4,
                        mb: 2,
                        height: '2.8rem',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {video.title}
                    </Typography>

                    <DescriptionBox className={expandedCards.includes(video.id) ? 'expanded' : ''}>
                      {video.description}
                    </DescriptionBox>


                    <ReadMoreButton onClick={() => toggleDescription(video.id)}>
                      {/* <Iconify
                        icon={expandedCards.includes(video.id) ? "eva:chevron-up-fill" : "eva:chevron-down-fill"}
                        width={20}
                      /> */}
                      {expandedCards.includes(video.id) ? 'Thu gọn' : 'Xem thêm'}
                    </ReadMoreButton>
                  </ContentBox>
                </VideoCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
} 