import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { PublicContent } from 'src/layouts/public';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <PublicContent maxWidth="xl">
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 8, md: 12 },
          bgcolor: 'primary.main',
          color: 'white',
          borderRadius: 2,
          mb: 6,
        }}
      >
        <Typography variant="h2" sx={{ mb: 2 }}>
          Welcome to Our Platform
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, opacity: 0.8 }}>
          Discover amazing features and services
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
        >
          Get Started
        </Button>
      </Box>

      {/* Features Section */}
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        Our Features
      </Typography>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Feature 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Feature 2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Feature 3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* About Section */}
      <Box sx={{ bgcolor: 'grey.50', p: 4, borderRadius: 2 }}>
        <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
          About Us
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
      </Box>
    </PublicContent>
  );
} 