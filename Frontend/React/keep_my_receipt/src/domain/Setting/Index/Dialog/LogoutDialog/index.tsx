import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

interface DialogType {
  open: boolean;
  setOpen: any;
}

export default function LogoutDialog({ open, setOpen }: DialogType) {
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const LeaveApp = () => {
    axios
      .post('api/spring/club/1/crew')
      .then(function (response) {
        console.log(response);
        console.log('로그아웃 클릭');
      })
      .catch(function (error) {
        console.log(error);
      });
    setOpen(false);
    navigate('/');
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
          로그아웃 하시겠습니까?
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
