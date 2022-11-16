//페이지 단위로 코드 스플리팅
const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Workspace = loadable(() => import('@layouts/Workspace'));

// import LogIn from "@pages/LogIn";
import React from 'react';
import loadable from '@loadable/component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from '@components/GoogleLogin/http';
import LoginLoading from '@pages/LoginLoading';

// 라우터에서는 WS만 등록해두기

//첫 시작
//npm run dev하면 웹팩 실행되면서
//http://localhost:3090 에서 열어야 핫리소스 적용됨
//cd alecture 해서 진행할 것

//Redirect는 /시  /login으로 옮겨줌

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      {/* <Route path="/workspace/sleact/channel/일반" element={<Workspace />} /> */}
      <Route path="/workspace/:workspace/*" element={<Workspace />} />
      <Route path="/loading" element={<LoginLoading />} />
    </Routes>
    // /workspace/슬리액/ 앞에 콜론을 붙이면 파라미터(사용자가 자유롭게 바꿀 수 있음)가 됨
    // /workspace/test해도 Workspace로 가고, /workspace/sleact해도 Workspace로 간다.
    // 그렇게 되면 주소만으로 데이터를 알 수 있게 된다. 예를들어 /slect/channel/1
    // 이 데이터를 useParam을 사용해 :부분에 넣어주면 효과적!
    // 유저의 정보(어디 워크페이스, 어디 채널인지) 를 주소만 봐도 알 수 있게 해준다면 베스트!
  );
};

export default App;
