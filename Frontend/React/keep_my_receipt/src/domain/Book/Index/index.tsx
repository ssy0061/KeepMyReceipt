import { Container } from '@mui/material';
import IndexHeader from './Header';
import IndexList from './List';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface listTypes {
  date: any;
  largeTag: string;
  name: string;
  price: number;
  smallTag?: string;
  transactionDetailId: number;
  transactionId: number;
}

interface resultTypes {
  list: listTypes[];
  numberOfElements: number;
  pageNumber: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface ResponseTypes {
  expenditure: number;
  income: number;
  result: resultTypes;
}

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
  });
  const { expenditure, income } = res;

  // 수입, 지출, 거래내역 가져오기
  const getHistory = async (page?: number) => {
    await axios
      .get(`/api/spring/club/${id}/transactions`, {
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
          }-${targetEnd.getDate()}`,
          page: page ? page : 0,
          size: 5,
          sort: 'id,DESC',
        },
      })
      .then((res) => {
        setRes(res.data.data);
        console.log(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // test
  const febDay = new Date(year, 2, 0);
  const day29 = new Date(2020, 2, 0);
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  // test
  useEffect(() => {
    if (
      today.getFullYear() === target.getFullYear() &&
      today.getMonth() === target.getMonth()
    ) {
      setChecked(true);
    } else {
      setChecked(false);
    }
    // console.log(target.toLocaleDateString());
  }, [target]);

  useEffect(() => {
    getHistory();
  }, [month]);

  useEffect(() => {
    getHistory();
  }, []);
  return (
    <Container maxWidth="md">
      {/* 월, 지출, 수입 */}
      <IndexHeader
        month={month}
        setMonth={setMonth}
        target={target}
        expenditure={expenditure}
        income={income}
        checked={checked}
      />
      {/* 거래내역 */}
      <IndexList />
    </Container>
  );
}
