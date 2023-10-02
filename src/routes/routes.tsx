import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants';
import { Home, Page404, Comment } from '../pages';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.COMMENT} element={<Comment />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
