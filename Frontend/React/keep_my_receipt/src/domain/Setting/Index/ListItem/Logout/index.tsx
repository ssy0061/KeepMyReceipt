import { Stack } from '@mui/material';
import { useState } from 'react';
import NoMeetingRoomIcon from '@mui/icons-material/NoMeetingRoom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LogoutDialog from '../../Dialog/LogoutDialog';

export default function Logout() {
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(true);
  };

  return (
    <>
      <LogoutDialog open={open} setOpen={setOpen} />
      <Stack alignItems="center">
        <Stack className="board" onClick={onClick}>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row">
              <NoMeetingRoomIcon className="icon" />
              <div className="text">로그아웃</div>
            </Stack>
            <div className="toggle">
              <ArrowForwardIosIcon color="disabled" />
            </div>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
