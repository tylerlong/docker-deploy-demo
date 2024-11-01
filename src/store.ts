import { Session } from '@supabase/supabase-js';
import { exclude, manage } from 'manate';

import { supabase } from './supabase';

export class Store {
  public count = 0;
  public supabaseSession: Session | undefined = undefined;
}

const store = manage(new Store());

supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    store.supabaseSession = exclude(session);
    console.log('User signed in:', session.user);
  } else {
    store.supabaseSession = undefined;
    console.log('User signed out');
  }
});

export default store;
