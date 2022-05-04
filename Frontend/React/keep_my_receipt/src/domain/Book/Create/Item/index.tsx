import { useEffect, useState } from 'react';
import { Divider, List, ListItem, Stack } from '@mui/material';

import useToggle from '../../../../hooks/useToggle';
import ItemCategoryEditable from '../ItemCategoryEditable';
import ItemCategoryFixed from '../ItemCategoryFixed';
import ItemInfoOnEdit from '../ItemInfoOnEdit';
import ItemInfoOnShow from '../ItemInfoOnShow';
import ListItemTextWithSubtext from '../ListItemTextWithSubtext';

export interface ItemInfoType {
  name: string;
  onEdit: boolean;
  price: number;
}

// string 배열로 구성된 객체 타입 일반화
// 자세한 건 TypeScript의 인덱스 시그니처 참고
export interface StringArrayObjectType {
  [key: string]: string[];
}

const classification = ['자산', '지출', '수입', '예산'];

// as type을 씀으로써
// 리터럴 타입만 쓰게 하는 걸 방지
// 자세한 건 TypeScript의 리터럴 타입과 타입 단언 참고
const largeCategories = {
  자산: ['현금 및 현금성자산', '유형자산', '선급금', '기타자산'],
  예산: ['전기예산', '활동지원금', '회비'],
  지출: ['복리후생비', '여가교통비', '소모품비', '기타비용'],
  수입: ['상금수익', '부스수익', '이자수익'],
} as StringArrayObjectType;

const sampleMediumCategories = {
  '': [''],
  '현금 및 현금성자산': ['현금'],
  유형자산: ['비품', '차량'],
  선급금: ['회원권'],
  기타자산: ['미분류자산'],

  전기예산: ['전기예산'],
  활동지원금: ['활동지원금'],
  회비: ['회비'],

  복리후생비: ['회식', '식비', 'MT'],
  여가교통비: ['교통비'],
  소모품비: ['사무용품', '생활용품'],
  기타비용: ['미분류비용'],

  상금수익: ['상금수익'],
  부스수익: ['부스수익'],
  이자수익: ['이자수익'],
} as StringArrayObjectType;

export default function Item() {
  // 토글 값과, 토글 버튼 생성
  const { toggleValue, ToggleButtons } = useToggle(classification);
  // 대분류와 중분류 값 관리
  const [selectedLargeCategory, setSelectedLargeCategory] = useState('');
  const [totalMediums, setTotalMediums] = useState(sampleMediumCategories);
  const [currentMediumCategories, setCurrentMediumCategories] = useState(['']);

  const [selectedMediumCategory, setSelectedMediumCategory] = useState('');
  const [itemInfo, setItemInfo] = useState({
    name: '축구공',
    onEdit: false,
    price: 30000,
  });

  // 토글 값이 바뀔 때 대분류와 중분류 초기화
  useEffect(() => {
    setSelectedLargeCategory('');
    setSelectedMediumCategory('');
  }, [toggleValue]);

  // 대분류가 바뀔 때, 중분류 초기화
  useEffect(() => {
    setSelectedMediumCategory('');
    setCurrentMediumCategories(totalMediums[selectedLargeCategory]);
  }, [selectedLargeCategory]);

  // 중분류 수정/삭제 시, 기존 중분류 갱신
  useEffect(() => {
    console.log('현재 대분류', selectedLargeCategory);
    console.log('현재 중분류 리스트', currentMediumCategories);
    setTotalMediums((obj) => ({
      ...obj,
      [selectedLargeCategory]: currentMediumCategories,
    }));
  }, [currentMediumCategories]);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginY={1}
      >
        <span style={{ marginLeft: '3.5rem' }}>유형</span>
        <ToggleButtons />
      </Stack>
      <Divider />

      <ItemCategoryFixed
        name="대분류"
        list={largeCategories[toggleValue]}
        category={selectedLargeCategory}
        setCategory={setSelectedLargeCategory}
      />
      <Divider />

      <ItemCategoryEditable
        name="중분류"
        list={currentMediumCategories}
        setList={setCurrentMediumCategories}
        category={selectedMediumCategory}
        setCategory={setSelectedMediumCategory}
      />
      <Divider />

      <List disablePadding>
        {itemInfo.onEdit ? (
          <ItemInfoOnEdit itemInfo={itemInfo} setItemInfo={setItemInfo} />
        ) : (
          <ItemInfoOnShow itemInfo={itemInfo} setItemInfo={setItemInfo} />
        )}
        <Divider />

        <ListItem>
          <ListItemTextWithSubtext
            text="금액"
            subtext={itemInfo.price.toString()}
            inset
          />
        </ListItem>
      </List>
    </>
  );
}
