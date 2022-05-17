// 영수증 승인에서 거래 등록에 넘기는 데이터 타입
export type CreateParamType = {
  requestId: number;
  imgUrl: string;
  date: string;
  money: number;
  items: {
    id: string;
    content: string;
    money: string;
  }[];
};

export type DetailParamType = {
  transactionId: number;
  transactionDetailId: number;
};

export type BSType = {
  bscName: string;
  bscId: number;
};

export type ASType = {
  ascName: string;
  ascId: number;
};

export type TagType = {
  tagId: number;
  tagName: string;
  parentTag: string | null;
};
