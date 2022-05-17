import { memo } from 'react';
import { Box, IconButton, Pagination, Stack } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material/';

import { BookAction, createItem, deleteItem } from '../../bookReducer';
import { CustomPaginationItem } from './style';

interface PageButtonType {
  count: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  dispatch?: React.Dispatch<BookAction>;
  editable: boolean;
}

function PageButtons({
  count,
  page,
  setPage,
  dispatch,
  editable,
}: PageButtonType) {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#e8e4e4',
        marginX: -2,
        paddingX: 2,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginY={0.5}
      >
        {/* 페이지네이션 */}
        <Pagination
          count={count}
          siblingCount={0}
          boundaryCount={0}
          page={page}
          onChange={handleChange}
          variant="outlined"
          renderItem={(item) => <CustomPaginationItem {...item} />}
        />

        {editable ? (
          <Stack direction="row">
            {/* 페이지 추가 버튼 */}
            <IconButton
              onClick={() => {
                // 현재 페이지 뒤에 추가
                dispatch && dispatch(createItem(page));
                setPage((page) => page + 1);
              }}
            >
              <AddCircle />
            </IconButton>

            {/* 페이지 삭제 버튼 */}
            <IconButton
              onClick={() => {
                // 현재 페이지 삭제
                dispatch && dispatch(deleteItem(page - 1));
                // 페이지 2개 이상일 때만 1 줄임
                if (page >= 2) {
                  setPage((page) => page - 1);
                }
              }}
            >
              <RemoveCircle />
            </IconButton>
          </Stack>
        ) : null}
      </Stack>
    </Box>
  );
}

export default memo(PageButtons);
