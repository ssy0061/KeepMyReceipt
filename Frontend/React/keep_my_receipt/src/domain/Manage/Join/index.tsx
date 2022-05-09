import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Container, IconButton, Grid, Stack } from '@mui/material';
import Pagination from '../../../components/Pagination';

interface listItemTypes {
  clubCrewId: number;
  name: string;
  email: string;
}

interface resopnseType {
  pageNumber: number;
  size: number;
  totalPages: number;
  numberOfElements: number;
  totalElements: number;
  list: listItemTypes[];
}

export default function ManageJoin({ clubInfo }: { clubInfo: any }) {
  const { id, name, description, image } = clubInfo;
  const [res, setRes] = useState<resopnseType>({
    pageNumber: 0,
    size: 0,
    totalPages: 0,
    numberOfElements: 0,
    totalElements: 0,
    list: [],
  });
  const { list } = res;
  const getRequestList = async (page?: number) => {
    await axios
      .get(`https://k6d104.p.ssafy.io/api/spring/club/${id}/crews/requests`, {
        params: {
          page: page ? page : 0,
          size: 5,
          sort: 'id,ASC',
        },
      })
      .then((response) => {
        // console.log(response.data.data.list[0].name);
        setRes(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getRequestList();
  }, []);
  return (
    <Stack>
      {/* Dialog */}
      {/* Table */}
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        marginTop={2}
      >
        {/* <h3>테이블 컴포넌트</h3> */}
        {/* 리스트 */}
        {list.length ? (
          list.map((item: any) => (
            <span key={item.clubCrewId}>
              {item.name} / {item.email}
            </span>
          ))
        ) : (
          <p>검색된 신청자가 없습니다.</p>
        )}

        {/* Pagination */}
        <Pagination
          pageInfo={res}
          paginationSize={5}
          onClickPage={getRequestList}
          bgColor="#ffaa00"
        />
      </Stack>
    </Stack>
  );
}
