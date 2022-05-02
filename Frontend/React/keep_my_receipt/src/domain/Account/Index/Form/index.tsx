import { useState } from 'react';
import './index.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className="auth">
      {/* 상단 글자 */}
      <h1>{isLogin ? '로그인' : '회원가입'}</h1>

      <form>
        <div className="control">
          {/* 회원가입  */}
          {!isLogin ? (
            <label htmlFor="name">사용자 이름을 입력해주세요.</label>
          ) : (
            ''
          )}
          {!isLogin ? <input type="string" id="name" required /> : ''}
        </div>
        <div className="control">
          <label htmlFor="email">사용할 이메일을 입력해주세요.</label>
          <input type="email" id="email" required />
        </div>
        <div className="control">
          <label htmlFor="password">사용할 비밀번호를 입력해주세요.</label>
          <input type="password" id="password" required />
        </div>
        <div className="control">
          {!isLogin ? <input type="password" id="password" required /> : ''}
        </div>
        <div className="actions">
          <button>{isLogin ? '로그인' : '회원가입'}</button>
          <button
            type="button"
            className="toggle"
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
