import type { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function publicLayoutVars(theme: Theme) {
  return {
    '--layout-public-content-pt': theme.spacing(3),
    '--layout-public-content-pb': theme.spacing(3),
    '--layout-public-content-px': theme.spacing(3),
  };
} 