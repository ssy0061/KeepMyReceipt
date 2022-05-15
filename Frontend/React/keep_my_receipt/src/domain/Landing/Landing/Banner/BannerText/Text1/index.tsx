import { Bloodtype } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';

const TypingText = () => {
  const text = '모임관리 쉽게 하고싶다면?';
  const fontSize = '4rem';
  const color = 'black';
  const [Text, setText] = useState('');
  const [Count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setText((Text) => {
        let updated = Text;
        updated = Text + text[Count];
        return updated;
      });
      setCount(Count + 1);
    }, 100);
    Count === text.length && clearInterval(interval);
    return () => clearInterval(interval);
  });
  return (
    <p
      style={{
        fontSize: `${fontSize}`,
        color: `${color}`,
        fontWeight: 'bold',
      }}
    >
      {Text}
    </p>
  );
};

export default TypingText;
