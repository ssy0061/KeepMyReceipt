import { useState } from 'react';
import { Stack } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

// const [onAlarm, SetOnAlarm] = useState(true);

export default function AlarmToggle() {
  return (
    <Stack alignItems="center">
      <Stack className="board">
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row">
            <NotificationsActiveIcon className="icon" />
            <div className="text">알림 설정</div>
          </Stack>
          <div className="alarm">
            {/* {onAlarm ? ( */}
            {/* <ToggleOnIcon fontSize="large" color="success" /> */}
            {/* ) : ( */}
            <ToggleOffIcon fontSize="large" />
            {/* )} */}
          </div>
        </Stack>
      </Stack>
    </Stack>
  );
}
