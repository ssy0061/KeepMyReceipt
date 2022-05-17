export type ParamType = {
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

export type TagType = {
  tagId: number;
  tagName: string;
  parentTag: string | null;
};

export type BSType = {
  bscName: string;
  bscId: number;
};

export type ASType = {
  ascName: string;
  ascId: number;
};
