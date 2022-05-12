import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/login');
  };
  return (
    <>
      <h1>안녕하세요</h1>
      <p>
        랜딩페이지랜딩페이지랜딩페이지랜딩페이지랜딩페이지랜딩페이지랜딩페이지
        랜딩페이지랜딩페이지 랜딩페이지 랜딩페이지 랜딩페이지 랜딩페이지
        랜딩페이지 랜딩페이지랜딩페이지 랜딩페이지 랜딩페이지
        랜딩페이지랜딩페이지 랜딩페이지랜딩페이지 랜딩페이지 랜딩페이지
        랜딩페이지 랜딩페이지 랜딩페이지 랜딩페이지랜딩페이지
        랜딩페이지랜딩페이지
      </p>
      <button onClick={onClick}>로그인하러 가기</button>
    </>
  );
}
