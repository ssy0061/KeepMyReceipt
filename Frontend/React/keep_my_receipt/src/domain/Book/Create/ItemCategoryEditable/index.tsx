import { memo } from 'react';
import { Collapse, IconButton, List, ListItemButton } from '@mui/material';
import { ExpandLess, ExpandMore, Info } from '@mui/icons-material';

import useEditableList from '../../../../hooks/useEditableList';
import ListItemTextWithSubtext from '../ListItemTextWithSubtext';

interface ItemCategoryType {
  name: string;
  list: string[];
  setList: React.Dispatch<React.SetStateAction<string[]>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
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
        <ListItemButton onClick={handleExpand}>
          {/* 아이콘 */}
          <IconButton
            // 아이콘 클릭 시 물결 효과 제거
            disableRipple
            // 아이콘 클릭 시 메뉴 열리는 이벤트 차단
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Info />
          </IconButton>

          {/* 분류명 & 선택된 항목 */}
          <ListItemTextWithSubtext text={props.name} subtext={props.category} />

          {/* 열기 / 닫기 화살표 */}
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        {/* 화살표 눌렀을 때 나오는 리스트들 */}
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <EditableList
            originalList={props.list}
            setOriginalList={props.setList}
            setSelected={props.setCategory}
            collapsible
          />
        </Collapse>
      </List>
    </>
  );
}

export default memo(ItemCategoryEditable);
