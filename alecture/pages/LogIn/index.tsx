import useInput from '@hooks/useInput';
import { Button as But2, Error, Form, Header, Input, Label, LinkContainer } from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import { SET_TOKEN } from '../../src/store/Auth';

import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcherWithToken from '@utils/fetcherWithToken';

//useInput의 return값이 []안에 변수에 대응된다.
//회원가입 -> 워크스페이스에 초대 -> 초대된 사람들 중에서 채널에 초대

const LogIn = () => {
  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser>('http://fake-slack.shop/members/current', (url) => fetcherWithToken(url, token), {
    dedupingInterval: 2000, // 2초마다 데이터 업데이트
  });

  const [logInError, setLogInError] = useState(false);
  const [token, setToken] = useState('');
  const [refToken, setRefToken] = useState('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const nav = useNavigate();
  const dispatch = useDispatch();

  //const token2 = useSelector((state)=>state.authToken.value);
  //console.log(token2);
  console.log(token);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLogInError(false);
      axios
        .post(
          'http://fake-slack.shop/members/login',
          { email, password },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          window.localStorage.setItem('token', JSON.stringify(res.headers['authorization']));
          console.log(res.headers);
          console.log(res.headers['authorization']);
          console.log(res.data);
          setToken(res.headers['authorization']);
        })
        .catch((error) => {
          setLogInError(error.response?.data?.code === 401);
          console.log(error);
        })
        .finally(() => {
          setTimeout(() => {
            nav('/loading');
          }, 1000);
        });
    },
    [email, password, token],
  );

  //일반로그인
  //유저정보가 있다면 채널 페이지로 이동
  if (!error && userData) {
    console.log('로그인됨', userData);
    return <Navigate replace to="/workspace/sleact/channel/일반" />;
  }

  //구글로그인
  //토큰(유저식별번호)가 있다면 채널 페이지로 이동
  if (token) {
    console.log('로그인됨', token);
    return <Navigate replace to="/loading" />;
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <But2 type="submit">일반 로그인</But2>
      </Form>

      <But2 type="button" onClick={() => (location.href = 'http://fake-slack.shop/oauth2/authorization/google')}>
        구글 로그인
      </But2>

      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <a href="/signup">회원가입 하러가기</a>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
