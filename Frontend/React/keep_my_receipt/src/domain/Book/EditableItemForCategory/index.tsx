import {
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Cancel, CheckCircle, Delete, Edit } from '@mui/icons-material';

import useEditableItem from './hook';
import { EditableItemControllerType } from './hook';
type EditableItemViewType = Parameters<typeof EditableItemForCategory>[0];
import { BSType, ASType } from '../types';

export default function EditableItemForCategory(props: {
  originalValue: BSType & ASType;
  onEdit?: (prevValue: string | number, newValue: string | number) => void;
  editOnMount?: boolean;

  onCancel?: () => void;
  onErase?: (value: string | number) => void;
  onSelect?: (name: string, id: number) => void;

  prefixElement?: JSX.Element;
  rootHighlight?: boolean;
  isCurrency?: boolean;
}) {
  const categoryName = props.originalValue.ascName
    ? props.originalValue.ascName
    : props.originalValue.bscName;
  const categoryId = props.originalValue.ascId
    ? props.originalValue.ascId
    : props.originalValue.bscId;

  const editableItem = useEditableItem(
    categoryName,
    props.onEdit,
    props.editOnMount,
  );

  return (
    <>
      <ListItem disablePadding>
        <Grid flexGrow={1}>
          {/* 아이템 내용 */}
          {props.onSelect ? (
            // 선택 가능하면 버튼 형태로 반환
            <ListItemButton
              onClick={() => {
                // 현재 클릭한 값으로 바꿈
                props.onSelect && props.onSelect(categoryName, categoryId);
              }}
            >
              <EditableItemContent props={props} editableItem={editableItem} />
            </ListItemButton>
          ) : (
            // 아니면 그냥 텍스트만 반환
            <EditableItemContent props={props} editableItem={editableItem} />
          )}
        </Grid>

        {/* 아이콘들 */}
        <EditableItemActions props={props} editableItem={editableItem} />
      </ListItem>
    </>
  );
}

function EditableItemContent({
  props,
  editableItem,
}: {
  props: EditableItemViewType;
  editableItem: EditableItemControllerType;
}) {
  const categoryName = props.originalValue.ascName
    ? props.originalValue.ascName
    : props.originalValue.bscName;

  return (
    <Stack direction="row" alignItems="center">
      {/* 텍스트 앞쪽에 놓을 아이콘 or 글 */}
      {props.prefixElement && props.prefixElement}

      {/* 수정 중이 아닌 경우엔 글씨 보임 */}
      {!editableItem.isEditing && (
        <ListItemText
          primary={
            <Typography
              // 글씨 강조 옵션
              fontSize={props.rootHighlight ? 'large' : '1rem'}
              fontWeight={props.rootHighlight ? 'bold' : 'medium'}
            >
              {categoryName}
            </Typography>
          }
        />
      )}

      {/* 수정 중이면 텍스트 필드 보임 */}
      {props.onEdit && editableItem.isEditing && (
        <TextField
          value={editableItem.changedValue}
          onChange={editableItem.onItemChange}
          onKeyDown={(e) => {
            // Enter 누르면 저장
            if (e.key === 'Enter') {
              editableItem.onItemEditConfirm();
            }
          }}
          size="small"
          autoFocus // 첫 렌더링 시 자동 포커싱
        />
      )}
    </Stack>
  );
}

function EditableItemActions({
  props,
  editableItem,
}: {
  props: EditableItemViewType;
  editableItem: EditableItemControllerType;
}) {
  const categoryId = props.originalValue.ascId
    ? props.originalValue.ascId
    : props.originalValue.bscId;

  return (
    <>
      {/* 아이템 수정 버튼 */}
      {props.onEdit && !editableItem.isEditing && (
        <IconButton onClick={() => editableItem.onItemEdit(true)}>
          <Edit />
        </IconButton>
      )}

      {/* 아이템 수정 확인 버튼 */}
      {props.onEdit && editableItem.isEditing && (
        <IconButton
          onClick={() => {
            editableItem.onItemEditConfirm();
          }}
        >
          <CheckCircle />
        </IconButton>
      )}

      {/* 아이템 수정 취소 버튼 */}
      {props.onEdit && editableItem.isEditing && (
        <IconButton
          onClick={() => {
            editableItem.onItemEdit(false);
            props.onCancel && props.onCancel();
          }}
        >
          <Cancel />
        </IconButton>
      )}

      {/* 아이템 삭제 버튼 */}
      {props.onErase && !editableItem.isEditing && (
        <IconButton
          onClick={() => {
            props.onErase && props.onErase(categoryId);
          }}
        >
          <Delete />
        </IconButton>
      )}
    </>
  );
}
