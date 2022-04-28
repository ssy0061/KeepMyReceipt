import React from 'react';

export default function GroupCreate() {
  return (
    <div>
      <h2>모임 생성</h2>
      <label htmlFor="groupName">모임 이름</label>
      <input id="groupName" type="text" placeholder="내용을 입력해주세요" />
      <button>완료</button>
    </div>
  );
}
