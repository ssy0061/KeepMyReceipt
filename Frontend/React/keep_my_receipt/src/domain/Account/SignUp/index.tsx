import './index.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Button,
  ButtonProps,
  Stack,
  TextField,
  Container,
} from '@mui/material';
import { yellow } from '@mui/material/colors';
import Navigation from '../../../header';

export default function SignUpForm() {
  // 스타일
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(yellow[50]),
    '&.MuiButton-contained': {
      color: 'white',
    },
    backgroundColor: yellow[800],
    '&:hover': {
      backgroundColor: yellow[800],
    },
  }));

  //회원가입 - 로그인 형식바꾸는 부분
  const switchAuthModeHandler = () => {
    navigate('/login');
  };

  // input value 가져오기
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  // 대기중 버튼
  const [isLoading, setIsLoading] = useState(false);

  // 유효성 검사
  const [helpEmailText, setEmailHelpText] = useState('');
  const [helpPasswordText, setPasswordHelpText] = useState('');
  const [helpPasswordCheckText, setPasswordCheckHelpText] = useState('');

  // 제출

  const onNickName = (e: any) => {
    setNickName(e.target.value);
  };
  const onCheckEmail = (e: any) => {
    setEmail(e.target.value);
    // 1. 이메일 중복 확인 ** 오류
    axios
      .get(`/api/spring/crew/checkEmail/${email}`)
      .then(function (response) {
        console.log(response.data);
        if (response.data.data == true) {
          setEmailHelpText('중복된 이메일입니다');
        } else {
          setEmailHelpText('');
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    // 2. 이메일 형식
    // const regEmail =
    //   /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    // if (regEmail.test(email) === false) {
    //   setEmailHelpText('이메일 형식이 맞지 않습니다.');
    // } else {
    //   setEmailHelpText('');
    // }
  };

  const onCheckPasswordRight = (e: any) => {
    setPassword(e.target.value);
    // 3. 비밀번호 8자이상 + (영문 + 숫자 + 특수문자 1개 이상)
    const regExp =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (regExp.test(password) === false) {
      setPasswordHelpText(
        '비밀번호는 8자 이상, 특수문자, 영문자, 숫자를 1개 이상 포함해야 합니다.',
      );
    } else {
      setPasswordHelpText('');
    }
  };

  const onCheckPasswordEqual = (e: any) => {
    setCheckPassword(e.target.value);
    // 4. 비밀번호와 비밀번호 확인 일치
    if (password != checkPassword) {
      setPasswordCheckHelpText('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordCheckHelpText('');
    }
  };

  // 회원가입 후 페이지 이동
  const navigate = useNavigate();
  const submitHandler = (event: any) => {
    event.preventDefault();

    axios
      .post('/api/spring/crew/signup', {
        email: email,
        password: password,
        name: nickName,
      })
      .then(function (response) {
        console.log(response.data);
        console.log(email);
        console.log(password);
        console.log(nickName);
        setIsLoading(false);
        const errorMessage = response.data.msg;
        if (response.data.output == 0) {
          alert(errorMessage);
        } else {
          navigate('/login');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Navigation />
      <h1 className="h1">회원가입</h1>
      <form onSubmit={submitHandler}>
        <Stack spacing={1.5}>
          <TextField
            onBlur={onNickName}
            type="text"
            required
            fullWidth
            label="이름"
            variant="outlined"
            size="small"
          />
          <TextField
            onBlur={onCheckEmail}
            placeholder="이메일을 입력해주세요"
            required
            fullWidth
            label="이메일"
            type="email"
            helperText={helpEmailText}
            variant="outlined"
            size="small"
          />

          <TextField
            onBlur={onCheckPasswordRight}
            required
            fullWidth
            label="비밀번호"
            type="password"
            variant="outlined"
            helperText={helpPasswordText}
            size="small"
          />
          <TextField
            onBlur={onCheckPasswordEqual}
            type="password"
            fullWidth
            label="비밀번호 확인"
            helperText={helpPasswordCheckText}
            variant="outlined"
            size="small"
            required
          />
          <Stack>
            {!isLoading && (
              <ColorButton variant="contained" type="submit">
                확인
              </ColorButton>
            )}
            {isLoading && <Button variant="contained">로딩중...</Button>}
            <Button type="button" onClick={switchAuthModeHandler}>
              <h5>계정이 있으신가요? 로그인 하러가기</h5>
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}
