import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { CommentSlice } from './slices';

const rootReducer = combineReducers({
  CommentReducer: CommentSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
