import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Stack } from '@mui/material';
import axios from 'axios';
import SettingItem from './SettingItem';
import NavMenuItem from './NavMenuList';
import AlarmItem from './AlarmItem';
import LogoItem from './LogoItem';

const ResponsiveAppBar = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  if (accessToken) {
    axios.defaults.headers.common['Authorization'] = accessToken;
  }

  return (
    <header>
      <AppBar
        sx={{
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          position: 'fixed',
        }}
        style={{ background: '#ffa500' }}
      >
        <Toolbar
          sx={{
            direction: 'row',
            float: 'right',
          }}
        >
          <LogoItem />
          <NavMenuItem />
          <Stack
            direction="row"
            sx={{
              direction: 'row',
              marginLeft: 'auto',
              marginRight: 0,
            }}
          >
            <AlarmItem />
            <SettingItem />
          </Stack>
        </Toolbar>
      </AppBar>
    </header>
  );
};
export default ResponsiveAppBar;
