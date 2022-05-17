import { Container, Box, Grid } from '@mui/material';
import IndexHeader from './Header';
import IndexList from './List';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as qs from 'qs';

export default function BookIndex() {
  // clubId
  const { id } = useParams();
  // 날짜
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [date, setDate] = useState(1);
  const target = new Date(year, month, date);
  const targetEnd = new Date(year, month + 1, 0);
  const [checked, setChecked] = useState(false);
  // 수입, 지출, 거래내역
  const [res, setRes] = useState({
    expenditure: 0,
    income: 0,
    result: {
      list: [],
    },
  });
  const { expenditure, income, result } = res;
  // 현재 잔액
  const [balance, setBalance] = useState();

  const HistoryAxios = axios.create({
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: 'repeat' }),
  });
  // 수입, 지출, 거래내역 가져오기
  const getHistory = async (page?: number) => {
    await HistoryAxios.get(`/api/spring/club/${id}/transactions`, {
      params: {
        // clubId: id,
        start: `${target.getFullYear()}-${
          target.getMonth() + 1 > 9
            ? target.getMonth() + 1
            : '0' + (target.getMonth() + 1)
        }-01`,
        end: `${targetEnd.getFullYear()}-${
          targetEnd.getMonth() + 1 > 9
            ? targetEnd.getMonth() + 1
            : '0' + (targetEnd.getMonth() + 1)
        }-${
          today.getMonth() === targetEnd.getMonth()
            ? today.getDate()
            : targetEnd.getDate()
        }`,
        page: page ? page : 0,
        size: 5,
        sort: ['pay_date,DESC', 'id,DESC'],
      },
    })
      .then((res) => {
        setRes(res.data.data);
        // console.log(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // 현재 예산 잔액 가져오기
  const getBalance = async () => {
    await axios
      .get(`/api/spring/ascategory/${id}/현금 및 현금성자산`)
      .then((res) => {
        // console.log(res.data.data[0].balance);
        setBalance(res.data.data[0].balance);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (
      today.getFullYear() === target.getFullYear() &&
      today.getMonth() === target.getMonth()
    ) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [target]);

  useEffect(() => {
    getBalance();
    getHistory();
  }, [month]);
  return (
    <Container maxWidth="md" sx={{ paddingY: 0, paddingX: '1rem' }}>
      <Grid container direction="column" sx={{ marginBottom: 1 }}>
        {/* 월, 지출, 수입 */}
        <IndexHeader
          month={month}
          setMonth={setMonth}
          target={target}
          expenditure={expenditure}
          income={income}
          checked={checked}
          balance={balance}
        />
        {/* 거래내역 */}
        <Box>
          <IndexList list={result ? result.list : ''} />
        </Box>
      </Grid>
    </Container>
  );
}
