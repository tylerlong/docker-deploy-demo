import { Avatar, Button, Form, Space, Typography } from 'antd';
import { auto } from 'manate/react';
import React from 'react';

import { Store } from './store';
import { supabase } from './supabase';

const { Title, Text } = Typography;

const App = auto((props: { store: Store }) => {
  const { store } = props;
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  return (
    <>
      <Title>Untitled App</Title>
      <Space>
        {store.session ? (
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
        ) : (
          <>
            <Button
              onClick={() =>
                supabase.auth.signInWithOAuth({
                  provider: 'github',
                })
              }
            >
              Sign in with GitHub
            </Button>
            <Button
              onClick={() =>
                supabase.auth.signInWithOAuth({
                  provider: 'google',
                })
              }
            >
              Sign in with Google
            </Button>
          </>
        )}
      </Space>
      <Title level={2}>Posts</Title>
      <ul>
        {store.posts.map((post) => (
          <li key={post.id}>
            <Text>{post.title}</Text>
            <Text>{post.content}</Text>
            <Button size="small" onClick={() => store.deletePost(post.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <Title level={2}>Create Post</Title>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Form.Item label="Title">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Content">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            onClick={() => {
              store.createPost(title, content);
            }}
          >
            Create Post
          </Button>
        </Form.Item>
      </Form>
    </>
  );
});

export default App;
