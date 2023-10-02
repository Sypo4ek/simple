import { TComment } from '../redux';

const URL = 'https://jsonplaceholder.typicode.com/comments';

export type SearchProps = Array<{
  key: keyof TComment;
  value: TComment[keyof TComment];
}>;

function getCurrentValuesString(params?: SearchProps): string {
  if (!params) {
    return '';
  }

  const url = params.reduce((current, next, index) => {
    if (next.key && next.value) {
      return (
        current +
        next.key +
        '=' +
        next.value +
        (params.length - 1 !== index ? '&' : '')
      );
    }
    return current;
  }, '?');

  return url;
}

export const fetchComments = async (params?: SearchProps) => {
  const searchString = URL + getCurrentValuesString(params);

  const result = await fetch(searchString);

  return await result.json();
};
