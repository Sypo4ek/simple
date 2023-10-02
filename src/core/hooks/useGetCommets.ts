import { SearchProps, fetchComments } from '../api';
import {
  CommentSelector,
  setCommentsError,
  setCommentsLoading,
  setCommentsSuccess,
  useAppDispatch,
  useAppSelector,
} from '../redux';

export function useGetComments() {
  const dispatch = useAppDispatch();
  const selectedComments = useAppSelector(CommentSelector);

  const loading = selectedComments.loading;
  const result = selectedComments.result;
  const error = selectedComments.error;

  const getComments = async (params?: SearchProps) => {
    dispatch(setCommentsLoading(true));

    return await fetchComments(params)
      .then((json) => {
        dispatch(setCommentsLoading(false));
        dispatch(setCommentsSuccess(json));
      })
      .catch((e) => {
        dispatch(setCommentsError(e.message));
      });
  };

  return {
    loading,
    result,
    error,
    getComments,
  };
}
