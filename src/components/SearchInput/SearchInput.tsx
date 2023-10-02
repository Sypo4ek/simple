import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  ExceptComment,
  SearchProps,
  TCommentTypes,
  commentKeys,
} from '../../core';

type Props = {
  onClick: (params?: SearchProps) => void;
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.div`
  position: relative;
  width: 150px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const Input = styled.input`
  height: 15px;
  padding: 8px 12px;
  border-color: rgba(0, 20, 100, 0.4);
  border-radius: 10px;
  border-width: 1px;
  &:focus {
    outline-width: 0;
    border-color: rgba(0, 10, 100, 0.85);
  }
`;

const Selection = styled.select`
  padding: 10px 12px;
  border-radius: 10px;
  border-width: 1px;
  border-color: rgba(0, 20, 100, 0.4);
  border
`;

const Option = styled.option``;

export function SearchInput({ onClick }: Props) {
  const [state, setState] = useState<keyof ExceptComment>(commentKeys[1]);

  const ref = useRef<HTMLInputElement | null>(null);

  const handleChange = useCallback(
    (event?: ChangeEvent<HTMLInputElement>) => {
      onClick([
        {
          key: state,
          value: event?.target.value || '',
        },
      ]);
    },
    [state]
  );

  const handleClick = (type: keyof ExceptComment) => {
    const target = ref.current;
    if (target && 'value' in target) {
      if (target.value.length > 0) {
        onClick();
        target.value = '';
      }
      setState(type);

      target.focus();
    }
  };

  const handleSelectionChange = (event?: ChangeEvent<HTMLSelectElement>) => {
    handleClick(event?.target.value as keyof ExceptComment);
  };

  return (
    <Wrapper>
      <InputContainer>
        <Input
          placeholder={`Поиск по ${state}`}
          ref={ref}
          type={TCommentTypes[state]}
          onChange={handleChange}
          id="input"
        />
      </InputContainer>
      <Selection onChange={handleSelectionChange} defaultValue={commentKeys[1]}>
        {commentKeys.map((item) => (
          <Option key={item} value={item}>
            Поиск по {item}
          </Option>
        ))}
      </Selection>
    </Wrapper>
  );
}
