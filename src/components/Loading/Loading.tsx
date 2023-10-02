import React from 'react';
import styled from 'styled-components';

const MESSAGE = 'loading...';

const Wrapper = styled.div`
  width: 100%;
`;

const Tr = styled.tr`
  width: 100%;
`;

const StyleContent = { fontSize: '32px', color: '#777777' };

export function Loading({ isTable }: { isTable?: boolean }) {
  if (isTable) {
    return (
      <Tr>
        <td colSpan={5} align="center" style={StyleContent}>
          {MESSAGE}
        </td>
      </Tr>
    );
  }
  return (
    <Wrapper>
      <h1 style={StyleContent}>{MESSAGE}</h1>
    </Wrapper>
  );
}
