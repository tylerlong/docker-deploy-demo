import { Button, Form, Typography } from 'antd';
import { auto } from 'manate/react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Store } from '../../store';
import NotFound from '../404';
import Login from '../login';

const { Title } = Typography;

const EditPost = (props: { store: Store }) => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { store } = props;
  if (!store.session) {
    return <Login />;
  }

  let post: (typeof store.posts)[0] | undefined;
  if (id) {
    post = store.posts.find((post) => post.id === id);
    if (!post) {
      return <NotFound />;
    }
    setTitle(post.title);
    setContent(post.content);
  }

  return (
    <>
      <Title>{id ? 'Edit' : 'New'} Post</Title>
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
              if (id) {
                store.updatePost(id, title, content);
              } else {
                store.createPost(title, content);
              }
            }}
          >
            {id ? 'Update' : 'Create'} Post
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default auto(EditPost);
