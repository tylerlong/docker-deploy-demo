import { Button, Form, Input, Typography } from 'antd';
import { auto } from 'manate/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Post, Store } from '../../store';

const { Title } = Typography;

const PostForm = (props: { post?: Post; store: Store }) => {
  const { post, store } = props;
  const [title, setTitle] = React.useState(post?.title ?? '');
  const [content, setContent] = React.useState(post?.content ?? '');
  const navigate = useNavigate();
  return (
    <>
      <Title>{post ? 'Edit' : 'New'} Post</Title>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Form.Item label="Title">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Content">
          <Input.TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            onClick={() => {
              if (post) {
                store.updatePost(post.id, title, content);
              } else {
                store.createPost(title, content);
              }
              navigate('/');
            }}
          >
            {post ? 'Update' : 'Create'} Post
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default auto(PostForm);
