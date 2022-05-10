import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { yellow } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

export default function SettingItem() {
  const navigate = useNavigate();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    navigate(`/club/${1}/setting`);
  };

  return (
    <Box>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginLeft: 2 }}>
        <SettingsIcon
          sx={{
            color: yellow[50],
          }}
        />
      </IconButton>
    </Box>
  );
}
