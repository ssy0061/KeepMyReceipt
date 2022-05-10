import { useState } from 'react';

function useInput(value: string | number) {
  // 사용자 input에 따라 변하는 값
  const [changedValue, setChangedValue] = useState(value);

  // onChange 속성에 넣어줄 함수
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const newValue = e.target.value;
    // 숫자 형식이면 숫자로 저장하고, 아니면 문자열로 저장
    setChangedValue(Number(newValue) ? Number(newValue) : newValue);
  };

  // 변하는 값과 함수를 반환
  return { changedValue, handleChange };
}

export default useInput;
