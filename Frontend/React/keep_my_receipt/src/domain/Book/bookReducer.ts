/** 상태 */

import { ParamType } from './types';
import { TransactionType } from './api/bookApi';

/* 상태 타입 선언 */
export type TypeNameKeys = '자산' | '지출' | '수입' | '예산' | '';

export type BookItemType = {
  id?: number;
  name: string;
  price: number;
  type: TypeNameKeys;
  largeCategory: string;
  smallCategory: string;
  categoryId: number;
  largeTag: string;
  smallTag: string;
  tagId: number;
  memo: string;
};

export type BookItemKeys =
  | 'name'
  | 'price'
  | 'type'
  | 'largeCategory'
  | 'smallCategory'
  | 'categoryId'
  | 'largeTag'
  | 'smallTag'
  | 'tagId'
  | 'memo';

export type BookState = {
  transactionId?: number;
  clubId: number;
  date: string;
  totalPrice: number;
  imageUrl?: string;
  items: BookItemType[];
};

export const blankBookItem: BookItemType = {
  name: '',
  price: 0,
  type: '',
  largeCategory: '',
  smallCategory: '',
  categoryId: 0,
  largeTag: '',
  smallTag: '',
  tagId: 0,
  memo: '',
};

export const blankBook: BookState = {
  clubId: 0,
  date: new Date().toISOString().split('T')[0], // YYYY-MM-DD 형식
  totalPrice: 0,
  items: [blankBookItem],
};

export const initBookState = (param: ParamType, clubId: number): BookState => {
  if (param) {
    return {
      clubId: clubId,
      date: param.date,
      totalPrice: param.money,
      imageUrl: param.imgUrl,
      items: param.items.map((item) => ({
        ...blankBookItem,
        name: item.content,
        price: Number(item.money),
        // 각 아이템마다의 id가 뭐지?
      })),
    };
  } else {
    return {
      ...blankBook,
      clubId: clubId,
    };
  }
};

export const toTransactionType = (
  bookState: BookState,
  requestId?: number,
): TransactionType => ({
  ...(requestId && { requestId: requestId }),
  totalPrice: bookState.totalPrice,
  date: bookState.date,
  list: bookState.items.map((item) => ({
    name: item.name,
    price: item.price,
    type: item.type,
    categoryId: item.categoryId,
    ...(item.tagId && { tagId: item.tagId }),
    ...(item.memo && { memo: item.memo }),
  })),
});

/** 액션 */

/* 액션 타입 */
const MODULE_NAME = 'book';
const UPDATE_BOOK = `${MODULE_NAME}/UPDATE_BOOK` as const;
const CREATE_ITEM = `${MODULE_NAME}/CREATE_ITEM` as const;
const UPDATE_ITEM = `${MODULE_NAME}/UPDATE_ITEM` as const;
const DELETE_ITEM = `${MODULE_NAME}/DELETE_ITEM` as const;

/* 액션 생성함수 */
export const updateBook = (keyName: string, keyValue: string | number) => ({
  type: UPDATE_BOOK,
  keyName,
  keyValue,
});

export const createItem = (
  indexToInsert?: number,
  itemName?: string,
  itemValue?: number,
) => ({
  type: CREATE_ITEM,
  indexToInsert,
  itemName,
  itemValue,
});

export const updateItem = (
  itemIndex: number,
  keyName: BookItemKeys,
  keyValue: string | number,
) => ({
  type: UPDATE_ITEM,
  itemIndex,
  keyName,
  keyValue,
});

export const deleteItem = (itemIndex: number) => ({
  type: DELETE_ITEM,
  itemIndex,
});

/* 액션 생성함수 타입 */
export type BookAction =
  | ReturnType<typeof updateBook>
  | ReturnType<typeof createItem>
  | ReturnType<typeof updateItem>
  | ReturnType<typeof deleteItem>;

/** 리듀서 */
export default function bookReducer(
  state: BookState,
  action: BookAction,
): BookState {
  switch (action.type) {
    case UPDATE_BOOK:
      /** 거래 내역 수정 */
      return {
        ...state,
        [action.keyName]: action.keyValue,
      };

    case CREATE_ITEM:
      /** 아이템 추가 */
      // 새로 넣을 아이템 정의
      const newItem: BookItemType = {
        ...blankBookItem,
        // 이름과 가격이 주어진 경우에는 넣고, 없으면 빈 값으로 초기화
        name: action.itemName ? action.itemName : '',
        price: action.itemValue ? action.itemValue : 0,
      };

      return {
        ...state,
        items: action.indexToInsert
          ? [
              // 0번 인덱스부터 삽입하려는 인덱스 전까지
              ...state.items.slice(0, action.indexToInsert),
              // 원하는 인덱스에 삽입
              newItem,
              // 원래 인덱스부터 끝까지
              ...state.items.slice(action.indexToInsert),
            ]
          : state.items.concat(newItem),
        //삽입할 인덱스가 주어지지 않으면 맨 끝에 추가
      };

    case UPDATE_ITEM:
      /** 배열에서 해당 인덱스를 찾은 경우,
       * 해당 아이템 객체의 일부 내용을 수정 후 반환 */
      return {
        ...state,
        items: state.items.map((item, index) =>
          // 키-값을 받아 갱신
          index === action.itemIndex
            ? { ...item, [action.keyName]: action.keyValue }
            : item,
        ),
      };

    case DELETE_ITEM:
      /** 배열에서 해당 인덱스를 빼고 나머지를 반환 */
      if (state.items.length < 2) {
        alert('거래 내역에 아이템은 1개 이상 있어야 합니다!');
        return state;
      }

      return {
        ...state,
        items: [
          // 처음부터 해당 인덱스 전까지
          ...state.items.slice(0, action.itemIndex),
          // 해당 인덱스 건너뛰고 다음부터 끝까지
          ...state.items.slice(action.itemIndex + 1),
        ],
      };
    default:
      return state;
  }
}
