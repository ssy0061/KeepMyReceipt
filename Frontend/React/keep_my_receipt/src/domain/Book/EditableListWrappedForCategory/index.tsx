import { memo, useEffect, useState } from 'react';
import { Collapse, List, ListItemButton } from '@mui/material';
import { ExpandLess, ExpandMore, Info } from '@mui/icons-material';

import DialogWithIconButton from '../../../components/DialogWithIconButton';
import EditableItem from '../EditableItem';
import EditableListForCategory from '../EditableListForCategory';
import { apiReadAllCategory } from '../api/categoryApi';
import { BSType, ASType } from '../types';
import { TypeNameKeys } from '../bookReducer';

interface EditableListWrappedForCategoryType {
  categoryName: string;
  dialogContent: JSX.Element;
  clubId: string;
  typeName: TypeNameKeys;
  lcName: string;
  onSelect: (name: string, id: number) => void;
  selected: string;
}

function EditableListWrappedForCategory(
  props: EditableListWrappedForCategoryType,
) {
  const [categories, setCategories] = useState<(BSType & ASType)[]>([]);

  const getAllCategory = async () => {
    if (props.lcName) {
      await apiReadAllCategory(props.clubId, props.typeName, props.lcName).then(
        (res) => {
          console.log('getAllCategory', res);
          setCategories(res.data.data);
        },
      );
    }
  };

  useEffect(() => {
    getAllCategory();
    console.log('categories', categories);
  }, [props.lcName]);

  // 세부 목록 열림 / 닫힘 상태
  const [open, setOpen] = useState(false);

  // 세부 목록 열림 / 닫힘 조작
  const handleExpand = () => {
    setOpen(!open);
  };

  return (
    <>
      <List disablePadding>
        <ListItemButton onClick={handleExpand} disableRipple disableGutters>
          {/* 아이콘 버튼 with 다이얼로그 */}
          <DialogWithIconButton icon={<Info />} content={props.dialogContent} />

          {/* 분류명 & 선택된 항목 */}
          <EditableItem
            prefixElement={
              <div style={{ marginRight: '2rem' }}>{props.categoryName}</div>
            }
            originalValue={props.selected}
            rootHighlight
          />

          {/* 열기 / 닫기 화살표 */}
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        {/* 화살표 눌렀을 때 나오는 리스트들 */}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <EditableListForCategory
            originalList={categories}
            onSelect={(name: string, id: number) => {
              props.onSelect(name, id);
              setOpen(false);
            }}
            clubId={props.clubId}
            typeName={props.typeName}
            lcName={props.lcName}
            fetchData={getAllCategory}
          />
        </Collapse>
      </List>
    </>
  );
}

export default memo(EditableListWrappedForCategory);
