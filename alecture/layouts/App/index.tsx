//페이지 단위로 코드 스플리팅
const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));

// import LogIn from "@pages/LogIn";
import React from 'react';
import loadable from '@loadable/component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Workspace from '@layouts/Workspace'; // 라우터에서는 WS만 등록해두기

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
      <Route path="/workspace" element={<Workspace />} />
    </Routes>
  );
};

export default App;
