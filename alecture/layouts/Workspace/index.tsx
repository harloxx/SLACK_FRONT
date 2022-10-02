// react-dom 버전 강의와 다름 (강의 v6)

// import fetcher from '@utils/fetcher';
import axios from 'axios';
import loadable from '@loadable/component';
import React, { FC, useCallback, useState } from 'react';
import { Navigate } from 'react-router';
import useSWR from 'swr';
import {
  Channels,
  Chats,
  Header,
  LogOutButton,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from '@layouts/Workspace/styles'; // 컴포넌트별로 스타일 적용
import fetcher from '@utils/fetcher';
import gravatar from 'gravatar';
import { Routes, Route } from 'react-router-dom';
import Menu from '@components/Menu/index'; // import 방식

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: FC = ({ children }) => {
  const [shaowUserMenu, setShowUserMenu] = useState(false);
  // const { data, error, revalidate, mutate } = useSWR('http://localhost:3095/api/users', fetcher);
  const { data, error, mutate } = useSWR('http://localhost:3095/api/users', fetcher); 

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        mutate(false);
      });
  }, []);

  // toggle 함수
  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  if (!data) {
    return <Navigate to="/login" />;
  }

  return (
    // gravatar : 랜덤 이미지
    // layout : 페이지(pages)별로 공통인 부분
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(data.email, { s: '28px', d: 'retro' })} alt={data.nickname} />
            {shaowUserMenu && (
              <Menu style={{ right: 0, top: 38 }} show={shaowUserMenu} onCloseModal={onClickUserProfile}>
                <ProfileModal>
                  <img src={gravatar.url(data.email, { s: '36px', d: 'retro' })} alt={data.nickname} />
                  <div>
                    <span id="profile-name">{data.nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
              </Menu>
            )}
          </span>
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>test</Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>menu scroll</MenuScroll>
          <MenuScroll>dm</MenuScroll>
        </Channels>
        <Chats>
          <Routes>
            <Route path="/workspace/channel" element={Channel} />
            <Route path="/workspace/dm" element={DirectMessage} />
          </Routes>
        </Chats>
      </WorkspaceWrapper>
      {children}
    </div>
    // 주소 설계 **
    // 1. 고정된 상위 rapper로 묶어주고 랜더링되는 페이지만 children으로 받아오기
    // 2. rapper로 묶지 않고, 어떤 페이지를 랜더링 할지 상위에서 판단하기
  );
};

export default Workspace;