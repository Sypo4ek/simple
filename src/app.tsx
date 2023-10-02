import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

import AppRoutes from './routes/routes';

const Wrapper = styled.div``;

export default function App() {
  return (
    <Router>
      <Wrapper>
        <AppRoutes />
      </Wrapper>
    </Router>
  );
}
