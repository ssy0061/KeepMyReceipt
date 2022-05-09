import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { yellow } from '@mui/material/colors';

const alarms = ['알림', '알림2', '알림3'];

export default function AlarmItem() {
  const [anchorElUser2, setAnchorElUser2] = React.useState<null | HTMLElement>(
    null,
  );
  const handleOpenUserMenu2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser2(event.currentTarget);
  };
  const handleCloseUserMenu2 = () => {
    setAnchorElUser2(null);
  };

  return (
    <Box>
      <IconButton onClick={handleOpenUserMenu2} sx={{ p: 0, marginLeft: 10 }}>
        <NotificationsIcon
          sx={{
            color: yellow[50],
          }}
        />
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser2}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        // keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser2)}
        onClose={handleCloseUserMenu2}
      >
        {alarms.map((alarm) => (
          <MenuItem key={alarm} onClick={handleCloseUserMenu2}>
            <Typography textAlign="center">{alarm}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
