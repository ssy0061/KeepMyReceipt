import React, { memo } from 'react';
import {
  Backdrop,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Fade,
  // Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

interface DialogWithIconButtonType {
  icon: JSX.Element;
  content: JSX.Element;
  disabled?: boolean;
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

function DialogWithIconButton({ icon, content }: DialogWithIconButtonType) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 아이콘 클릭 시 겹치는 메뉴 열리는 이벤트 차단
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <>
      {/* <Button onClick={handleOpen}>{icon}</Button> */}
      <div onClick={handleOpen}>{icon}</div>
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

export default memo(DialogWithIconButton);
