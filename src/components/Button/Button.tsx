import React from 'react';
import styled from 'styled-components';

type Props = {
  text: string;
  onClick: () => void;
  title?: string;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
};

const fontSize = '12px';
const loadingText = 'загрузка...';

const ButtonContianer = styled.button<{ cursor: 'progress' | 'pointer' }>`
  font-size: ${fontSize};
  border: 1px solid #dbf5f7;
  border-radius: 12px;
  padding: 8px 12px;
  margin: 0 4px;
  background-color: #fffef7;
  min-width: 150px;
  cursor: ${({ cursor }) => cursor};
`;

export function Button({
  text,
  onClick,
  title,
  isLoading = false,
  disabled = false,
  className,
}: Props) {
  return (
    <ButtonContianer
      className={className}
      onClick={onClick}
      title={isLoading ? loadingText : title}
      cursor={isLoading ? 'progress' : 'pointer'}
      disabled={isLoading || disabled}
    >
      {isLoading ? loadingText : text}
    </ButtonContianer>
  );
}
