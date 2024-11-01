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
  } else {
    store.supabaseSession = undefined;
  }
});

export default store;
