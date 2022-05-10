import { Stack } from '@mui/material';
import { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditUserInfoDialog from '../../Dialog/EditUserInfoDialog';
export default function EditUserInfo() {
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(true);
  };
  return (
    <>
      <EditUserInfoDialog open={open} setOpen={setOpen} />
      <Stack alignItems="center">
        <Stack className="board" onClick={onClick}>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row">
              <AccountCircleIcon className="icon" />
              <div className="text">내 정보 수정 </div>
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
