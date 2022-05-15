// 참고; 벨로퍼트님 강의, https://react.vlpt.us/integrate-api/03-useAsync.html
// 출처: https://gist.github.com/velopert/554ab444fd1731e3047c4adde10ed36d

import { useReducer, useEffect, DependencyList } from 'react';

type LoadingAction = {
  type: 'LOADING';
};

type SuccessAction<T> = {
  type: 'SUCCESS';
  data: T;
};

type ErrorAction<T> = {
  type: 'ERROR';
  error: T;
};

type AsyncAction<D, E> = LoadingAction | SuccessAction<D> | ErrorAction<E>;

export type AsyncState<D, E> = {
  loading: boolean;
  data: D | null;
  error: E | null;
};

function asyncReducer<D, E>(
  state: AsyncState<D, E>,
  action: AsyncAction<D, E>,
): AsyncState<D, E> {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
  }
}

type PromiseFn<T> = () => Promise<T>;

function useAsync<D, E, F extends PromiseFn<D>>(
  promiseFn: F,
  deps: DependencyList = [],
  skip: false,
) {
  const [state, dispatch] = useReducer(asyncReducer, {
    loading: false,
    data: null,
    error: null,
  } as AsyncState<D, E>);

  async function fetchData() {
    dispatch({ type: 'LOADING' });
    try {
      const data = await promiseFn();
      dispatch({
        type: 'SUCCESS',
        data,
      });
    } catch (e) {
      dispatch({
        type: 'ERROR',
        error: e,
      });
    }
  }

  useEffect(() => {
    if (skip) return;
    fetchData();
  }, deps);

  return [state, fetchData] as const;
}

export default useAsync;

// /** 상태 */
// /* 상태 타입 선언 */
// type AsyncState<DataType> = {
//   loading: boolean;
//   data: AxiosResponse<DataType> | null;
//   error: AxiosError | null;
// };

// /** 액션 */
// /* 액션 타입 */
// const MODULE_NAME = 'async';
// const LOADING = `${MODULE_NAME}/LOADING` as const;
// const SUCCESS = `${MODULE_NAME}/SUCCESS` as const;
// const ERROR = `${MODULE_NAME}/ERROR` as const;

// /* 액션 생성함수 */
// const load = () => ({
//   type: LOADING,
// });

// const success = (data: AxiosResponse) => ({
//   type: SUCCESS,
//   data,
// });

// const error = (error: AxiosError) => ({
//   type: ERROR,
//   error,
// });

// /* 액션 생성함수 타입 */
// export type AsyncAction =
//   | ReturnType<typeof load>
//   | ReturnType<typeof success>
//   | ReturnType<typeof error>;

// /** 리듀서 */
// function reducer<DataType>(
//   state: AsyncState<DataType>,
//   action: AsyncAction,
// ): AsyncState<DataType> {
//   switch (action.type) {
//     case LOADING:
//       return {
//         loading: true,
//         data: null,
//         error: null,
//       };
//     case SUCCESS:
//       return {
//         loading: false,
//         data: action.data,
//         error: null,
//       };
//     case ERROR:
//       return {
//         loading: false,
//         data: null,
//         error: action.error,
//       };
//     default:
//       throw new Error(`Unhandled action type: ${action.type}`);
//   }
// }

// function useAsync(callback: () => AxiosResponse, deps: DependencyList = []) {
//   const [state, dispatch] = useReducer(reducer, {
//     loading: false,
//     data: null,
//     error: null,
//   });

//   const fetchData = async () => {
//     dispatch(load());
//     try {
//       const response = await callback();
//       dispatch(success(response.data));
//     } catch (e) {
//       dispatch(error(e));
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     // eslint 설정을 다음 줄에서만 비활성화
//     // eslint-disable-next-line
//   }, deps);

//   return [state, fetchData];
// }

// export default useAsync;
