import React from 'react';
import { Navigate } from 'react-router';

const LoginLoading = () => {
  const token = localStorage.getItem('token');

  if (token) {
    console.log('로그인됨', token);
    return <Navigate replace to="/workspace/sleact/channel/일반" />;
  }
  return (
    <div>
      <p>로딩 중</p>
    </div>
  );
};

export default LoginLoading;
