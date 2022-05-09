import React from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface ClubInfoType {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface DialogType {
  open: boolean;
  setOpen: any;
  clubInfo: ClubInfoType;
}

export default function SearchJoinDialog({
  open,
  setOpen,
  clubInfo,
}: DialogType) {
  const { id, name, description, image } = clubInfo;
  const handleClose = () => {
    setOpen(false);
  };
  const JoinClub = async () => {
    // 가입 신청
    await axios
      .post(`https://k6d104.p.ssafy.io/api/spring/club/${id}/crew`)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="join-dialog-title"
      aria-describedby="join-dialog-description"
    >
      <DialogTitle id="join-dialog-title">{`${name}`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="join-dialog-description">
          가입 신청이 수락되면 '알림'으로 알려드립니다.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={JoinClub} autoFocus>
          가입하기
        </Button>
      </DialogActions>
    </Dialog>
  );
}
