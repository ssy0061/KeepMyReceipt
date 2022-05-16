import axios from 'axios';
import { TypeNameKeys } from '../bookReducer';

const BASE_URL = 'https://k6d104.p.ssafy.io/api/spring';

const setToken = () => {
  const token = sessionStorage.getItem('accessToken');
  const config = {
    Authorization: `${token}`,
  };
  return config;
};

const matching = (typeName: TypeNameKeys) =>
  typeName === '자산' ? 'as' : 'bs';

export const apiCreateCategory = async (
  clubId: number,
  typeName: TypeNameKeys,
  largeCategoryName: string,
  smallCategoryName: string,
) => {
  return await axios({
    method: 'post',
    url: `${BASE_URL}/${matching(typeName)}category`,
    data: {
      clubId,
      lcName: largeCategoryName,
      [`${matching(typeName)}cName`]: smallCategoryName,
    },
    headers: setToken(),
  })
    .then((res) => {
      if (res.data.output !== 200) {
        alert(res.data.msg);
      }
      return res;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

export const apiUpdateCategory = async (
  clubId: number,
  typeName: TypeNameKeys,
  largeCategoryName: string,
  smallCategoryName: string,
  categoryId: number,
) => {
  return await axios({
    method: 'put',
    url: `${BASE_URL}/${matching(typeName)}category/${categoryId}`,
    data: {
      clubId,
      lcName: largeCategoryName,
      [`${matching(typeName)}cName`]: smallCategoryName,
    },
    headers: setToken(),
  })
    .then((res) => {
      if (res.data.output !== 200) {
        alert(res.data.msg);
      }
      return res;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

export const apiReadAllCategory = async (
  clubId: string,
  typeName: TypeNameKeys,
  largeCategoryName: string,
) => {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/${matching(
      typeName,
    )}category/${clubId}/${largeCategoryName}`,
    headers: setToken(),
  })
    .then((res) => {
      if (res.data.output !== 200) {
        alert(res.data.msg);
      }
      return res;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

export const apiDeleteCategory = async (
  typeName: TypeNameKeys,
  categoryId: number,
) => {
  return await axios({
    method: 'delete',
    url: `${BASE_URL}/${matching(typeName)}category/${categoryId}`,
    headers: setToken(),
  })
    .then((res) => {
      if (res.data.output !== 200) {
        alert(res.data.msg);
      }
      return res;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};
