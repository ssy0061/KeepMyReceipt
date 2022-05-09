import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PaidIcon from '@mui/icons-material/Paid';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SimpleBottomNavigation() {
  const accessToken = sessionStorage.getItem('accessToken');
  if (accessToken) {
    axios.defaults.headers.common['Authorization'] = accessToken;
  }
  const navigate = useNavigate();

  const pages = [
    [`/club/${1}/book`, '장부내역', <PaidIcon />],
    ['/club', '분석차트', <InsertChartIcon />],
    ['/book', '거래등록', <PlaylistAddIcon />],
    [`/club/${1}/manage`, '모임관리', <PeopleAltIcon />],
    ['/', '보고서', <InsertDriveFileIcon />],
  ];

  const onClickButton = (page: any) => {
    navigate(page[0]);
  };

  const Box = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.up(420)]: {
      display: 'none',
    },
  }));

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 0,
      }}
    >
      <BottomNavigation showLabels>
        {pages.map((page) => (
          <BottomNavigationAction
            onClick={() => {
              onClickButton(page);
            }}
            label={page[1]}
            icon={page[2]}
          ></BottomNavigationAction>
        ))}
      </BottomNavigation>
    </Box>
  );
}
