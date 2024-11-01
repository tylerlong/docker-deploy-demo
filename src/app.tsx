import { Button, Space, Typography } from 'antd';
import { auto } from 'manate/react';
import React, { useEffect } from 'react';

import { signInWithGithub, signInWithGoogle, supabase } from './supabase';

const { Title } = Typography;

const App = auto(() => {
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // User is signed in
        console.log('User signed in:', session.user);
      } else {
        // User is signed out
        console.log('User signed out');
      }
    });

    // Cleanup on unmount
    return () => {
      data.subscription?.unsubscribe();
    };
  }, []);
  return (
    <>
      <Title>Untitled App</Title>
      <Space>
        <Button
          onClick={() => {
            signInWithGithub();
          }}
        >
          Sign in with GitHub
        </Button>
        <Button
          onClick={() => {
            signInWithGoogle();
          }}
        >
          Sign in with Google
        </Button>
      </Space>
    </>
  );
});

export default App;
