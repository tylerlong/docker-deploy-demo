import { Avatar, Button, Space, Typography } from 'antd';
import { auto } from 'manate/react';
import React from 'react';
import { Link } from 'react-router-dom';

import { Store } from '../store';
import { supabase } from '../supabase';
import Login from './login';

const { Title } = Typography;
const Home = auto((props: { store: Store }) => {
  const { store } = props;
  if (!store.session) {
    return <Login />;
  }

  return (
    <>
      <Title>Untitled App</Title>
      <Space>
        <>
          <Avatar
            src={
              <img
                src={store.session.user?.user_metadata.avatar_url}
                alt="avatar"
              />
            }
          />
          <Button onClick={() => supabase.auth.signOut()}>Sign out</Button>
        </>
      </Space>
      <Title level={2}>Posts</Title>
      <ul>
        {store.posts.map((post) => (
          <li key={post.id}>
            <Space>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
              <Button size="small" onClick={() => store.deletePost(post.id)}>
                Delete
              </Button>
              <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
            </Space>
          </li>
        ))}
      </ul>
    </>
  );
});

export default Home;
