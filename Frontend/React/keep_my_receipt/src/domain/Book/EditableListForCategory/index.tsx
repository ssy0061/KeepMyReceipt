import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

import EditableItemForCategory from '../EditableItemForCategory';
import {
  apiCreateCategory,
  apiDeleteCategory,
  apiUpdateCategory,
} from '../api/categoryApi';
import { BSType, ASType } from '../types';
import { TypeNameKeys } from '../bookReducer';

interface EditableListForCategoryType {
  originalList: (BSType & ASType)[];
  onSelect?: (name: string, id: number) => void;
  clubId: string;
  typeName: TypeNameKeys;
  lcName: string;
  fetchData: () => Promise<void>;
}

export default function EditableListForCategory(
  props: EditableListForCategoryType,
) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <>
      <List disablePadding>
        {/* 리스트 아이템들 출력 */}
        {props.originalList.map((ctg, index: number) => (
          <EditableItemForCategory
            originalValue={ctg}
            prefixElement={<div style={{ marginRight: '1.5rem' }}></div>}
            onEdit={async (prevVal, newVal) => {
              await apiUpdateCategory(
                Number(props.clubId),
                props.typeName,
                props.lcName,
                newVal as string,
                props.typeName === '자산' ? ctg.ascId : ctg.bscId,
              ).then(() => {
                props.fetchData();
              });
            }}
            onErase={async () => {
              await apiDeleteCategory(
                props.typeName,
                props.typeName === '자산' ? ctg.ascId : ctg.bscId,
              ).then(() => {
                props.fetchData();
              });
            }}
            onSelect={props.onSelect}
            key={index}
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
          <EditableItemForCategory
            originalValue={{ ascId: 0, ascName: '', bscId: 0, bscName: '' }}
            editOnMount
            onEdit={async (prevVal, newVal) => {
              // 수정 시 수정 API 대신 추가 API 호출
              await apiCreateCategory(
                Number(props.clubId),
                props.typeName,
                props.lcName,
                newVal as string,
              ).then(() => {
                // console.log(res);
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
