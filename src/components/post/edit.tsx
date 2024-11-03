import { Button, Form, Typography } from 'antd';
import { auto } from 'manate/react';
import React from 'react';
import { useParams } from 'react-router-dom';

import { Store } from '../../store';
import NotFound from '../404';
import Login from '../login';

const { Title } = Typography;

const EditPost = auto((props: { store: Store }) => {
  const { store } = props;
  if (!store.session) {
    return <Login />;
  }

  let post: (typeof store.posts)[0] | undefined;
  // const { id } = useParams();
  // if (id) {
  //   post = store.posts.find((post) => post.id === id);
  //   if (!post) {
  //     return <NotFound />;
  //   }
  // }

  return '';

  // const [title, setTitle] = React.useState(post?.title ?? '');
  // const [content, setContent] = React.useState(post?.content ?? '');

  // return (
  //   <>
  //     <Title>{id ? 'Edit' : 'New'} Post</Title>
  //     <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
  //       <Form.Item label="Title">
  //         <input
  //           type="text"
  //           value={title}
  //           onChange={(e) => setTitle(e.target.value)}
  //         />
  //       </Form.Item>
  //       <Form.Item label="Content">
  //         <textarea
  //           value={content}
  //           onChange={(e) => setContent(e.target.value)}
  //         />
  //       </Form.Item>
  //       <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
  //         <Button
  //           onClick={() => {
  //             if (id) {
  //               store.updatePost(id, title, content);
  //             } else {
  //               store.createPost(title, content);
  //             }
  //           }}
  //         >
  //           {id ? 'Update' : 'Create'} Post
  //         </Button>
  //       </Form.Item>
  //     </Form>
  //   </>
  // );
});

export default EditPost;
