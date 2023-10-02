import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetComments } from '../../core';
import { List, Loading } from '../../components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledLinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 40px);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 12px;
  text-align: center;
  margin: 12px 0 8px;
  color: #777777;
  transition-duration: 0.3s;
  &:hover {
    color: #69b0c6;
  }
`;

export function Comment() {
  const oldRef = useRef<string | undefined>();
  let { id } = useParams();

  const { loading, result, error, getComments } = useGetComments();

  useEffect(() => {
    if (oldRef.current !== id) {
      getComments([{ key: 'id', value: id || '' }]);
      oldRef.current = id;
    }
  }, [id]);

  return (
    <Wrapper>
      <StyledLinkContainer>
        <StyledLink to={'/'}>Вернуться на главную страницу ?</StyledLink>
        <StyledLink to={'/' + 'table'}>
          Вернуться на главную страницу c таблицей ?
        </StyledLink>
        <StyledLink to={'/' + 'list'}>
          Вернуться на главную страницу c json ?
        </StyledLink>
      </StyledLinkContainer>
      {error ? error : loading ? <Loading /> : <List result={result} />}
    </Wrapper>
  );
}
