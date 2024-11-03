import { Typography } from 'antd';
import { auto } from 'manate/react';
import React from 'react';
import { useParams } from 'react-router-dom';

import { Store } from '../../store';
import NotFound from '../404';
import Login from '../login';

const { Title, Text } = Typography;

const Post = (props: { store: Store }) => {
  const { store } = props;
  const { id } = useParams();
  if (!store.session) {
    return <Login />;
  }
  const post = store.posts.find((post) => post.id === id);
  if (!post) {
    return <NotFound />;
  }
  return (
    <>
      <Title>{post.title}</Title>
      <Text>{post.content}</Text>
    </>
  );
};

export default auto(Post);
