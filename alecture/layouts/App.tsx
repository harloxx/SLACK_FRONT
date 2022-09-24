const LogIn =loadable(()=>import("@pages/LogIn"));
const SignUp =loadable(()=>import("@pages/SignUp"));
import React from "react";
import loadable from "@loadable/component";
import { Navigate, Router, Routes } from "react-router";
import {Switch,Route,Redirect} from "react-router-dom";
//첫 시작
//npm run dev하면 웹팩 실행되면서
//http://localhost:3090 에서 열어야 핫리소스 적용됨
//cd alecture 해서 진행할 것

//Redirect는 /시  /login으로 옮겨줌
const App = () => {
    return (

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
    
      </Routes>
    );
  };

  export default App;
