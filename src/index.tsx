import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from './components/home';
import Post from './components/post';
import EditPost from './components/post/edit';
import store from './store';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home store={store} />} />
        <Route path="/post/:id" element={<Post store={store} />} />
        <Route path="/post/new" element={<EditPost store={store} />} />
        <Route path="/post/edit/:id" element={<EditPost store={store} />} />
      </Routes>
    </Router>
  </StrictMode>,
);
