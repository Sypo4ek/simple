import React from 'react';
import styled from 'styled-components';

const fontSize = '24px';

const Wrapper = styled.div`
  color: #000000;
  font-size: ${fontSize};
`;

const info = 'Ошибка загрузки';

export function Error() {
  return <Wrapper>{info}</Wrapper>;
}
