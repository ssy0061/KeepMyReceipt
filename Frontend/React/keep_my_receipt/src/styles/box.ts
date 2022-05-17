import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { green } from './Colors';

export const GreenBox = styled(Box)(() => ({
  color: 'white',
  backgroundColor: green.main,
}));
