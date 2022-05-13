import { memo } from 'react';
import { Collapse, List, ListItemButton } from '@mui/material';
import { ExpandLess, ExpandMore, Info } from '@mui/icons-material';

import useEditableList from '..';
import DialogWithIconButton from '../../../../components/DialogWithIconButton';
import ListItemTextWithSubtext from '../../../../components/ListItemTextWithSubtext';

interface ItemCategoryType {
  name: string;
  dialogContent: JSX.Element;
  list: string[];
  category: string;
  setCategory: (value: string) => void;
}

function ItemCategoryEditable(props: ItemCategoryType) {
  const { EditableList, isOpen, setOpen } = useEditableList();

  // 세부 목록 열림 / 닫힘 조작
  const handleExpand = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <List disablePadding>
        <ListItemButton onClick={handleExpand} disableRipple>
          {/* 아이콘 버튼 with 다이얼로그 */}
          <DialogWithIconButton icon={<Info />} content={props.dialogContent} />

          {/* 분류명 & 선택된 항목 */}
          <ListItemTextWithSubtext text={props.name} subtext={props.category} />

          {/* 열기 / 닫기 화살표 */}
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        {/* 화살표 눌렀을 때 나오는 리스트들 */}
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <EditableList
            originalList={props.list}
            // setOriginalList={props.setList}
            setSelected={props.setCategory}
            collapsible
          />
        </Collapse>
      </List>
    </>
  );
}

export default memo(ItemCategoryEditable);
