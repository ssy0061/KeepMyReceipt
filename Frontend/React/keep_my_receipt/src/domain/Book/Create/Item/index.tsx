import React, { useEffect } from 'react';
import { Divider, List, ListItemIcon, Stack } from '@mui/material';
import { Info } from '@mui/icons-material';

// 컴포넌트
import useToggle from '../../../../hooks/useToggle';
import DialogWithIconButton from '../../../../components/DialogWithIconButton';
import EditableItem from '../../EditableItem';
import EditableListWrapped from '../../EditableListWrapped';
import EditableListWrappedForTag from '../../EditableListWrappedForTag';
import { MainCategoryDialog } from '../../tagDialogContents';
import {
  BookAction,
  BookItemKeys,
  BookItemType,
  updateItem,
} from '../../bookReducer';
import {
  mainCategories,
  largeCategories,
  mediumCategories,
} from '../../tagListSample';

type ItemType = {
  clubId: string;
  item: BookItemType;
  itemIndex: number;
  dispatch: React.Dispatch<BookAction>;
};

export default function Item({ clubId, item, itemIndex, dispatch }: ItemType) {
  // dispatch와 다른 함수들을 이어주기 위한 어댑터 선언
  // key값을 주면, 이 key값을 기반으로 함수 생성해 돌려줌.
  // 이 함수는 아이템 객체에서 해당 key값을 찾아 value를 업데이트함.
  const selector = (key: BookItemKeys) => (value: string | number) => {
    dispatch(updateItem(itemIndex, key, value));
  };

  // 토글 값 바꾸는 함수
  const setMainCategory = (value: string) => {
    dispatch(updateItem(itemIndex, 'type', value));
    // 토글 값이 바뀔 때 대분류와 중분류 초기화
    dispatch(updateItem(itemIndex, 'largeCategory', ''));
    dispatch(updateItem(itemIndex, 'smallCategory', ''));
  };

  // 토글 값과, 토글 버튼 생성
  // 추가적으로 setter 함수도 추가해줌.
  const { toggleValue, ToggleButtons } = useToggle(
    mainCategories,
    setMainCategory,
  );

  // 대분류 바꾸는 함수
  const setLargeCategory = (value: string | number) => {
    dispatch(updateItem(itemIndex, 'type', toggleValue));
    dispatch(updateItem(itemIndex, 'largeCategory', value));
    // 대분류가 바뀔 때, 중분류 초기화
    dispatch(updateItem(itemIndex, 'smallCategory', ''));
  };

  const setLargeTag = (name: string, tagId: number) => {
    dispatch(updateItem(itemIndex, 'largeTag', name));
    dispatch(updateItem(itemIndex, 'smallTag', ''));
    dispatch(updateItem(itemIndex, 'tagId', tagId));
  };

  const setSmallTag = (name: string, tagId: number) => {
    dispatch(updateItem(itemIndex, 'smallTag', name));
    dispatch(updateItem(itemIndex, 'tagId', tagId));
  };

  useEffect(() => {
    console.log(item);
  }, [item]);

  return (
    <>
      <List disablePadding>
        <EditableItem
          originalValue={item.name}
          onEdit={(prevVal, newVal) => {
            dispatch(updateItem(itemIndex, 'name', newVal));
          }}
          prefixElement={
            <ListItemIcon sx={{ marginLeft: '2.5rem' }}>내용</ListItemIcon>
          }
          rootHighlight
        />
        <Divider />

        <EditableItem
          originalValue={item.price}
          onEdit={(prevVal, newVal) => {
            dispatch(updateItem(itemIndex, 'price', newVal));
          }}
          prefixElement={
            <ListItemIcon sx={{ marginLeft: '2.5rem' }}>금액</ListItemIcon>
          }
          isCurrency
          rootHighlight
        />
        <Divider />
      </List>

      {/* 주요 분류 (자산, 지출, 수입, 예산) */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginY={1}
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
      <EditableListWrapped
        categoryName="대분류"
        dialogContent={<></>}
        originalList={largeCategories[toggleValue]}
        onSelect={setLargeCategory}
        selected={item.largeCategory}
        fixed
      />
      <Divider />

      <EditableListWrapped
        categoryName="중분류"
        dialogContent={<p>설명</p>}
        originalList={mediumCategories[item.largeCategory]}
        onSelect={selector('smallCategory')}
        selected={item.smallCategory}
      />
      <Divider />

      <EditableListWrappedForTag
        clubId={clubId}
        categoryName="태그 1"
        dialogContent={<p>설명</p>}
        onSelect={setLargeTag}
        selected={item.largeTag}
        parentTag={null}
      />
      <Divider />

      {item.largeTag && (
        <EditableListWrappedForTag
          clubId={clubId}
          categoryName="태그 2"
          dialogContent={<p>설명</p>}
          onSelect={setSmallTag}
          selected={item.smallTag}
          parentTag={item.largeTag}
        />
      )}
      <Divider />
    </>
  );
}
