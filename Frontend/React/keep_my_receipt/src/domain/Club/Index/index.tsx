import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Container } from '@mui/material';
import IndexItem from './item';
import IndexHeader from './header';

interface groupType {
  name: string;
  budget: number;
}

export default function GroupIndex() {
  // 모임 목록 조회
  const [groups, setGroups] = useState<groupType[] | null>([]);
  const getGroups = async () => {
    console.log('가입한 모임 목록 조회 API 요청');
    setGroups([
      { name: '고독한 미식가들', budget: 123000 },
      { name: '축구', budget: 500000 },
      { name: '야구', budget: 1000000 },
      { name: '고독한 미식가들', budget: 123000 },
      { name: '축구', budget: 500000 },
      { name: '야구', budget: 1000000 },
      { name: '고독한 미식가들', budget: 123000 },
      { name: '축구', budget: 500000 },
      { name: '야구', budget: 1000000 },
    ]);
  };
  useEffect(() => {
    getGroups();
  }, []);
  return (
    <Container maxWidth="md">
      <Grid container direction="column" sx={{ marginBottom: 3 }}>
        {/* Header */}
        <IndexHeader />

        {/* 리스트 */}
        <Grid container justifyContent="center" spacing={2}>
          {groups?.length ? (
            groups.map((group, index) => (
              <IndexItem key={index} name={group.name} budget={group.budget} />
            ))
          ) : (
            <p>모임 없음</p>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
