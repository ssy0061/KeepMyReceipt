import { Box, Grid, useMediaQuery } from '@mui/material';
import Logo from './Logo';
import NavMenuItem from './NavMenuList';

import ResponsiveDrawer from './Drawer2';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Content1, NavBarContainer } from './styles';
import { bgcolor } from '@mui/system';

export default function NavBar() {
  // ver 1. 랜딩페이지 (로그인 안한 경우)
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const accessToken = sessionStorage.getItem('accessToken');
  const onClickButton = (url: string) => {
    navigate(url);
  };
  const matches = useMediaQuery('(min-width:500px)');

  useEffect(() => {
    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    console.log(id);
  }, []);

  return (
    <Box height="62px">
      <NavBarContainer>
        <Grid
          container
          // sx={{
          //   float: 'right',
          // }}
        >
          {!matches ? (
            <>
              <ResponsiveDrawer />
            </>
          ) : (
            <>
              <Grid item xs={5} sm={3} sx={{ pl: 3 }}>
                <Logo />
              </Grid>
              <Grid item xs={0} sm={9} sx={{ pr: 5 }}>
                <NavMenuItem />
              </Grid>
            </>
          )}
        </Grid>
      </NavBarContainer>
    </Box>
  );
}
