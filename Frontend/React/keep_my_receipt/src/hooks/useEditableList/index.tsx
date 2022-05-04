import { useState } from 'react';
import { List } from '@mui/material';

import Item from './Item';
import ItemOnEdit from './ItemOnEdit';
import ItemAdder from './ItemAdder';
import { toEditableArray } from './services';

interface EditableListType {
  /** 원래 리스트 (상위 컴포넌트에서 만들어야 함) */
  originalList: string[];
  /** 원래 리스트 바꾸는 함수 */
  setOriginalList: React.Dispatch<React.SetStateAction<string[]>>;
  /** 현재 리스트에서 선택된 아이템 (상위 컴포넌트에서 만들어야 함) */
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  /** 접이식 컴포넌트 연동 여부 (옵션) */
  collapsible?: boolean;
}

/** Todo List 처럼 태그를 CRUD 할 수 있는 리스트 */
export default function useEditableList() {
  // 열림/닫힘 상태를 나타냄
  // 다른 접이식 컴포넌트와 연동해서 쓸 수 있음
  const [open, setOpen] = useState(false);

  // 수정 가능한 리스트 컴포넌트
  const EditableList = (props: EditableListType) => {
    // 원래 문자열 리스트를 기반으로, 수정 가능 여부 표시한 임시 리스트 생성
    const [editableList, setEditableList] = useState(
      toEditableArray(props.originalList),
    );

    return (
      <>
        <List disablePadding>
          {/* 리스트 아이템들 출력 */}
          {editableList.map((item, index) =>
            // 수정 버튼을 누른 아이템인 경우
            item.editable ? (
              // 수정 가능한 텍스트 필드 표시
              <ItemOnEdit
                item={item}
                setEditableList={setEditableList}
                setOriginalList={props.setOriginalList}
                key={item.name + index}
              />
            ) : (
              // 아닌 경우 그냥 아이템 표시
              <Item
                item={item}
                setEditableList={setEditableList}
                setOriginalList={props.setOriginalList}
                setSelectedItem={props.setSelected}
                collapsible={props.collapsible ? true : false}
                setOpen={setOpen}
                key={item.name + index}
              />
            ),
          )}

          {/* 맨 아래에 태그 추가 버튼 추가 */}
          <ItemAdder
            editableList={editableList}
            setEditableList={setEditableList}
            setOriginalList={props.setOriginalList}
          />
        </List>
      </>
    );
  };

  // 리스트 컴포넌트와 열림/닫힘 상태 반환
  return { EditableList, isOpen: open, setOpen };
}
