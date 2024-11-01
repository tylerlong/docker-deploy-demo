import { Avatar, Button, Space, Typography } from 'antd';
import { auto } from 'manate/react';
import React from 'react';

import { Store } from './store';
import { supabase } from './supabase';

const { Title } = Typography;

const App = auto((props: { store: Store }) => {
  const { store } = props;
  return (
    <>
      <Title>Untitled App</Title>
      <Space>
        {store.supabaseSession ? (
          <>
            <Avatar
              src={
                <img
                  src={store.supabaseSession.user?.user_metadata.avatar_url}
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
    </>
  );
});

export default App;
