import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import PaidIcon from '@mui/icons-material/Paid';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { styled } from '@mui/material/styles';

export default function SimpleBottomNavigation() {
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
      }}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          href={'/club/' + 1 + '/book'}
          label="장부"
          icon={<PaidIcon />}
        />

        <BottomNavigationAction
          href="/account"
          label="분석"
          icon={<InsertChartIcon />}
        />
        <BottomNavigationAction
          href="/"
          label="거래등록"
          icon={<PlaylistAddIcon />}
        />
        <BottomNavigationAction
          href={'/club/' + 1 + '/manage'}
          label="모임"
          icon={<PeopleAltIcon />}
        />
        <BottomNavigationAction
          href="/"
          label="보고서"
          icon={<InsertDriveFileIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
