import type { Breakpoint } from '@mui/material/styles';

import { merge } from 'es-toolkit';

import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

import { publicLayoutVars } from './css-vars';
import { MainSection } from '../core/main-section';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
import { PublicHeader } from './components/public-header';

import type { MainSectionProps } from '../core/main-section';
import type { HeaderSectionProps } from '../core/header-section';
import type { LayoutSectionProps } from '../core/layout-section';
import DotGridCanvas from 'src/components/ui/DotGridCanvas';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type PublicLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    main?: MainSectionProps;
  };
};

export function PublicLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'xl',
}: PublicLayoutProps) {
  const theme = useTheme();

  const renderHeader = () => {
    const headerSlotProps: HeaderSectionProps['slotProps'] = {
      container: {
        maxWidth: false,
      },
    };

    const headerSlots: HeaderSectionProps['slots'] = {
      leftArea: <PublicHeader />,
    };

    return (
      <HeaderSection
        disableElevation
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const renderFooter = () => (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        color: '#111',
        pt: { xs: 12, md: 16 },
        pb: { xs: 8, md: 12 },
        px: { xs: 3, md: 10 },
        minHeight: '80vh',
      }}
    >
      {/* Main Footer Content - 2 Columns */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 8, md: 16 },
          maxWidth: 1600,
          mx: 'auto',
          mb: 12,
        }}
      >
        {/* Left Column */}
        <Box>
          {/* Status Section */}
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                color: '#111',
                textTransform: 'lowercase',
                mb: 3,
                letterSpacing: '-0.02em',
              }}
            >
              status
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 18, md: 20, lg: 22 },
                color: '#444',
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              Senior Digital Designer elevating the e-commerce experience at Bang & Olufsen and based in Copenhagen, Denmark.
            </Typography>
          </Box>

          {/* Album Section */}
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                color: '#111',
                textTransform: 'lowercase',
                mb: 3,
                letterSpacing: '-0.02em',
              }}
            >
              album
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 18, md: 20, lg: 22 },
                color: '#444',
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              Currently have Hurry Up Tomorrow - The Weeknd on repeat.
            </Typography>
          </Box>

          {/* Sitemap Section */}
          <Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                color: '#111',
                textTransform: 'lowercase',
                mb: 3,
                letterSpacing: '-0.02em',
              }}
            >
              sitemap
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {['home', 'work', 'about', 'CV', 'playlist', 'course'].map((item) => (
                <Typography
                  key={item}
                  component="a"
                  href={`/${item.toLowerCase()}`}
                  sx={{
                    fontSize: { xs: 18, md: 20, lg: 22 },
                    color: '#444',
                    textDecoration: 'underline',
                    textDecorationColor: '#ccc',
                    textDecorationThickness: '1px',
                    fontWeight: 400,
                    '&:hover': {
                      color: '#111',
                      textDecorationColor: '#111',
                    },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Right Column */}
        <Box>
          {/* Speciality Section */}
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                color: '#111',
                textTransform: 'lowercase',
                mb: 3,
                letterSpacing: '-0.02em',
              }}
            >
              speciality
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 18, md: 20, lg: 22 },
                color: '#444',
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              Designing engaging web design with a strong focus on typography. Educating designers on design systems. Developing with Webflow and putting things in motion with GSAP.
            </Typography>
          </Box>

          {/* Credits Section */}
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                color: '#111',
                textTransform: 'lowercase',
                mb: 3,
                letterSpacing: '-0.02em',
              }}
            >
              credits
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 18, md: 20, lg: 22 },
                color: '#444',
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              This website utilises Lausanne, 600 as the primary typeface and Times New Roman, 400 for secondary tidbits. Showreel video by Ambedo Media. Photography by Obsesd Studio. Designed in Figma and built with Webflow.
            </Typography>
          </Box>

          {/* Social Section */}
          <Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                color: '#111',
                textTransform: 'lowercase',
                mb: 3,
                letterSpacing: '-0.02em',
              }}
            >
              social
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {['savee', 'linkedin', 'instagram', 'email'].map((item) => (
                <Typography
                  key={item}
                  component="a"
                  href={`https://${item}.com`}
                  target="_blank"
                  rel="noopener"
                  sx={{
                    fontSize: { xs: 18, md: 20, lg: 22 },
                    color: '#444',
                    textDecoration: 'underline',
                    textDecorationColor: '#ccc',
                    textDecorationThickness: '1px',
                    fontWeight: 400,
                    '&:hover': {
                      color: '#111',
                      textDecorationColor: '#111',
                    },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Large Name at Bottom */}
      <Box sx={{ textAlign: 'center', mt: 12 }}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '4rem', md: '8rem', lg: '17rem' },
            color: '#111',
            textTransform: 'lowercase',
            letterSpacing: '0.2em',
            lineHeight: 0.8,
            fontFamily: 'inherit',
          }}
        >
          Vulee
        </Typography>
      </Box>

      {/* Copyright */}
      <Box
        sx={{
          textAlign: 'center',
          mt: 8,
          pt: 6,
          borderTop: '1px solid #e0e0e0',
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            color: '#666',
            fontWeight: 500,
          }}
        >
          Vulee 2025.
        </Typography>
      </Box>
    </Box>
  );

  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>;

  return (
    <DotGridCanvas>
    <LayoutSection
      /** **************************************
       * @Header
       *************************************** */
      // headerSection={renderHeader()}
      /** **************************************
       * @Footer
       *************************************** */
      // footerSection={renderFooter()}
      /** **************************************
       * @Styles
       *************************************** */
      cssVars={{ ...publicLayoutVars(theme), ...cssVars }}
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {renderMain()}
    </LayoutSection>
    </DotGridCanvas>

  );
} 