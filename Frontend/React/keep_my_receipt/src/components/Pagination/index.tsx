import React, { useEffect, useState } from 'react';
import { Stack, IconButton, Box, Typography } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

interface pageInfoType {
  pageNumber: number;
  size: number;
  totalPages: number;
  numberOfElements: number;
  totalElements: number;
}
export default function Pagination({
  pageInfo,
  paginationSize,
  onClickPage,
  bgColor,
}: {
  pageInfo: pageInfoType;
  paginationSize: number;
  onClickPage: any;
  bgColor?: string;
}) {
  const { pageNumber, size, totalPages, numberOfElements, totalElements } =
    pageInfo;
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPagiNum, setCurrentPagiNum] = useState(0);
  const onClick = (newPage: number) => {
    setCurrentPage(newPage);
    // 새 page를 얻기 위해 api 요청
    onClickPage(newPage);
  };
  const onClickForword = () => {
    setCurrentPage(paginationSize * (currentPagiNum + 1));
    setCurrentPagiNum((prev) => prev + 1);
    onClickPage(paginationSize * (currentPagiNum + 1));
  };
  const onClcikBack = () => {
    setCurrentPage(paginationSize * (currentPagiNum - 1) + paginationSize - 1);
    setCurrentPagiNum((prev) => prev - 1);
    onClickPage(paginationSize * (currentPagiNum - 1) + paginationSize - 1);
  };
  const pageList = () => {
    const array = [];
    const totalPagiNum = Math.ceil(totalPages / paginationSize);
    for (let i = 0; i < paginationSize; i++) {
      const num = i + paginationSize * currentPagiNum;
      // if (i === )
      array.push(
        <IconButton
          key={num}
          color="inherit"
          sx={
            num === currentPage && totalPages > 0
              ? {
                  color: 'white',
                  fontStyle: 'bold',
                  backgroundColor: bgColor ? bgColor : '#42a5f5',
                  width: '2.2rem',
                  height: '2.2rem',
                  '&:hover': {
                    backgroundColor: bgColor ? bgColor : '#42a5f5',
                    opacity: 0.8,
                  },
                }
              : num < totalPages
              ? {
                  fontStyle: 'bold',
                  width: '2.2rem',
                  height: '2.2rem',
                }
              : {
                  visibility: 'hidden',
                  fontStyle: 'bold',
                  width: '2.2rem',
                  height: '2.2rem',
                }
          }
          onClick={() => onClick(num)}
        >
          <Box sx={{ width: '1.8rem' }}>
            <Typography fontSize="1.3rem">{num + 1}</Typography>
          </Box>
        </IconButton>,
      );
    }
    return (
      <Stack direction="row" justifyContent="center" alignItems="center">
        <IconButton
          onClick={onClcikBack}
          color="inherit"
          sx={currentPagiNum === 0 ? { visibility: 'hidden' } : null}
        >
          <ArrowBackIosNew sx={{ fontSize: '1.5rem' }} />
        </IconButton>
        {array}
        <IconButton
          onClick={onClickForword}
          color="inherit"
          sx={
            currentPagiNum === totalPagiNum - 1 || totalPagiNum === 0
              ? { visibility: 'hidden' }
              : null
          }
        >
          <ArrowForwardIos sx={{ fontSize: '1.5rem' }} />
        </IconButton>
      </Stack>
    );
  };
  return (
    <Stack>
      {pageList()}
      Pagination
      <p>
        페이지: {pageNumber}/{totalPages > 0 ? totalPages - 1 : 0} (0...n) __
        리얼 현재 페이지: {currentPage + 1}
      </p>
      <p>
        현재 페이지 개체 수(사이즈) / 전체 개체 수: {numberOfElements}({size}) /
        {totalElements}
      </p>
      <p>
        paginum/pagiTotal: {currentPagiNum}/
        {totalPages > 0 ? Math.ceil(totalPages / paginationSize) - 1 : 0}{' '}
        _______ pagiSize: {paginationSize}
      </p>
    </Stack>
  );
}
