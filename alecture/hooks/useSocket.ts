import { useCallback } from 'react';
import { Socket } from 'socket.io-client';
import io from 'socket.io-client';

const backUrl = process.env.NODE_ENV === 'production' ? 'https://sleact.nodebird.com' : 'http://localhost:3095';
//프론트와 백엔드가 한번만 연결을 맺어도 된다.
//socket.connet(연결)/emit(보내기)/on(받기)/disconnect(끊기)
//끊기를 안하면 채널에서 디엠갔을 때, 채널 채팅까지 디엠으로 간다.
//지금 로그인한 사람들을 실시간으로 알려줘야 한다. 그럼 onlinelist로 반환해준다.
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
  if (!sockets[workspace]) {
    sockets[workspace] = io(`${backUrl}/ws-${workspace}`, {
      transports: ['websocket'],
    });
    console.info('create socket', workspace, sockets[workspace]);
  }

  return [sockets[workspace], disconnect];
};

export default useSocket;
