import React, { useEffect, useState, useRef, useCallback, useLayoutEffect, useMemo, lazy } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Slide,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  LinearProgress,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { VULEE_ASCII_ART } from './ascii-art';
import { videos } from './youtube-section';
import { projects } from './projects-section';
import { blogPosts } from 'src/data/blog-posts';

// const GameTab = lazy(() => import('./GameTab'));

const QuoteWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  }
}));

const Terminal = styled(Box)(({ theme }) => ({
  background: 'rgba(17, 21, 28, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  width: '100%',
  height: '600px',
  maxWidth: '900px',
  margin: '0 auto',
  // position: 'relative',
  overflow: 'hidden',
  border: '1px solid rgba(99, 116, 144, 0.15)',
  boxShadow: `
    0 0 0 1px rgba(152, 195, 121, 0.05),
    0 24px 40px -12px rgba(0, 0, 0, 0.4),
    0 0 60px -12px rgba(152, 195, 121, 0.1)
  `,
  [theme.breakpoints.down('sm')]: {
    height: '100%',
    borderRadius: 0,
  }
}));

const TerminalHeader = styled(Box)({
  height: '44px',
  background: 'rgba(22, 27, 34, 0.8)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(99, 116, 144, 0.15)',
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  position: 'relative'
});

const TerminalControls = styled(Box)({
  display: 'flex',
  gap: '8px',
  '& span': {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  }
});

const TerminalTitle = styled(Box)({
  width: '100%',
  textAlign: 'center',
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '14px',
  fontFamily: 'Consolas, monospace',
  left: 0,
  lineHeight: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  '& .separator': {
    color: '#666',
    margin: '0 4px',
  }
});

const TerminalContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "calc(100% - 44px)",
  overflowY: "auto",
  overflowX: "hidden",
  scrollBehavior: "auto",
  overscrollBehavior: "contain",
  WebkitOverflowScrolling: "touch",
  msOverflowStyle: "-ms-autohiding-scrollbar",
  scrollbarWidth: "thin",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "3px",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.2)",
    },
  },
  paddingBottom: theme.spacing(10),
  position: "relative",
  display: "flex",
  flexDirection: "column",
}));

const CommandInput = styled('input')(({ theme }) => ({
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: '#A6E3A1',
  fontFamily: 'Consolas, monospace',
  fontSize: '1rem',
  width: '100%',
  padding: '4px 0',
  caretColor: '#A6E3A1',
  '&::placeholder': {
    color: 'rgba(166, 227, 161, 0.5)',
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  }
}));

const OutputLine = styled(Typography)<{ type?: 'error' | 'success' | 'info' | 'quote' | 'command' }>(({ theme, type }) => ({
  color: type === 'error' ? '#FF6B6B' :
    type === 'success' ? '#98C379' :
      type === 'info' ? '#61AFEF' :
        type === 'quote' ? '#D19A66' :
          type === 'command' ? '#E5C07B' : '#ABB2BF',
  fontFamily: 'Consolas, monospace',
  fontSize: '1.1rem',
  lineHeight: 1.6,
  marginBottom: '8px',
  padding: theme.spacing(0.5, 0),
  transition: 'all 0.3s ease',
  whiteSpace: 'pre-line',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  '& a': {
    color: '#61AFEF',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    '&:hover': {
      color: '#A6E3A1',
      textDecoration: 'underline',
    }
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    lineHeight: 1.4,
    marginBottom: '4px',
  }
}));

const VirtualKeyboard = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '12px',
    background: '#1A1B26',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  }
}));

const KeyboardRow = styled(Box)({
  display: 'flex',
  gap: '6px',
  justifyContent: 'center'
});

const KeyButton = styled(Box)({
  padding: '12px',
  minWidth: '40px',
  textAlign: 'center',
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '8px',
  color: '#A6E3A1',
  fontSize: '14px',
  cursor: 'pointer',
  userSelect: 'none',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
  },
  '&:active': {
    transform: 'scale(0.95)',
    background: 'rgba(255, 255, 255, 0.15)',
  },
  '&.wide': {
    minWidth: '80px',
  },
  '&.command': {
    background: 'rgba(166, 227, 161, 0.1)',
    color: '#A6E3A1',
  }
});

const TerminalButton = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    bottom: 24,
    right: 24,
    width: 40,
    height: 40,
    borderRadius: '12px',
    background: 'rgba(30, 30, 46, 0.6)',
    backdropFilter: 'blur(8px)',
    cursor: 'pointer',
    zIndex: 1000,
    transition: 'all 0.2s ease',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '18px',
    '&:hover': {
      background: 'rgba(30, 30, 46, 0.8)',
      transform: 'translateY(-2px)',
    },
    '&:active': {
      transform: 'translateY(0)',
    }
  }
}));

const TerminalModal = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#0A0A0A',
    zIndex: 1100,
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.3s ease',
    '&.open': {
      opacity: 1,
      visibility: 'visible',
    }
  }
}));

const CloseButton = styled(Box)({
  position: 'absolute',
  top: 20,
  right: 20,
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.1)',
  color: '#fff',
  cursor: 'pointer',
  zIndex: 1200,
  '&:hover': {
    background: 'rgba(255,255,255,0.2)',
  }
});

const TerminalPrompt = styled(Box)({
  color: '#A6E3A1',
  fontFamily: 'Consolas, monospace',
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  '& .user': {
    color: '#A6E3A1',
  },
  '& .at': {
    color: '#ABB2BF',
  },
  '& .host': {
    color: '#61AFEF',
  }
});

interface TerminalLine {
  content: string;
  type?: 'error' | 'success' | 'info' | 'quote' | 'command';
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink: string;
  githubLink: string;
  category: string;
  videoUrl?: string;
}

interface Video {
  id: string;
  title: string;
  description: string;
}

const useTerminalScroll = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const endElementRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (terminalRef.current) {
          const scrollHeight = terminalRef.current.scrollHeight;
          terminalRef.current.scrollTop = scrollHeight;

          if (endElementRef.current) {
            endElementRef.current.scrollIntoView({ block: 'end', behavior: 'auto' });
          }
        }
      }, 10);
    }
  }, []);

  useEffect(() => () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
  }, []);
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    if (endElementRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) {
            scrollToBottom();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(endElementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [scrollToBottom]);

  useEffect(() => {
    let observer: MutationObserver | null = null;

    if (terminalRef.current) {
      observer = new MutationObserver(() => {
        scrollToBottom();
      });

      observer.observe(terminalRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [scrollToBottom]);

  return { terminalRef, endElementRef, scrollToBottom };
};

type CommandKey = 'help' | 'about' | 'social' | 'music' | 'time' | 'clear' | 'reveal' | 'logo' | 'projects' | 'blog' | 'skills' | 'youtube' | 'game';

const Transition = React.forwardRef<unknown, TransitionProps & {
  children: React.ReactElement;
}>((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export function QuoteSection() {
  const [command, setCommand] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    {
      content: `
     <div style="color: #98C379; font-family: monospace; font-size: 12px; line-height: 1.2; margin: 15px auto; text-align: center;">
  👋 XIN CHÀO! BẠN VỪA KHÁM PHÁ ĐƯỢC TERMINAL BÍ MẬT!

  🚀 Đây là nơi bạn có thể tương tác và tìm hiểu thêm về mình theo cách thú vị
  💻 Hãy thử gõ "help" hoặc nhập số "0" để xem những điều bạn có thể khám phá

  <div style="color: #98C379; font-family: monospace; font-size: 8px; line-height: 1.2; margin: 15px auto; padding: 10px; text-align: center; background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(152, 195, 121, 0.2); box-shadow: 0 0 10px rgba(152, 195, 121, 0.1); max-width: 400px;">
    <pre style="margin: 0; white-space: pre; display: inline-block; text-align: left;">
      ${VULEE_ASCII_ART}
    </pre>
  </div>
</div>

`, type: 'info'
    }
  ]);
  const [isTypingQuote, setIsTypingQuote] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [gameLoading, setGameLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const { terminalRef, endElementRef, scrollToBottom } = useTerminalScroll();

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 10);

    return () => clearTimeout(timer);
  }, [terminalHistory, scrollToBottom]);

  useEffect(() => {
    const container = terminalRef.current;
    if (!container) return;

    const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 10;

    if (isAtBottom) {
      requestAnimationFrame(() => {
        if (container) {
          container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
        }
      });
    }
  }, [terminalRef]);

  const LiveTime = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(timer);
    }, []);

    return (
      <span style={{ color: '#98C379' }}>
        {time.toLocaleTimeString('vi-VN')}
      </span>
    );
  };

  const lifeQuote = useMemo(() => ({
    past: "Quá khứ chỉ là giấc mơ",
    future: "Tương lai là một viễn ảnh",
    present: "Sống hết mình trong hiện tại là làm đẹp mỗi ngày qua",
    hope: "Và biến mỗi ngày mai thành ngày chứa chan hy vọng..."
  }), []);

  const commands = useMemo<Record<CommandKey, string>>(() => ({
    help: `
╭─ 💻 LỆNH TERMINAL ────────────────────────╮
  
  [1] 🚀 projects - Các dự án nổi bật
  [2] 🎮 game - Chơi game học nhạc
  [3] 📝 blog - Bài viết mới nhất
  [4] 👤 about - Thông tin về Vũ Lê
  [5] 🌐 social - Các kênh mạng xã hội
  [6] 🎵 music - Thông tin về âm nhạc
  [7] 🎨 logo - Logo Vũ Lê


╰───────────────────────────────────╯

💡 Gõ lệnh hoặc nhập số và Enter để thực hiện
`,

    about: `
╭─ 📝 THÔNG TIN CÁ NHÂN ────────────────────────╮

  📝 Tên      │  Lê Bùi Thanh Vũ, mọi người hay gọi mình là Vũ || Vũ Lê || Dũ 
  💼 Vai trò  │  Developer, Musician
  📏 Chiều cao│  1m92
  ⚖️  Cân nặng │  98kg
  ❤️ Sở thích │  Công nghệ, Âm nhạc, Sáng tạo

╰──────────────────────────────────╯
`,

    social: `
╭─ 🔗 KÊNH MẠNG XÃ HỘI ──────────────────────────────────╮

  📺 YouTube  │  <a href="https://youtube.com/@Vuleebithanh" target="_blank">youtube.com/@Vuleebithanh</a>
  💻 GitHub   │  <a href="https://github.com/Vulee-92" target="_blank">github.com/Vulee-92</a>
  📱 Facebook │  <a href="https://facebook.com/vulee1m92" target="_blank">facebook.com/vulee1m92</a>

╰─────────────────────────────────────────────────╯
`,

    music: `
╭─ 🎵 HOẠT ĐỘNG ÂM NHẠC ─────────────────╮  
🎸 Giảng dạy │ Dạy guitar tại Hymns Center  
🎼 Sáng tạo │ Chơi Fingerstyle guitar nhạc thánh ca & bài hát yêu thích  
╰───────────────────────────────────────╯  
`,

    time: `
╭─ THỜI GIAN HIỆN TẠI ─────────────────────╮

  📅 ${new Date().toLocaleString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })}

╰───────────────────────────────────╯
`,
    reveal: '',
    clear: '',
    logo: `<div class="logo-container">
<div class="logo-title">✨ Logo Vũ Lê ✨</div>
<pre class="logo-art">${VULEE_ASCII_ART}</pre>
<div class="logo-footer">Thiết kế bởi Vũ Lê © 2023</div>
</div>`,
    projects: `
<div class="section-container">
  <h2 style="color: #61AFEF; text-align: center; margin-bottom: 15px;">🚀 Các Dự Án Nổi Bật</h2>
  
  ${projects.map((project: Project, index: number) => `
  <div style="margin-bottom: 20px; padding: 15px; background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(97, 175, 239, 0.2);">
    <h3 style="color: #E5C07B; margin: 0 0 10px 0;">${index + 1}. ${project.title}</h3>
    <p style="margin: 0 0 10px 0;">${project.description}</p>
    <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 10px;">
      ${project.technologies.map((tech: string) => `<span style="background: rgba(152, 195, 121, 0.2); padding: 3px 8px; border-radius: 4px; font-size: 12px;">${tech}</span>`).join('')}
    </div>
    <div style="margin-top: 10px;">
      ${project.demoLink !== '#' ? `<a href="${project.demoLink}" target="_blank" style="color: #61AFEF; text-decoration: none; margin-right: 15px;">🔗 Demo</a>` : ''}
      ${project.githubLink !== '#' ? `<a href="${project.githubLink}" target="_blank" style="color: #61AFEF; text-decoration: none;">📁 GitHub</a>` : ''}
    </div>
  </div>
  `).join('')}
</div>
    `,
    blog: `
<div class="section-container">
  <h2 style="color: #61AFEF; text-align: center; margin-bottom: 15px;">📝 Bài Viết Mới Nhất</h2>
  
  ${blogPosts.map((post, index: number) => `
  <div style="margin-bottom: 20px; padding: 15px; background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(97, 175, 239, 0.2);">
    <h3 style="color: #E5C07B; margin: 0 0 10px 0;">${index + 1}. ${post.title}</h3>
    <p style="margin: 0 0 10px 0;">${post.description}</p>
    <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 12px;">
      <span>📅 ${post.date}</span>
      <span>⏱️ ${post.readTime} phút đọc</span>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 10px;">
      ${post.tags.map((tag: string) => `<span style="background: rgba(152, 195, 121, 0.2); padding: 3px 8px; border-radius: 4px; font-size: 12px;">${tag}</span>`).join('')}
    </div>
  </div>
  `).join('')}
</div>
    `,
    skills: `
<div class="section-container">
  <h2 style="color: #61AFEF; text-align: center; margin-bottom: 15px;">🛠️ Kỹ Năng Chuyên Môn</h2>
  
  <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
    <div style="padding: 15px; background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(97, 175, 239, 0.2);">
      <h3 style="color: #E5C07B; margin: 0 0 10px 0;">Frontend Development</h3>
      <p style="margin: 0 0 10px 0;">Phát triển giao diện người dùng hiện đại và responsive</p>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
        <span style="background: rgba(152, 195, 121, 0.2); padding: 5px 10px; border-radius: 4px;">HTML/CSS</span>
        <span style="background: rgba(152, 195, 121, 0.2); padding: 5px 10px; border-radius: 4px;">JavaScript</span>
        <span style="background: rgba(152, 195, 121, 0.2); padding: 5px 10px; border-radius: 4px;">ReactJS</span>
        <span style="background: rgba(152, 195, 121, 0.2); padding: 5px 10px; border-radius: 4px;">Ant Design</span>
        <span style="background: rgba(152, 195, 121, 0.2); padding: 5px 10px; border-radius: 4px;">Bootstrap</span>
        <span style="background: rgba(152, 195, 121, 0.2); padding: 5px 10px; border-radius: 4px;">Tailwind CSS</span>
      </div>
    </div>
    
    <div style="padding: 15px; background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(97, 175, 239, 0.2);">
      <h3 style="color: #E5C07B; margin: 0 0 10px 0;">Backend Development</h3>
      <p style="margin: 0 0 10px 0;">Xây dựng server và quản lý cơ sở dữ liệu</p>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
        <span style="background: rgba(152, 195, 121, 0.2); padding: 5px 10px; border-radius: 4px;">NodeJS</span>
        <span style="background: rgba(152, 195, 121, 0.2); padding: 5px 10px; border-radius: 4px;">ExpressJS</span>
        <span style="background: rgba(152, 195, 121, 0.2); padding: 5px 10px; border-radius: 4px;">MongoDB</span>
        <span style="background: rgba(152, 195, 121, 0.2); padding: 5px 10px; border-radius: 4px;">PHP</span>
        <span style="background: rgba(152, 195, 121, 0.2); padding: 5px 10px; border-radius: 4px;">WordPress</span>
        <span style="background: rgba(152, 195, 121, 0.2); padding: 5px 10px; border-radius: 4px;">Docker</span>
      </div>
    </div>
  </div>
</div>
    `,
    youtube: `
<div class="section-container">
  <h2 style="color: #61AFEF; text-align: center; margin-bottom: 15px;">🎵 Các Video Âm Nhạc</h2>
  
  ${videos.map((video: Video, index: number) => `
  <div style="margin-bottom: 20px; padding: 15px; background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(97, 175, 239, 0.2);">
    <h3 style="color: #E5C07B; margin: 0 0 10px 0;">${index + 1}. ${video.title}</h3>
    <p style="margin: 0 0 10px 0;">${video.description.substring(0, 100)}...</p>
    <div style="margin-top: 10px;">
      <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" style="color: #E06C75; text-decoration: none;">
        🎬 Xem trên YouTube
      </a>
    </div>
  </div>
  `).join('')}
</div>
    `,
    game: '',
  }), []);

  const welcomeMessage = useMemo(() => `
╭─ 💻 WELCOME ────────────────────────────────────╮

  👋 XIN CHÀO! BẠN VỪA KHÁM PHÁ TERMINAL BÍ MẬT!

  🚀 Đây là nơi bạn có thể tương tác và tìm hiểu 
     thêm về mình theo cách thú vị

  💻 Gõ "help" hoặc nhập số "0" để khám phá nhé!

╰────────────────────────────────────────────────╯
`, []);

  const commandMap = useMemo<Record<string, CommandKey>>(() => ({
    '0': 'help',
    '1': 'projects',
    '2': 'game',
    '3': 'blog',
    '4': 'about',
    '5': 'social',
    '6': 'music',
    '7': 'logo',

    'help': 'help',
    'about': 'about',
    'social': 'social',
    'music': 'music',
    'logo': 'logo',
    'projects': 'projects',
    'blog': 'blog',
    'skills': 'skills',
    'youtube': 'youtube',
    'game': 'game',
    'music-game': 'game',
    'play': 'game',
  }), []);

  const typeOutput = useCallback(async (content: string, type: 'error' | 'success' | 'info' = 'success') => {
    setIsTypingQuote(true);
    setShowInput(false);

    setTerminalHistory(prev => [...prev, { content: '', type }]);

    const newLineIndex = terminalHistory.length;

    const chars = content.split('');
    const chunkSize = 5;

    const processChunk = async (index: number) => {
      if (index >= chars.length) {
        await new Promise(resolve => setTimeout(resolve, 50));
        scrollToBottom();
        setIsTypingQuote(false);
        setShowInput(true);
        return;
      }

      const endIndex = Math.min(index + chunkSize, chars.length);
      const chunk = chars.slice(index, endIndex).join('');

      setTerminalHistory(prev => {
        const updated = [...prev];
        if (updated[newLineIndex]) {
          updated[newLineIndex] = {
            ...updated[newLineIndex],
            content: updated[newLineIndex].content + chunk
          };
        }
        return updated;
      });

      if (index % (chunkSize * 5) === 0) {
        setTimeout(scrollToBottom, 5);
      }

      setTimeout(() => processChunk(endIndex), 1);
    };

    await processChunk(0);
  }, [terminalHistory.length, scrollToBottom]);

  const typeQuote = useCallback(async () => {
    setIsTypingQuote(true);
    setShowInput(false);

    setTerminalHistory(prev => [...prev, { content: '', type: 'quote' }]);

    const newLineIndex = terminalHistory.length;

    const outputs = [
      { icon: '🔮', key: 'past' },
      { icon: '🚀', key: 'future' },
      { icon: '🌟', key: 'present' },
      { icon: '💫', key: 'hope' }
    ];

    const processOutput = async (index: number) => {
      if (index >= outputs.length) {
        setIsTypingQuote(false);
        setShowInput(true);
        return;
      }

      const output = outputs[index];

      if (index > 0) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      setTerminalHistory(prev => {
        const updated = [...prev];
        if (updated[newLineIndex]) {
          const currentContent = updated[newLineIndex].content;
          updated[newLineIndex] = {
            ...updated[newLineIndex],
            content: `${currentContent}${index > 0 ? '\n\n' : ''}${output.icon} <strong>${lifeQuote[output.key as keyof typeof lifeQuote]}</strong>`
          };
        }
        return updated;
      });

      await new Promise(resolve => setTimeout(resolve, 100));
      scrollToBottom();

      processOutput(index + 1);
    };

    await processOutput(0);
  }, [lifeQuote, scrollToBottom, terminalHistory.length]);

  const handleStartGame = useMemo(() => async () => {
    setGameLoading(true);
    setLoadingProgress(0);

    // Đơn giản hóa loading message và progress
    const loadingStates = [
      { progress: 0, message: 'Starting game...' },
      { progress: 25, message: 'Loading audio engine...' },
      { progress: 50, message: 'Preparing game assets...' },
      { progress: 75, message: 'Almost ready...' },
      { progress: 100, message: 'Ready to play!' }
    ];

    // Sử dụng reduce với async/await để xử lý tuần tự
    await loadingStates.reduce(async (promise, state) => {
      // Đợi promise trước đó hoàn thành
      await promise;

      // Cập nhật progress
      setLoadingProgress(state.progress);

      // Delay 600ms cho mỗi state
      return new Promise(resolve => setTimeout(resolve, 600));
    }, Promise.resolve());

    // Thêm delay nhỏ ở cuối
    await new Promise(resolve => setTimeout(resolve, 500));
    setGameLoading(false);
    setIsGameModalOpen(true);
  }, [setGameLoading, setLoadingProgress, setIsGameModalOpen]);

  const handleCommand = useCallback(async (cmd: string) => {
    const normalizedCmd = cmd.toLowerCase().trim();

    setTerminalHistory(prev => [...prev, {
      content: `guest@portfolio:~$ ${cmd}`,
      type: 'command'
    }]);

    setCommand('');
    setShowInput(false);

    await new Promise(resolve => setTimeout(resolve, 10));
    scrollToBottom();

    const mappedCmd = (commandMap as Record<string, CommandKey | undefined>)[normalizedCmd] || 'unknown';

    switch (mappedCmd) {
      case 'reveal':
        await typeQuote();
        break;
      case 'clear':
        setTerminalHistory([{ content: welcomeMessage, type: 'info' }]);
        await new Promise(resolve => setTimeout(resolve, 50));
        scrollToBottom();
        setShowInput(true);
        break;
      case 'help':
      case 'about':
      case 'time':
      case 'social':
      case 'music':
      case 'logo':
      case 'projects':
      case 'blog':
      case 'skills':
      case 'youtube':
        await typeOutput(commands[mappedCmd], 'success');
        break;
      case 'game':
        await typeOutput(`
╭─ 🎮 MUSIC LEARNING GAME ─────────────────╮
  Đang khởi động game học nhạc...
  Vui lòng đợi trong giây lát...
╰────────────────────────────────────────────╯
`, 'info');
        handleStartGame();
        break;
      default:
        await typeOutput(`
❌ Không tìm thấy lệnh: "${cmd}"

💡 Gõ "help" hoặc nhập số "0" để xem danh sách các lệnh có sẵn.
`, 'error');
    }
  }, [commands, commandMap, scrollToBottom, typeOutput, typeQuote, welcomeMessage, handleStartGame]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isTypingQuote) {
      handleCommand(command);
      setCommand('');
    }
  }, [command, handleCommand, isTypingQuote]);

  const handleVirtualKeyPress = useCallback((key: string) => {
    if (!isTypingQuote) {
      if (key === 'Enter') {
        handleCommand(command);
        setCommand('');
      } else if (key === 'Clear') {
        setCommand('');
      } else {
        setCommand(prev => prev + key);
      }
    }
  }, [command, handleCommand, isTypingQuote]);

  const confirmCloseGame = useMemo(() => async () => {
    setIsGameModalOpen(false);
    setShowExitConfirm(false);

    await typeOutput(`
╭─ 🎮 KẾT THÚC GAME ────────────────╮
  Cảm ơn bạn đã chơi game học nhạc!
  Hẹn gặp lại bạn trong lần sau.
╰────────────────────────────────────╯
`, 'success');
  }, [typeOutput]);

  const handleCloseGame = useCallback(() => {
    setShowExitConfirm(true);
  }, []);

  const handleEsc = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && isGameModalOpen) {
      handleCloseGame();
    }
  }, [isGameModalOpen, handleCloseGame]);

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [handleEsc]);

  return (
    <>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <QuoteWrapper>
          <Terminal>
            <TerminalHeader>
              <TerminalControls>
                <span style={{ background: '#FF5F56' }} />
                <span style={{ background: '#FFBD2E' }} />
                <span style={{ background: '#27C93F' }} />
              </TerminalControls>
              <TerminalTitle>
                <span style={{ color: '#98C379' }}>~/portfolio</span>
                <span className="separator">|</span>
                <LiveTime />
              </TerminalTitle>
            </TerminalHeader>
            <TerminalContent ref={terminalRef}>
              {terminalHistory.map((line, index) => (
                <OutputLine
                  key={index}
                  type={line.type as 'error' | 'success' | 'info' | 'quote' | 'command'}
                  dangerouslySetInnerHTML={{ __html: line.content }}
                />
              ))}
              {showInput && (
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  padding: '8px 12px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '4px',
                  marginTop: '16px',
                  '&:focus-within': {
                    background: 'rgba(0, 0, 0, 0.3)',
                  }
                }}>
                  <TerminalPrompt>
                    <span style={{ whiteSpace: 'nowrap' }}>
                      <span className="user">guest</span>
                      <span className="at">@</span>
                      <span className="host">portfolio</span>
                      <span className="at">:~$</span>
                    </span>
                  </TerminalPrompt>
                  <CommandInput
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isTypingQuote ? 'Typing quote...' : 'Type a command...'}
                    disabled={isTypingQuote}
                    spellCheck="false"
                    autoComplete="off"
                    autoCapitalize="off"
                  />
                </Box>
              )}
              <div ref={endElementRef} id="terminal-end" style={{ height: '1px', width: '100%' }} />
            </TerminalContent>
            <VirtualKeyboard>
              <KeyboardRow>
                {['help', 'reveal', 'about', 'clear'].map(cmd => (
                  <KeyButton
                    key={cmd}
                    className="command"
                    onClick={() => handleVirtualKeyPress(cmd)}
                  >
                    {cmd}
                  </KeyButton>
                ))}
              </KeyboardRow>
              <KeyboardRow>
                {['time', 'social', 'music', 'logo'].map(cmd => (
                  <KeyButton
                    key={cmd}
                    className="command"
                    onClick={() => handleVirtualKeyPress(cmd)}
                  >
                    {cmd}
                  </KeyButton>
                ))}
              </KeyboardRow>
              <KeyboardRow>
                {['projects', 'blog', 'skills', 'youtube'].map(cmd => (
                  <KeyButton
                    key={cmd}
                    className="command"
                    onClick={() => handleVirtualKeyPress(cmd)}
                  >
                    {cmd}
                  </KeyButton>
                ))}
              </KeyboardRow>
              <KeyboardRow>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                  <KeyButton
                    key={num}
                    onClick={() => handleVirtualKeyPress(num)}
                  >
                    {num}
                  </KeyButton>
                ))}
              </KeyboardRow>
              <KeyboardRow>
                <KeyButton
                  className="wide"
                  onClick={() => handleVirtualKeyPress('0')}
                >
                  0
                </KeyButton>
                <KeyButton
                  className="wide command"
                  onClick={() => handleVirtualKeyPress('Enter')}
                >
                  Enter ↵
                </KeyButton>
                <KeyButton
                  className="wide command"
                  onClick={() => handleVirtualKeyPress('Clear')}
                >
                  ⌫ Clear
                </KeyButton>
              </KeyboardRow>
            </VirtualKeyboard>
          </Terminal>
        </QuoteWrapper>
      </Box>

      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <TerminalButton onClick={() => setIsModalOpen(true)}>
          <span role="img" aria-label="terminal" style={{ opacity: 0.8 }}>⌨️</span>
        </TerminalButton>

        <TerminalModal className={isModalOpen ? 'open' : ''}>
          <CloseButton onClick={() => setIsModalOpen(false)}>
            ✕
          </CloseButton>
          <Terminal>
            <TerminalHeader>
              <TerminalControls>
                <span style={{ background: '#FF5F56' }} />
                <span style={{ background: '#FFBD2E' }} />
                <span style={{ background: '#27C93F' }} />
              </TerminalControls>
              <TerminalTitle>
                <span style={{ color: '#98C379' }}>~/portfolio</span>
                <span className="separator">|</span>
                <LiveTime />
              </TerminalTitle>
            </TerminalHeader>
            <TerminalContent ref={terminalRef}>
              {terminalHistory.map((line, index) => (
                <OutputLine
                  key={index}
                  type={line.type as 'error' | 'success' | 'info' | 'quote' | 'command'}
                  dangerouslySetInnerHTML={{ __html: line.content }}
                />
              ))}
              {showInput && (
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  padding: '8px 12px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '4px',
                  marginTop: '16px',
                  '&:focus-within': {
                    background: 'rgba(0, 0, 0, 0.3)',
                  }
                }}>
                  <TerminalPrompt>
                    <span style={{ whiteSpace: 'nowrap' }}>
                      <span className="user">guest</span>
                      <span className="at">@</span>
                      <span className="host">portfolio</span>
                      <span className="at">:~$</span>
                    </span>
                  </TerminalPrompt>
                  <CommandInput
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isTypingQuote ? 'Typing quote...' : 'Type a command...'}
                    disabled={isTypingQuote}
                    autoFocus
                    spellCheck="false"
                  />
                </Box>
              )}
              <div ref={endElementRef} id="terminal-end" style={{ height: '1px', width: '100%' }} />
            </TerminalContent>
            <VirtualKeyboard>
              <KeyboardRow>
                {['help', 'reveal', 'about', 'clear'].map(cmd => (
                  <KeyButton
                    key={cmd}
                    className="command"
                    onClick={() => handleVirtualKeyPress(cmd)}
                  >
                    {cmd}
                  </KeyButton>
                ))}
              </KeyboardRow>
              <KeyboardRow>
                {['time', 'social', 'music', 'logo'].map(cmd => (
                  <KeyButton
                    key={cmd}
                    className="command"
                    onClick={() => handleVirtualKeyPress(cmd)}
                  >
                    {cmd}
                  </KeyButton>
                ))}
              </KeyboardRow>
              <KeyboardRow>
                {['projects', 'blog', 'skills', 'youtube'].map(cmd => (
                  <KeyButton
                    key={cmd}
                    className="command"
                    onClick={() => handleVirtualKeyPress(cmd)}
                  >
                    {cmd}
                  </KeyButton>
                ))}
              </KeyboardRow>
              <KeyboardRow>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                  <KeyButton
                    key={num}
                    onClick={() => handleVirtualKeyPress(num)}
                  >
                    {num}
                  </KeyButton>
                ))}
              </KeyboardRow>
              <KeyboardRow>
                <KeyButton
                  className="wide"
                  onClick={() => handleVirtualKeyPress('0')}
                >
                  0
                </KeyButton>
                <KeyButton
                  className="wide command"
                  onClick={() => handleVirtualKeyPress('Enter')}
                >
                  Enter ↵
                </KeyButton>
                <KeyButton
                  className="wide command"
                  onClick={() => handleVirtualKeyPress('Clear')}
                >
                  ⌫ Clear
                </KeyButton>
              </KeyboardRow>
            </VirtualKeyboard>
          </Terminal>
        </TerminalModal>
      </Box>

      <Dialog
        fullScreen
        open={isGameModalOpen}
        onClose={handleCloseGame}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', bgcolor: 'background.default' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseGame}
              aria-label="close"
            >
              {/* <Iconify icon="eva:close-fill" /> */}
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Music Learning Game
            </Typography>
            <Button
              color="inherit"
              sx={{ backgroundColor: '#000', color: '#fff' }}
              onClick={handleCloseGame}
              // startIcon={<Iconify icon="eva:close-circle-fill" />}
            >
              Thoát Game
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{
          height: '100%',
          overflow: 'auto',
          bgcolor: 'background.default',
          p: { xs: 1, sm: 3 }
        }}>
          {/* <GameTab /> */}
        </Box>

        <Dialog
          open={showExitConfirm}
          onClose={() => setShowExitConfirm(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bạn có chắc chắn muốn thoát game? Tiến trình chơi sẽ không được lưu lại.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowExitConfirm(false)} color="primary">
              Tiếp tục chơi
            </Button>
            <Button onClick={confirmCloseGame} color="error" autoFocus>
              Thoát game
            </Button>
          </DialogActions>
        </Dialog>
      </Dialog>

      {gameLoading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <Box sx={{ width: '300px', mb: 3 }}>
            <LinearProgress
              variant="determinate"
              value={loadingProgress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(255,255,255,0.1)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  backgroundColor: '#A6E3A1',
                }
              }}
            />
          </Box>
          <Typography
            sx={{
              color: '#A6E3A1',
              fontFamily: 'monospace',
              fontSize: '1rem',
              mt: 2
            }}
          >
            {loadingProgress < 100 ? 'Loading game...' : 'Starting game...'}
          </Typography>
        </Box>
      )}
    </>
  );
} 