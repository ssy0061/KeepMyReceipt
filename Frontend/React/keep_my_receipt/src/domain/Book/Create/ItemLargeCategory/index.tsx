import { useEffect, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { InfoOutlined } from '@mui/icons-material';

import DialogWithIconButton from '../../../../components/DialogWithIconButton';
import {
  AssetLargeCategoryGuide,
  BudgetLargeCategoryGuide,
  ExpenditureLargeCategoryGuide,
  RevenueLargeCategoryGuide,
} from '../ItemGuide/largeCategory';
import { largeCategories } from '../tagListSample';
import { BookItemType } from '../bookReducer';

/** 항목 유형에 따라 대분류 가이드를 다르게 설정  
이때 가이드는 리액트 컴포넌트이므로, 
컴포넌트를 반환하는 형태로 해야 <></> 형태로 쓸 수 있음 */
const largeCategoryGuideDict = {
  자산: () => AssetLargeCategoryGuide,
  지출: () => ExpenditureLargeCategoryGuide,
  수입: () => RevenueLargeCategoryGuide,
  예산: () => BudgetLargeCategoryGuide,
  '': () => <></>,
};

interface ItemLargeCategoryType {
  item: BookItemType;
  setLargeCategory: (value: string) => void;
}

export default function ItemLargeCategory({
  item,
  setLargeCategory,
}: ItemLargeCategoryType) {
  const [inputValue, setInputValue] = useState('');

  const [LargeCategoryGuide, setLargeCategoryGuide] =
    useState<() => JSX.Element>();

  // 유형이 바뀔 때마다 대분류 가이드도 바뀜
  useEffect(() => {
    setLargeCategoryGuide(largeCategoryGuideDict[item.type]);
  }, [item.type]);

  return (
    <>
      <Autocomplete
        // 옵션 목록
        options={largeCategories[item.type]}
        // 옵션 목록 렌더링 방식
        renderOption={(props, option) => <li {...props}>{option}</li>}
        // 입력 값
        inputValue={inputValue}
        // 입력란 렌더링 (스택 안에 텍스트필드 & 아이콘 묶음)
        renderInput={(params) => (
          <Stack
            direction="row"
            alignItems="flex-end"
            spacing={1}
            marginBottom={1}
          >
            {/* 입력란 */}
            <TextField {...params} required label="대분류" variant="standard" />
            {/* 헬프 아이콘 */}
            <DialogWithIconButton
              icon={<InfoOutlined />}
              content={<LargeCategoryGuide />}
            />
          </Stack>
        )}
        // 입력할 때마다 현재 입력 값 달라짐
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        // 엔터를 누르면 현재 입력 값으로 확정
        value={item.largeCategory ? item.largeCategory : null}
        onChange={(event, newValue: string | null) => {
          setLargeCategory(newValue);
        }}
        // 현재 입력 값과 비슷한 옵션 자동 선택
        autoHighlight
      />
    </>
  );
}
