import axios from 'axios';

import { BookState } from '../bookReducer';

const BASE_URL = 'https://k6d104.p.ssafy.io/api/spring';

const setToken = () => {
  const token = sessionStorage.getItem('accessToken');
  const config = {
    Authorization: `${token}`,
  };
  return config;
};

// 거래내역
export const apiCreateTransaction = async (
  data: BookState,
  requestId?: number,
) => {
  return await axios({
    method: 'post',
    url: `${BASE_URL}/club/${data.clubId}/transaction`,
    data: {
      ...(requestId && { requestId: requestId }),
      date: data.date,
      totalPrice: data.totalPrice,
      list: data.items.map((item) => ({
        name: item.name,
        price: item.price,
        type: item.type,
        categoryId: item.categoryId,
        ...(item.tagId && { tagId: item.tagId }),
        ...(item.memo && { memo: item.memo }),
      })),
    },
    headers: setToken(),
  }).catch((e) => {
    throw e;
  });
};

// export const apiUpdateTransaction = async (clubId: string) => {
//   return await axios({
//     method: 'get',
//     url: `${BASE_URL}/tag/${clubId}`,
//     headers: setToken(),
//   }).catch((e) => {
//     throw e;
//   });
// };

export const apiGetAllTransaction = async (
  clubId: string,
  searchKeyword?: string,
  start?: string,
  end?: string,
  page?: number,
) => {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/club/${clubId}/transactions`,
    params: {
      query: searchKeyword,
      start,
      end,
      page,
    },
    headers: setToken(),
  }).catch((e) => {
    throw e;
  });
};

export const apiGetTransaction = async (transactionId: number) => {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/club/transaction/${transactionId}`,
    headers: setToken(),
  }).catch((e) => {
    throw e;
  });
};

export const apiDeleteTransaction = async (transactionId: number) => {
  return await axios({
    method: 'delete',
    url: `${BASE_URL}/club/transaction/${transactionId}`,
    headers: setToken(),
  }).catch((e) => {
    throw e;
  });
};
