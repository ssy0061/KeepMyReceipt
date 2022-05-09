import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { yellow } from '@mui/material/colors';

export default function LogoItem() {
  return (
    <Typography
      variant="h6"
      component="a"
      href="/"
      sx={{
        mr: 2,
        p: 'auto',
        flexGrow: 1,
        display: { xs: 'none', md: 'flex' },
        fontWeight: 300,
        float: 'right',
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      Keep Your Receipt
    </Typography>
  );
}
