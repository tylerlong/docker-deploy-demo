import { auto } from 'manate/react';
import React from 'react';

import { Store } from '../../store';
import Login from '../login';
import PostForm from './form';

const NewPost = (props: { store: Store }) => {
  const { store } = props;
  if (!store.session) {
    return <Login />;
  }
  return <PostForm store={store} />;
};

export default auto(NewPost);
