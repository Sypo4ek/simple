import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, List, Table } from '../../components';

import { useGetComments } from '../../core';

type ContentType = 'list' | 'table' | undefined;

type Buttons = Array<{
  id: string;
  type?: ContentType;
  text: string;
  onClick: () => void;
  title: string;
}>;

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 30px calc(100vh - 30px);
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentView = {
  list: List,
  table: Table,
};

export function Home() {
  let { type } = useParams();
  const [contentType, setContentType] = useState<ContentType>(
    type as ContentType
  );

  const ViewComponent = contentType && ContentView[contentType];

  const navigate = useNavigate();

  const { loading, getComments, ...commentData } = useGetComments();

  useEffect(() => {
    contentType && getComments();
  }, [contentType]);

  const handleClick = (type?: ContentType) => {
    setContentType(type);
    navigate(`/${type || ''}`);
  };

  const buttonsContent: Buttons = [
    {
      id: 'table',
      type: 'table',
      text: 'Загрузить Таблицей',
      onClick: () => {
        handleClick('table');
      },
      title: 'Загрузить Таблицей',
    },
    {
      id: 'list',
      type: 'list',
      text: 'Загрузить Списком',
      onClick: () => {
        handleClick('list');
      },
      title: 'Загрузить Списком',
    },
    {
      id: 'clear',
      text: 'Очистить',
      onClick: () => {
        handleClick();
      },
      title: 'Очистить',
    },
  ];

  return (
    <Wrapper>
      <ButtonContainer>
        {buttonsContent.map(({ id, text, type, ...other }) => (
          <Button
            key={id}
            text={text}
            isLoading={type && type === contentType && loading}
            {...other}
          />
        ))}
      </ButtonContainer>

      {ViewComponent && (
        <ViewComponent
          isLoading={loading}
          {...commentData}
          onFilter={getComments}
        />
      )}
    </Wrapper>
  );
}
