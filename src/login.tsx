import { Button } from 'antd';
import React from 'react';

import { supabase } from './supabase';

const Login = () => {
  return (
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
  );
};

export default Login;
