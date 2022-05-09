import React, { useState } from 'react';
import { Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ClubListItem from '../../../../components/ClubListItem';
import SearchJoinDialog from '../JoinDialog';
import SearchWaitDialog from '../WaitDialog';

export default function SearchList({ clubList }: { clubList: any }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openWait, setOpenWait] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    id: 0,
    name: '',
    description: '',
    image: '',
  });

  const onClick = async (info: any) => {
    // 모임 내 권한 조회를 통해 가입 여부 확인
    // checkJoined: 200이면 가입회원 0이면 미가입
    const check = await axios
      .get(`https://k6d104.p.ssafy.io/api/spring/club/${info.id}/crew/auth`)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e);
        return;
      });
    if (
      check.data === '리더' ||
      check.data === '관리자' ||
      check.data === '회원'
    ) {
      // 모임으로 이동
      // console.log(`${id}번 모임으로 이동`);
      navigate(`../${info.id}/book`);
    } else if (check.data === '대기') {
      setDialogInfo(info);
      setOpenWait(true);
    } else if (check.output === 0) {
      // 가입 신청
      console.log(`${info.id}번 모임에 가입신청`);
      setDialogInfo(info);
      setOpen(true);
    }
  };
  return (
    <Grid container justifyContent="center">
      <SearchJoinDialog open={open} setOpen={setOpen} clubInfo={dialogInfo} />
      <SearchWaitDialog
        open={openWait}
        setOpen={setOpenWait}
        clubInfo={dialogInfo}
      />
      {clubList.map((info: any) => (
        <ClubListItem
          onClick={() => {
            onClick(info);
          }}
          key={info.id}
          clubInfo={info}
          checkJoin={true}
        />
      ))}
    </Grid>
  );
}
