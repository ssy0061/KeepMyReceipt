import React, { useEffect, useState } from 'react';
import {
  Box,
  Chip,
  ChipProps,
  ChipPropsColorOverrides,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { InfoOutlined } from '@mui/icons-material';

// 컴포넌트
import useToggle from '../../../../hooks/useToggle';
import DialogWithIconButton from '../../../../components/DialogWithIconButton';
import { MainCategoryDialog } from '../../tagDialogContents';
import { BookAction, BookItemType, updateItem } from '../../bookReducer';
import { mainCategories, largeCategories } from '../../tagListSample';
import EditableAutocomplete from '../../EditableAutocomplete';
import EditableAutocompleteTag from '../../EditableAutocompleteTag';

type ItemType = {
  clubId: string;
  item: BookItemType;
  itemIndex: number;
  dispatch: React.Dispatch<BookAction>;
};

const mainTypes: { name: string; color: string }[] = [
  { name: '자산', color: 'orange' },
  { name: '지출', color: 'red' },
  { name: '수입', color: 'blue' },
  { name: '예산', color: 'green' },
];

// 정규표현식을 활용해 숫자만 추출
const toNumberOnly = (price: string) => Number(price.replace(/[^0-9]/g, ''));

export default function Item({ clubId, item, itemIndex, dispatch }: ItemType) {
  // 토글 값과, 토글 버튼 생성
  // 추가적으로 setter 함수도 추가해줌.
  const { toggleValue, ToggleButtons } = useToggle(
    mainCategories,
    setMainCategory,
  );

  const [inputValue, setInputValue] = useState('');

  // 토글 값 바꾸는 함수
  function setMainCategory(value: string) {
    dispatch(updateItem(itemIndex, 'type', value));
    // 토글 값이 바뀔 때 대분류와 중분류 초기화
    dispatch(updateItem(itemIndex, 'largeCategory', ''));
    dispatch(updateItem(itemIndex, 'smallCategory', ''));
    dispatch(updateItem(itemIndex, 'categoryId', 0));
  }

  // 대분류 바꾸는 함수
  const setLargeCategory = (value: string | number) => {
    dispatch(updateItem(itemIndex, 'type', toggleValue));
    dispatch(updateItem(itemIndex, 'largeCategory', value));
    // 대분류가 바뀔 때, 중분류 초기화
    dispatch(updateItem(itemIndex, 'smallCategory', ''));
    dispatch(updateItem(itemIndex, 'categoryId', 0));
  };

  // 소분류 바꾸는 함수
  const setSmallCategory = (value: string | number) => {
    dispatch(updateItem(itemIndex, 'smallCategory', value));
    // dispatch(updateItem(itemIndex, 'categoryId', id));
  };

  const setLargeTag = (value: string | number) => {
    dispatch(updateItem(itemIndex, 'largeTag', value));
    dispatch(updateItem(itemIndex, 'smallTag', ''));
    // dispatch(updateItem(itemIndex, 'tagId', tagId));
    // if (tagId) {
    //   setTempTagId(tagId);
    // }
  };

  // const setSmallTag = (name: string, tagId: number) => {
  //   dispatch(updateItem(itemIndex, 'smallTag', name));
  //   // 태그2 선택을 취소할 경우, 기존 태그 id로 복구
  //   dispatch(updateItem(itemIndex, 'tagId', tagId === 0 ? tempTagId : tagId));
  // };

  // useEffect(() => {
  //   console.log(item);
  // }, [item]);

  return (
    <>
      <Box>
        {/* 거래내역 세부항목 이름 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            marginBottom: 1,
          }}
        >
          {/* <LocalOffer sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> */}
          <TextField
            label="내용"
            value={item.name}
            onChange={(event) => {
              dispatch(updateItem(itemIndex, 'name', event.target.value));
            }}
            variant="standard"
            fullWidth
            required
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          {/* <Money sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> */}
          <TextField
            label="금액"
            value={item.price ? item.price.toLocaleString() : undefined}
            onChange={(event) => {
              dispatch(
                updateItem(
                  itemIndex,
                  'price',
                  toNumberOnly(event.target.value),
                ),
              );
            }}
            InputProps={
              item.price
                ? {
                    startAdornment: (
                      <InputAdornment position="start">￦</InputAdornment>
                    ),
                  }
                : undefined
            }
            variant="standard"
            fullWidth
            required
          />
        </Box>

        {/* <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '50%' }}>
              <Notes sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                label="메모"
                value={item.memo}
                onChange={(event) => {
                  dispatch(updateItem(itemIndex, 'memo', event.target.value));
                }}
                variant="standard"
                multiline
              />
            </Box> */}
      </Box>

      {/* 주요 분류 (자산, 지출, 수입, 예산) */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginTop={4}
      >
        {/* 유형 선택 토글 버튼 */}
        <Stack direction="row" alignItems="center">
          <span>유형</span>
          {/* <ToggleButtons /> */}
          <Stack
            direction="row"
            alignItems="center"
            marginLeft={(theme) => (theme.breakpoints.down('sm') ? 2 : 5)}
            spacing={1}
          >
            {mainTypes.map((eachType) => (
              <Chip
                label={eachType.name}
                variant="outlined"
                onClick={() => {
                  setMainCategory(eachType.name);
                }}
                sx={{ color: eachType.color, borderColor: eachType.color }}
                key={eachType.name}
              />
            ))}
          </Stack>
        </Stack>

        {/* 아이콘 버튼 & 다이얼로그 */}
        <DialogWithIconButton
          icon={<InfoOutlined />}
          content={<MainCategoryDialog />}
        />
      </Stack>

      {/* 대분류 */}
      {item.type && (
        <Autocomplete
          /** 1. 옵션 목록 & 목록 출력 */
          options={
            item.type ? largeCategories[item.type] : largeCategories['자산']
          }
          renderOption={(props, option) => (
            <li {...props}>
              {option}
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <InfoOutlined />
              </IconButton>
            </li>
          )}
          /** 2. 입력란 & 입력 변화 */
          inputValue={inputValue}
          renderInput={(params) => (
            <Stack
              direction="row"
              alignItems="flex-end"
              spacing={1}
              marginBottom={1}
            >
              <TextField
                {...params}
                required
                label="대분류"
                variant="standard"
              />
              {/* <Interests sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> */}
              <InfoOutlined />
            </Stack>
          )}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          /** 3. 최종적으로 선택된 값 */
          value={item.largeCategory ? item.largeCategory : null}
          onChange={(event, newValue: string | null) => {
            setLargeCategory(newValue);
          }}
          autoHighlight
        />
      )}

      {/* 대분류
      <EditableListWrapped
        categoryName="대분류"
        dialogContent={<></>}
        originalList={largeCategories[toggleValue]}
        onSelect={setLargeCategory}
        selected={item.largeCategory}
        fixed
      /> */}

      {/* 소분류 */}
      {item.largeCategory && (
        <EditableAutocomplete
          label="소분류"
          clubId={clubId}
          typeName={item.type}
          largeCatName={item.largeCategory}
          value={item.smallCategory}
          setValue={setSmallCategory}
          requestCreateValue={(value) => {
            console.log('소분류 추가 API 요청', value);
          }}
        />
      )}

      {/* <EditableListWrappedForCategory
        categoryName="소분류"
        dialogContent={<p>설명</p>}
        clubId={clubId}
        typeName={item.type}
        lcName={item.largeCategory}
        onSelect={setSmallCategory}
        selected={item.smallCategory}
      /> */}

      {/* 1차 태그 */}
      <EditableAutocompleteTag
        label="태그"
        clubId={clubId}
        value={item.largeTag}
        setValue={setLargeTag}
        requestCreateValue={(value) => {
          console.log('태그 추가 API 요청', value);
        }}
      />

      {/* <EditableListWrappedForTag
        clubId={clubId}
        categoryName={!item.largeTag ? '태그' : '태그 1'}
        dialogContent={<p>설명</p>}
        onSelect={setLargeTag}
        selected={item.largeTag}
        parentTag={null}
      />

      {item.largeTag && (
        <EditableListWrappedForTag
          clubId={clubId}
          categoryName="태그 2"
          dialogContent={<p>설명</p>}
          onSelect={setSmallTag}
          selected={item.smallTag}
          parentTag={item.largeTag}
        />
      )} */}
    </>
  );
}
