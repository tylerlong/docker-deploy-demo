import { Button, Form, Typography } from 'antd';
import { auto } from 'manate/react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Store } from '../../store';
import NotFound from '../404';
import Login from '../login';

const { Title } = Typography;

const EditPost = (props: { store: Store }) => {
  const { id } = useParams();
  const { store } = props;
  let originalTitle = '';
  let originalContent = '';
  useEffect(() => {
    return () => {
      if (post) {
        post.title = originalTitle;
        post.content = originalContent;
      }
    };
  }, []);
  if (!store.session) {
    return <Login />;
  }
  const post = store.posts.find((post) => post.id === id);
  if (!post) {
    return <NotFound />;
  }
  originalTitle = post.title;
  originalContent = post.content;
  return (
    <>
      <Title>Edit Post</Title>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Form.Item label="Title">
          <input
            type="text"
            value={post.title}
            onChange={(e) => (post.title = e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Content">
          <textarea
            value={post.content}
            onChange={(e) => (post.content = e.target.value)}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            onClick={() => store.updatePost(post.id, post.title, post.content)}
          >
            Update Post
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default auto(EditPost);
