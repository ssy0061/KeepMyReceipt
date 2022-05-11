import React, { useEffect, useState } from 'react';
import { Stack, Button } from '@mui/material';
import axios from 'axios';
import Pagination from '../../../components/Pagination';
import * as qs from 'qs';
import CrewMenu from './Menu';

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
  const crewListAxios = axios.create({
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: 'repeat' }),
  });
  const getCrewList = async (page?: number) => {
    await crewListAxios
      .get(`https://k6d104.p.ssafy.io/api/spring/club/${id}/crews`, {
        params: {
          page: page ? page : 0,
          size: 5,
          sort: ['auth', 'id'],
        },
      })
      .then((res) => {
        console.log(res);
        const output = res.data.output;
        if (output === 200) {
          // console.log(res.data.data);
          setRes(res.data.data);
        } else if (output === 0) {
          console.log(res.data.msg);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onClick = (auth: string) => {
    console.log('메뉴 펼치기');
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
          list.map((crew: any) => (
            <Stack direction="row" key={crew.clubCrewId}>
              <span>
                {crew.name} / {crew.email} / {crew.auth}
              </span>
              <CrewMenu crewInfo={crew} getCrewList={getCrewList} />
            </Stack>
          ))
        ) : (
          <p>회원이 없습니다.</p>
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
