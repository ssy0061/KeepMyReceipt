import React, { useState } from 'react';
import { IconButton, InputBase, ListItem } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

import { EditableItemType } from '../types';

interface ItemOnEditType {
  item: EditableItemType;
  setEditableList: React.Dispatch<React.SetStateAction<EditableItemType[]>>;
  // setOriginalList: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ItemOnEdit(props: ItemOnEditType) {
  const [changedName, setChangedName] = useState(props.item.name);

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setChangedName(event.target.value);
  };

  /** 수정 중인 아이템 수정 끝냄 */
  const confirmEditItem = (given: EditableItemType): void => {
    // 새로 값을 추가한 경우, OriginalList에는 없어서 따로 처리해야 함.
    // 새로운 값의 name은 ''이므로, 현재 아이템이 공백이면 새로 추가한 값임.
    if (props.item.name === '') {
      // props.setOriginalList((list) => list.concat(changedName));
      return;
    }

    // 원래 리스트에 있던 값 바꿔줘야 함
    // props.setOriginalList((list) =>
    //   list.map((item) => {
    //     if (item === given.name) {
    //       return changedName;
    //     }
    //     return item;
    //   }),
    // );
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton onClick={() => confirmEditItem(props.item)}>
            <CheckCircleOutline />
          </IconButton>
        }
      >
        {/* 텍스트 필드 */}
        <InputBase
          value={changedName}
          onChange={handleChange}
          onKeyDown={(e) => {
            // Enter 누르면 저장
            if (e.key === 'Enter') {
              confirmEditItem(props.item);
            }
          }}
          // 첫 렌더링 시 자동 포커싱
          autoFocus
          sx={{ paddingLeft: 4 }}
        />
      </ListItem>
    </>
  );
}
