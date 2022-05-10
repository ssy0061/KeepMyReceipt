import React, { useEffect, useState } from 'react';
import { Stack, Button } from '@mui/material';
import axios from 'axios';
import Pagination from '../../../components/Pagination';

interface listItemTypes {
  clubCrewId: number;
  name: string;
  email: string;
  auth: string;
}

interface resopnseType {
  pageNumber: number;
  size: number;
  totalPages: number;
  numberOfElements: number;
  totalElements: number;
  list: listItemTypes[];
}

export default function ManageCrew({ clubInfo }: { clubInfo: any }) {
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
  const getCrewList = async (page?: number) => {
    await axios
      .get(`https://k6d104.p.ssafy.io/api/spring/club/${id}/crews`, {
        params: {
          page: page ? page : 0,
          size: 5,
          sort: 'id,ASC',
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setRes(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getCrewList();
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
            <Stack direction="row" key={item.clubCrewId}>
              <span>
                {item.name} / {item.email} / {item.auth}
              </span>
            </Stack>
          ))
        ) : (
          <p>검색된 회원이 없습니다.</p>
        )}

        {/* Pagination */}
        <Pagination
          pageInfo={res}
          paginationSize={5}
          onClickPage={getCrewList}
          bgColor="#ffaa00"
        />
      </Stack>
    </Stack>
  );
}
