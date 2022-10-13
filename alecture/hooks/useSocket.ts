import { useCallback } from 'react';
import { Socket } from 'socket.io-client';
import io from 'socket.io-client';
//EIO로 시작하는게 웹소켓임
const backUrl = process.env.NODE_ENV === 'production' ? 'https://sleact.nodebird.com' : 'http://localhost:3095';
//프론트와 백엔드가 한번만 연결을 맺어도 된다.
//socket.connet(연결)/emit(보내기)/on(받기)/disconnect(끊기)
//끊기를 안하면 채널에서 디엠갔을 때, 채널 채팅까지 디엠으로 간다.
//지금 로그인한 사람들을 실시간으로 알려줘야 한다. 그럼 onlinelist로 반환해준다.
//백엔드에서 소켓아이디를 보내주면 프론트는 그걸 받았고 .io를 통해 연결하는 개념
//서버에 로그인했음을 알리면 서버는 지금 접속한 리스트를 전해준다.
const sockets: { [key: string]: SocketIOClient.Socket } = {};
const useSocket = (workspace?: string): [SocketIOClient.Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (workspace && sockets[workspace]) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }, [workspace]);
  if (!workspace) {
    return [undefined, disconnect];
  }
  //만들어 둔게 없었다면 새로 만들고, 있었다면 기존의 것 리턴
  //이때 백엔드쪽 웹소켓 버전이 3이면 에러나니까 2로 해달라고 해야함.
  if (!sockets[workspace]) {
    sockets[workspace] = io(`${backUrl}/ws-${workspace}`, {
      //http로 연결받지 말고 웹소켓만 해라
      transports: ['websocket'],
    });
    console.info('create socket', workspace, sockets[workspace]);
  }

  return [sockets[workspace], disconnect];
};

export default useSocket;
