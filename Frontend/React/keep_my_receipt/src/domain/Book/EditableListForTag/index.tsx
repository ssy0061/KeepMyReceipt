import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

import EditableItemForTag from '../EditableItemForTag';
import { TagType } from '../types';
import { apiCreateTag, apiDeleteTag, apiUpdateTag } from '../api';

interface EditableListForTagType {
  originalList: TagType[];
  onSelect?: (name: string, tagId: number) => void;
  clubId: string;
  parentTag: string | null;
  fetchData: () => Promise<void>;
}

export default function EditableListForTag(props: EditableListForTagType) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <>
      <List disablePadding>
        {/* 리스트 아이템들 출력 */}
        {props.originalList.map((tag: TagType, index: number) => (
          <EditableItemForTag
            originalValue={tag}
            prefixElement={<div style={{ marginRight: '1.5rem' }}></div>}
            onEdit={async (prevVal, newVal) => {
              await apiUpdateTag(
                props.clubId,
                tag.tagId,
                newVal as string,
                props.parentTag,
              )
                .then(() => {
                  props.fetchData();
                })
                .catch((e) => {
                  console.log(e);
                });
            }}
            onErase={async () => {
              await apiDeleteTag(tag.tagId).then(() => {
                props.fetchData();
              });
            }}
            onSelect={props.onSelect}
            key={index + tag.tagName}
          />
        ))}

        {/* 리스트 마지막에 태그 추가 버튼 */}
        {!isAdding ? (
          <ListItem disablePadding>
            <ListItemButton onClick={() => setIsAdding(true)}>
              {/* 내용 앞 공백 */}
              <div style={{ marginRight: '1.5rem' }}></div>
              {/* 내용 */}
              <ListItemText>추가</ListItemText>
              {/* 더하기 아이콘 */}
              <ListItemIcon>
                <AddCircleOutline />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ) : (
          // 추가 버튼 클릭 시 입력란 띄움
          <EditableItemForTag
            originalValue={{
              tagId: 0,
              tagName: '',
              parentTag: props.parentTag,
            }}
            editOnMount
            onEdit={async (prevVal, newVal) => {
              // 수정 시 수정 API 대신 추가 API 호출
              await apiCreateTag(
                props.clubId,
                newVal as string,
                props.parentTag,
              ).then(() => {
                props.fetchData();
              });
            }}
            onCancel={() => {
              setIsAdding(false);
            }}
          />
        )}
      </List>
    </>
  );
}
