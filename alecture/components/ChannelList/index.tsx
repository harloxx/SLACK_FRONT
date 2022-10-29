// import useSocket from '@hooks/useSocket';
import { CollapseButton } from '@components/DMList/styles';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { FC, useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';

//SWR이 나온 후부터 props의 사용이 급격히 줄어들음. 하지만 함수나 스타일 등은 여전히 props의 사용이 불가피함.
const ChannelList: FC = () => {
  const { workspace } = useParams<{ workspace?: string }>();
  // const [socket] = useSocket(workspace);
  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser>('http://localhost:3095/api/users', fetcher, {
    dedupingInterval: 2000, // 2초
  });
  const { data: channelData } = useSWR<IChannel[]>(
    userData ? `http://localhost:3095/api/workspaces/${workspace}/channels` : null,
    fetcher,
  );
  //토글바 열려있는 게 기본값
  const [channelCollapse, setChannelCollapse] = useState(false);

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  return (
    <>
      <h2>
        <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          <p>Ⅴ </p>
        </CollapseButton>
        <span>Channels</span>
      </h2>
      <div>
        {/* 토글바가 열려있다면 채널 정보를 띄운다. */}
        {!channelCollapse &&
          channelData?.map((channel) => {
            return (
              <NavLink key={channel.name} to={`/workspace/${workspace}/channel/${channel.name}`}>
                <span># {channel.name}</span>
              </NavLink>
            );
          })}
      </div>
    </>
  );
};

export default ChannelList;
