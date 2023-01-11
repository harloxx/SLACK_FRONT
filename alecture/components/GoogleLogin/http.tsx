import useInput from '@hooks/useInput';
import { Button, Form } from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { useParams } from 'react-router';
import { Navigate } from 'react-router';
import useSWR, { mutate } from 'swr';

const LoginPage = () => {
  let params = useParams();
  const googleID = params.id;
  const googleCode = params.code;
  const [token, setToken] = useState(''); //받아온 토큰을 임시저장할 공간
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  //토큰을 알아야 함

  //...

  //구글 로그인에 성공한다면 토큰을 헤더에 넣어서 백으로 보낸다.
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post('http://fake-slack.shop/members/google', {
          headers: {
            Authorization: googleID,
            code: googleCode,
          },
        })
        .then((res) => {
          console.log('구글로그인 성공', res.data.Authorization);
          setToken(res.data.Authorization);
          localStorage.setItem('token', JSON.stringify(res.data.Authorization));
        })
        .catch((error) => {
          console.log(Error);
        });
    },
    [email, password, mutate],
  );

  //로그인 성공하면 페이지 이동
  /*if (!error && userData) {
    console.log('로그인됨', userData);
    return <Navigate replace to="/workspace/sleact/channel/일반" />;
  }*/

  //로그인 실패
  const onGoogleFailure = (res: { accessToken: string; tokenId: string }) => {
    window.alert('구글 로그인에 실패하였습니다.');
    console.log('error', res);
  };

  //구글 로그인 버튼 클릭시 구글로그인 페이지로 이동 => 여기서 토큰 받아와야 하는디..
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <p>구글 로그인 페이지입니다.</p>
        <Button
          onClick={() => {
            location.href = 'http://fake-slack.shop/oauth2/authorization/google';
          }}
        >
          구글 로그인 제발 해줘
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
