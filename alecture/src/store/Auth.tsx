import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: 'authToken',
  initialState: {
    authenticated: false, //로그인 여부
    accessToken: null, //토큰
  },
  reducers: {
    //로그인
    SET_TOKEN: (state, action) => {
      state.authenticated = true;
      state.accessToken = action.payload; //추가데이터는 payload에 저장
    },
    //로그아웃
    DELETE_TOKEN: (state) => {
      state.authenticated = false;
      state.accessToken = null;
    },
  },
});

export const { SET_TOKEN, DELETE_TOKEN } = tokenSlice.actions;

export default tokenSlice.reducer;
