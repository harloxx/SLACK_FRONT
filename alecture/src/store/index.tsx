import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './Auth';

//스토어
export default configureStore({
  reducer: {
    authToken: tokenReducer, //만들어둔 리듀서 연결
  },
});
