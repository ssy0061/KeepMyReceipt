import { useState } from 'react';
import {
  Button,
  Card,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import {
  GreenTableCell,
  LargeCategoryTypography,
  StyledTableRow,
  TableCellNoBorder,
  TableHeadTypography,
} from './style';
import toCurrency from '../../../services/toCurrency';
import { AssetReportType, mainCategories } from './type';
import sample from './sample.json';

export default function AssetReport() {
  const sampleList: AssetReportType = sample;

  const date = new Date();
  const year = String(date.getFullYear());
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const curStart = year.concat('-').concat(month).concat('-').concat('01');
  const curEnd = year.concat('-').concat(month).concat('-').concat(day);
  const [startDate, setStartDate] = useState(curStart);
  const [endDate, setEndDate] = useState(curEnd);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    // loadData();
    setOpen(false);
  };

  return (
    <>
      {/* 기간 설정 부분 */}
      <Card
        variant="outlined"
        style={{
          padding: 15,
          width: '100%',
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          style={{ width: '100%' }}
        >
          <Grid xs={8} sm={8} md={8} item justifyContent="start">
            <Typography
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                width: '100%',
              }}
            >
              {startDate}　~　{endDate}
            </Typography>
          </Grid>
          <Grid xs={4} sm={4} md={4} item justifyContent="end">
            <Button
              variant="contained"
              color="primary"
              style={{ fontWeight: 'bold' }}
              onClick={handleOpen}
            >
              기간설정
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* 테이블 첫 행 출력 */}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* 자산 */}
              <GreenTableCell>
                <TableHeadTypography>자산</TableHeadTypography>
              </GreenTableCell>

              {/* 자산 총 금액 */}
              <GreenTableCell align="right">
                <TableHeadTypography>
                  {toCurrency(sampleList.total)}
                </TableHeadTypography>
              </GreenTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* 대분류들 출력 */}
            {mainCategories.map((cat) => (
              <>
                <StyledTableRow hover key={cat}>
                  {/* 대분류명 */}
                  <TableCell sx={{ paddingLeft: 4, paddingTop: 3 }}>
                    <LargeCategoryTypography>{cat}</LargeCategoryTypography>
                  </TableCell>

                  {/* 해당 대분류 금액 총합 */}
                  <TableCell align="right">
                    <LargeCategoryTypography>
                      {toCurrency(sampleList[cat].total)}
                    </LargeCategoryTypography>
                  </TableCell>
                </StyledTableRow>

                {/* 대분류 안 중분류들 출력 */}
                {sampleList[cat].categories.map((eachCat) => (
                  <StyledTableRow hover key={eachCat.name}>
                    {/* 중분류명 */}
                    <TableCellNoBorder sx={{ paddingLeft: 7 }}>
                      {eachCat.name}
                    </TableCellNoBorder>

                    {/* 해당 중분류 금액 총합 */}
                    <TableCellNoBorder align="right">
                      {toCurrency(eachCat.sum)}
                    </TableCellNoBorder>
                  </StyledTableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
