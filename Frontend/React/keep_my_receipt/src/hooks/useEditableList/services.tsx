import { EditableItemType } from './types';

/** string 배열을 EditableList에서 쓸 수 있는 객체 배열로 바꿔주는 함수 */
export const toEditableArray = (list: string[]): EditableItemType[] =>
  list.map((item) => ({ name: item, editable: false }));
