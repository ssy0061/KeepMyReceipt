import { memo, useEffect, useState } from 'react';
import { Collapse, List, ListItemButton } from '@mui/material';
import { ExpandLess, ExpandMore, Info } from '@mui/icons-material';

import DialogWithIconButton from '../../../components/DialogWithIconButton';
import EditableItem from '../EditableItem';
import EditableListForTag from '../EditableListForTag';
import { apiGetLargeTags, apiGetSmallTags } from '../api';
import { TagType } from '../types';

interface EditableListWrappedForTagType {
  clubId: string;
  dialogContent: JSX.Element;
  categoryName: string;
  parentTag: string | null;
  onSelect: (name: string, tagId: number) => void;
  selected: string;
}

function EditableListWrappedForTag(props: EditableListWrappedForTagType) {
  const [tags, setTags] = useState<TagType[]>([]);

  const getSmallTags = async () => {
    if (props.parentTag) {
      await apiGetSmallTags(props.clubId, props.parentTag).then((res) => {
        console.log(props.parentTag);
        console.log('getSmallTags', res.data.data);
        setTags(res.data.data);
      });
    }
  };

  const getLargeTags = async () => {
    await apiGetLargeTags(props.clubId).then((res) => {
      setTags(res.data.data);
    });
  };

  useEffect(() => {
    props.parentTag ? getSmallTags() : getLargeTags();
    console.log('tagCategories', tags);
  }, [props.parentTag]);

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
          <EditableListForTag
            originalList={tags}
            onSelect={(name: string, tagId: number) => {
              setOpen(false);
              props.onSelect(name, tagId);
            }}
            clubId={props.clubId}
            parentTag={props.parentTag}
            fetchData={props.parentTag ? getSmallTags : getLargeTags}
          />
        </Collapse>
      </List>
    </>
  );
}

export default memo(EditableListWrappedForTag);
