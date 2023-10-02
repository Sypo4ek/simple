import React from 'react';
import styled from 'styled-components';
import { TComment } from '../../core';
import { Loading } from '../Loading/Loading';

type Props = {
  result: Array<TComment>;
  isLoading?: boolean;
  errorMessage?: string;
};

const open = '{';
const close = '}';
const Wrapper = styled.div`
  margin: 20px;
`;
const ListContent = styled.div`
  margin-left: 10px;
`;
const Content = styled.div`
  margin-left: 20px;
`;

export function List({ result, errorMessage, isLoading }: Props) {
  if (errorMessage) {
    return <Wrapper>{errorMessage}</Wrapper>;
  }

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          [
          {result.map((comment, index) => {
            const commentParams = Object.entries(comment);

            return (
              <ListContent key={index}>
                {open}
                {commentParams.map(([value, content], index) => (
                  <Content key={value + content + index}>
                    {value} : {content},
                  </Content>
                ))}
                {close},
              </ListContent>
            );
          })}
          ]
        </>
      )}
    </Wrapper>
  );
}
