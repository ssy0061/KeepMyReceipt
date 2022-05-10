import React, { useEffect } from 'react';
import { Divider, List, Stack } from '@mui/material';
import { Info } from '@mui/icons-material';

// 컴포넌트
import DialogWithIconButton from '../DialogWithIconButton';
import ItemCategoryEditable from '../ItemCategoryEditable';
import ItemCategoryFixed from '../ItemCategoryFixed';
import { MainCategoryDialog } from '../ItemDialogs';
// 훅
import useToggle from '../../../../hooks/useToggle';
import useEditableItem from '../../../../hooks/useEditableItem';
// 리듀서
import { BookAction, BookItemType, updateItem } from '../../bookReducer';
// 샘플 파일들
import {
  mainCategories,
  largeCategories,
  mediumCategories,
  tag1Categories,
  tag2Categories,
} from '../../tagListSample';

interface ItemType {
  item: BookItemType;
  itemIndex: number;
  dispatch: React.Dispatch<BookAction>;
}

export default function Item({ item, itemIndex, dispatch }: ItemType) {
  // dispatch와 다른 함수들을 이어주기 위한 어댑터 선언
  // key값을 주면, 이 key값을 기반으로 함수 생성해 돌려줌.
  // 이 함수는 아이템 객체에서 해당 key값을 찾아 value를 업데이트함.
  const dispatchAdapter = (key: string) => (value: string | number) => {
    dispatch(updateItem(itemIndex, key, value));
  };

  // 토글 값 바꾸는 함수
  const setMainCategory = (value: string) => {
    dispatch(updateItem(itemIndex, 'mainCategory', value));
    // 토글 값이 바뀔 때 대분류와 중분류 초기화
    dispatch(updateItem(itemIndex, 'largeCategory', ''));
    dispatch(updateItem(itemIndex, 'mediumCategory', ''));
  };

  // 토글 값과, 토글 버튼 생성
  // 추가적으로 setter 함수도 추가해줌.
  const { toggleValue, ToggleButtons } = useToggle(
    mainCategories,
    setMainCategory,
  );

  // 대분류 바꾸는 함수
  const setLargeCategory = (value: string) => {
    dispatch(updateItem(itemIndex, 'mainCategory', toggleValue));
    dispatch(updateItem(itemIndex, 'largeCategory', value));
    // 대분류가 바뀔 때, 중분류 초기화
    dispatch(updateItem(itemIndex, 'mediumCategory', ''));
  };

  // 항목 이름 컴포넌트
  const EditableItemForName = useEditableItem(
    '내용',
    item.itemName,
    dispatchAdapter('itemName'),
  );

  // 항목 금액 컴포넌트
  const EditableItemForMoney = useEditableItem(
    '금액',
    item.itemValue,
    dispatchAdapter('itemValue'),
  );

  useEffect(() => {
    console.log(item);
  }, [item]);

  return (
    <>
      {/* 주요 분류 (자산, 지출, 수입, 예산) */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginY={1}
        marginLeft={2}
      >
        {/* 아이콘 버튼 & 다이얼로그 */}
        <Stack direction="row" alignItems="center">
          <DialogWithIconButton
            icon={<Info />}
            content={<MainCategoryDialog />}
          />
          <span>유형</span>
        </Stack>
        {/* 유형 선택 토글 버튼 */}
        <ToggleButtons />
      </Stack>
      <Divider />

      {/* 대분류 */}
      <ItemCategoryFixed
        name="대분류"
        dialogContent={<></>}
        list={largeCategories[toggleValue]}
        category={item.largeCategory}
        setCategory={setLargeCategory}
      />
      <Divider />

      <ItemCategoryEditable
        name="중분류"
        dialogContent={<p>설명</p>}
        list={mediumCategories[item.largeCategory]}
        category={item.mediumCategory}
        setCategory={dispatchAdapter('mediumCategory')}
      />
      <Divider />

      <ItemCategoryEditable
        name="태그 1"
        dialogContent={<p>설명</p>}
        list={tag1Categories}
        category={item.tag1}
        setCategory={dispatchAdapter('tag1')}
      />
      <Divider />

      <ItemCategoryEditable
        name="태그 2"
        dialogContent={<p>설명</p>}
        list={tag2Categories[item.tag1]}
        category={item.tag2}
        setCategory={dispatchAdapter('tag2')}
      />
      <Divider />

      <List disablePadding>
        <EditableItemForName />
        <Divider />
        <EditableItemForMoney />
      </List>
    </>
  );
}
