import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface DialogType {
  open: boolean;
  setOpen: any;
  clubName: any;
}

export default function LeaveClubDialog({
  open,
  setOpen,
  clubName,
}: DialogType) {
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const LeaveApp = () => {
    axios
      .delete('api/spring/club/1/crew')
      .then(function (response) {
        if (response.data.msg == '탈퇴할 수 없는 회원입니다.') {
          alert('탈퇴할 수 없는 회원입니다.');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="join-dialog-title"
      aria-describedby="join-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="join-dialog-description">
          모임을 탈퇴하시겠습니까?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button
          sx={{
            '&.MuiButton-text': { color: '#ff0000' },
          }}
          onClick={LeaveApp}
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
