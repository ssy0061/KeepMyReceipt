import React from 'react';
import {
  Backdrop,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Fade,
  // Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

interface ItemDialogType {
  icon: JSX.Element;
  content: JSX.Element;
}

/** 트랜지션 효과를 위한 변수 (공식문서에서 그대로 가져옴) */
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: JSX.Element;
  },
  ref: React.Ref<unknown>,
) {
  return <Fade ref={ref} {...props} />;
  // <Slide direction="up" ref={ref} {...props} />;
});

export default function ItemDialog({ icon, content }: ItemDialogType) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <>
      <IconButton disableRipple onClick={handleOpen}>
        {icon}
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        keepMounted
        TransitionComponent={Transition}
        closeAfterTransition
        BackdropComponent={Backdrop}
        // BackdropProps={{ timeout: 500 }}
        fullWidth
        maxWidth="xs"
      >
        <DialogContent dividers>{content}</DialogContent>
        <DialogActions>
          <Button disableRipple onClick={handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
