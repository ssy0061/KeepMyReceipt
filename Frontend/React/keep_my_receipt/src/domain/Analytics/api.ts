import axios from 'axios';
import { TagItemType } from './types';

const BASE_URL = 'https://k6d104.p.ssafy.io/api/spring';

export type FirstChartResponseType = {
  tagName: string;
  percentage: number;
  cost: number;
  totalCost: number;
};

export const apiLoadFirstChartData = async (
  clubId: string,
  year: string,
  month: string,
) => {
  return await axios
    .get(`${BASE_URL}/chart/${clubId}/${year}/${month}`)
    .then((response) => {
      console.log('analytics API test', response);
      return response;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

export const toTagItemType = (tags: FirstChartResponseType[]) => {
  const tagItems: TagItemType[] = tags.map((tag) => ({
    id: tag.tagName,
    rate: tag.percentage.toString(),
    value: tag.cost.toString(),
  }));

  tagItems.sort((a, b) => Number(b.rate) - Number(a.rate));

  const tagTotalCost = tags[0].totalCost;

  return { tagItems, tagTotalCost };
};

export const apiLoadSecondChartData = async (
  clubId: string,
  year: string,
  month: string,
  parentTag: string,
) => {
  return await axios
    .get(`${BASE_URL}/chart/${clubId}/${year}/${month}/${parentTag}`)
    .then((response) => {
      console.log('analytics API test', response);
      return response;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};
