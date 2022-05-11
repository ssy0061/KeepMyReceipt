import { Stack } from '@mui/material';
import { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ErrorIcon from '@mui/icons-material/Error';
import LeaveClubDialog from '../../Dialog/LeaveClubDialog';

export default function LeaveClub(props: any) {
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(true);
  };

  return (
    <>
      <LeaveClubDialog open={open} setOpen={setOpen} clubName={1} />
      <Stack alignItems="center">
        <Stack className="board" onClick={onClick}>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row">
              <ErrorIcon className="icon" />
              <div className="text">모임 탈퇴</div>
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
