import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import useInput from '@hooks/useInput';
import { Container } from '@pages/Channel/styles';

import { IDM } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import gravatar from 'gravatar';
import { Header } from './styles';
import makeSection from '@utils/makeSection';

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  //해당 워크스페이스의 해당멤버
  //디엠리스트에서 사용자를 클릭하면 주소가 그 사용자 아이디로 바뀌니까
  //(없는 주소로 요청보내면 json파일이 오는 게 아니라 html파일이 온다.)
  const { data: userData } = useSWR(`http://localhost:3095/api/workspaces/${workspace}/users/${id}`, fetcher);
  //내 정보(보내는 사람이 누군지 알기위해)
  const { data: myData } = useSWR(`http://localhost:3095/api/users`, fetcher);
  const [chat, onChangeChat, setChat] = useInput('');
  //채팅을 서버에 보내고, swr을 통해 채팅을 가져온다.
  const { data: chatData, mutate: mutateChat } = useSWR<IDM[]>(
    `http://localhost:3095/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`,
    fetcher,
  );
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      //채팅이 실제로 존재한다면 어떤 워크스페이스/아이디에게 채팅을 보내라
      if (chat?.trim()) {
        axios
          .post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
            content: chat,
          })
          .then(() => {
            setChat('');
          })
          .catch(console.error);
      }
    },
    [chat, chatData, myData, userData, workspace, id],
  );
  //데이터 없으면 화면 안 띄움
  if (!userData || !myData) {
    return null;
  }
  const chatSections = makeSection(chatData ? [...chatData].reverse() : []);
  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>
      </Header>
      {/* 채팅 올라가는 부분 */}
      <ChatList chatSections={chatSections} />
      {/* 채팅 치는 부분 */}
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default DirectMessage;
