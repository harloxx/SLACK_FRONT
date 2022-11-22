import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: 'authToken',
  initialState: {
    authorization: null, //토큰
  },
  reducers: {
    //로그인
    SET_TOKEN: (state, action) => {
      state.authorization = action.payload.authorization; //추가데이터는 payload에 저장
    },
    //로그아웃
    DELETE_TOKEN: (state) => {
      state.authorization = null;
    },
  },
});

export const { SET_TOKEN, DELETE_TOKEN } = tokenSlice.actions;

export default tokenSlice.reducer;
