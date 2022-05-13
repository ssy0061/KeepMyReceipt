import React from 'react';
import { ListItem, ListItemButton, ListItemText, Stack } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

import { EditableItemType } from '../types';

interface ItemAdderType {
  editableList: EditableItemType[];
  setEditableList: React.Dispatch<React.SetStateAction<EditableItemType[]>>;
  // setOriginalList: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ItemAdder(props: ItemAdderType) {
  /** 아이템 추가 */
  const addItem = () => {
    const count = props.editableList.length - 1;
    // 마지막에 추가한 아이템이 아직 수정 중인 경우 종료
    if (count > 0 && props.editableList[count].editable === true) {
      return;
    }
    // 리스트 마지막에 빈 분류를 추가
    props.setEditableList((list) => list.concat({ name: '', editable: true }));
    // props.setOriginalList((list) => list.concat(''));
  };

  return (
    <>
      <ListItem>
        <ListItemButton onClick={() => addItem()} sx={{ paddingLeft: 4 }}>
          <ListItemText
            primary={
              <Stack direction="row" alignItems="center" spacing={1}>
                <span>태그 추가</span>
                <AddCircleOutline />
              </Stack>
            }
          />
        </ListItemButton>
      </ListItem>
    </>
  );
}
