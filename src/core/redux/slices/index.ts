import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TComment = {
  id: number;
  body: string;
  email: string;
  name: string;
  postId: number;
  _sort?: string;
  _order?: 'asc' | 'desc';
};

export enum TCommentTypes {
  id = 'number',
  body = 'string',
  email = 'string',
  name = 'string',
  postId = 'number',
}

export type ExceptComment = Omit<TComment, '_sort' | '_order'>;

export const commentKeys: Array<keyof ExceptComment> = [
  'id',
  'body',
  'email',
  'name',
  'postId',
];

export interface ICommentstate {
  loading: boolean;
  error: string | undefined;
  result: Array<TComment>;
}

const initialState: ICommentstate = {
  loading: false,
  error: undefined,
  result: [],
};

export const CommentSlice = createSlice({
  name: 'Comment',
  initialState,
  reducers: {
    resetComments: (state) => {
      state.loading = false;
      state.error = undefined;
      state.result = [];
    },
    setCommentsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCommentsSuccess: (state, action: PayloadAction<[]>) => {
      state.result = action.payload;
    },
    setCommentsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setCommentsLoading, setCommentsSuccess, setCommentsError } =
  CommentSlice.actions;

export default CommentSlice.reducer;

export const CommentSelector = (state: RootState) => state.CommentReducer;
