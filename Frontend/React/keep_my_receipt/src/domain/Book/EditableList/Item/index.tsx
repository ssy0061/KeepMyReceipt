import React from 'react';
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import { EditableItemType } from '../types';

interface ItemType {
  /** 각 리스트 아이템 */
  item: EditableItemType;
  setEditableList: React.Dispatch<React.SetStateAction<EditableItemType[]>>;
  // setOriginalList: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedItem: (value: string) => void;
  collapsible: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Item(props: ItemType) {
  /** 아이템을 수정 가능한 상태로 바꿈 */
  const editItem = (target: EditableItemType): void => {
    props.setEditableList((list) =>
      list.map((item) => {
        // 리스트에서 현재 아이템을 찾음
        if (item.name === target.name) {
          // 수정 가능한 상태로 만들어 반환
          item.editable = true;
        }
        return item;
      }),
    );
  };

  /** 리스트에서 현재 아이템 삭제 */
  const deleteItem = (target: string): void => {
    /**
     * 아이템 수정 / 삭제 시에는 Editable이 아니라 Original을 바꿔야 함.
     * : Editable은 Original을 기반으로 하는데,
     * Original은 prop에 속해있으므로,
     * Original을 바꾸면 Editable도 따라 바뀜.
     * 그러므로 Original만 바꾸면 된다!
     */
    // props.setOriginalList((list) => list.filter((item) => item !== target));
    // props.setEditableList((list) =>
    //   list.filter((item) => item.name !== target),
    // );
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            {/* 아이템 수정 버튼 */}
            <IconButton onClick={() => editItem(props.item)}>
              <Edit />
            </IconButton>
            {/* 아이템 삭제 버튼 */}
            <IconButton onClick={() => deleteItem(props.item.name)} edge="end">
              <Delete />
            </IconButton>
          </>
        }
      >
        <ListItemButton
          onClick={() => {
            // 현재 클릭한 값으로 바꿈
            props.setSelectedItem(props.item.name);
            // 접이식 컴포넌트와 쓰는 경우, 열림 상태 변경
            if (props.collapsible) {
              props.setOpen((open) => !open);
            }
          }}
          sx={{ paddingLeft: 4 }}
        >
          <ListItemText primary={props.item.name} />
        </ListItemButton>
      </ListItem>
    </>
  );
}
