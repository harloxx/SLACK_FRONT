import React, { useCallback } from 'react';

const Workspace = () => {
  const onLogout = useCallback(() => {}, []);
  return <button onClick={onLogout}>로그아웃</button>;
};

export default Workspace;
