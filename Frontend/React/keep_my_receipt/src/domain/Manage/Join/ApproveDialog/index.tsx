import React from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  IconButton,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';

interface DialogType {
  open: boolean;
  setOpen: any;
  clubCrewInfo: any;
  updateInfo: any;
}

export default function JoinApproveDialog({
  open,
  setOpen,
  clubCrewInfo,
  updateInfo,
}: DialogType) {
  const { clubCrewId, name, email } = clubCrewInfo;
  const handleClose = () => {
    setOpen(false);
  };
  const approveCrew = async () => {
    console.log('멤버 승인');
    await axios
      .put(
        `https://k6d104.p.ssafy.io/api/spring/club/crew/${clubCrewId}/request`,
      )
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    handleClose();
    updateInfo();
  };
  const denyCrew = async () => {
    console.log('멤버 거부');
    await axios
      .delete(
        `https://k6d104.p.ssafy.io/api/spring/club/crew/${clubCrewId}/request`,
      )
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    handleClose();
    updateInfo();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="join-dialog-title"
      aria-describedby="join-dialog-description"
    >
      <IconButton
        color="inherit"
        onClick={handleClose}
        sx={{ position: 'absolute', right: 0 }}
      >
        <Close sx={{ fontSize: '1.8rem' }} />
      </IconButton>
      <DialogTitle id="join-dialog-title" width="15rem">
        가입 승인
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="join-dialog-description">
          {name}
        </DialogContentText>
        <DialogContentText id="join-dialog-description2">
          {email}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={denyCrew}>거부</Button>
        <Button onClick={approveCrew} autoFocus>
          승인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
