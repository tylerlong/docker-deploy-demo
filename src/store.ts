import { RealtimeChannel, Session } from '@supabase/supabase-js';
import { $, exclude, manage } from 'manate';

import { supabase } from './supabase';

export class Post {
  id: string;
  title: string;
  content: string;
}

export class Store {
  session: Session | null = null;
  posts: Post[] = [];
  postChannel: RealtimeChannel | undefined;

  async fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', this.session?.user?.id);
    if (error) throw error;
    this.posts = data.map((post) => post as Post);
  }

  async updatePost(id: string, title: string, content: string) {
    const { error } = await supabase
      .from('posts')
      .update({ title, content })
      .eq('id', id);
    if (error) throw error;
  }

  async deletePost(id: string) {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) throw error;
  }

  async createPost(title: string, content: string) {
    const { error } = await supabase
      .from('posts')
      .insert({ title, content, user_id: this.session?.user?.id });
    if (error) throw error;
  }

  public subscribe() {
    const postsChannel = supabase
      .channel('public:posts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        (payload) => {
          const { eventType, new: newPost, old: oldPost } = payload;
          switch (eventType) {
            case 'INSERT': {
              $(store.posts).begin();
              store.posts.push(newPost as Post);
              $(store.posts).commit();
              break;
            }
            case 'UPDATE': {
              $(store.posts).begin();
              const index = store.posts.findIndex(
                (post) => post.id === newPost.id,
              );
              store.posts[index] = newPost as Post;
              $(store.posts).commit();
              break;
            }
            case 'DELETE': {
              $(store.posts).begin();
              const index = store.posts.findIndex(
                (post) => post.id === oldPost.id,
              );
              store.posts.splice(index, 1);
              $(store.posts).commit();
              break;
            }
            default: {
              break;
            }
          }
        },
      )
      .subscribe();
    this.postChannel = exclude(postsChannel);
  }

  public signIn(session: Session) {
    this.session = session;
    this.fetchPosts();
    this.subscribe();
  }

  public signOut() {
    this.session = null;
    this.posts = [];
    if (this.postChannel) {
      this.postChannel.unsubscribe();
      this.postChannel = undefined;
    }
  }
}

const store = manage(new Store());

supabase.auth.onAuthStateChange(async (event, session) => {
  if (session) {
    if (!store.session) {
      // fist time login
      store.signIn(session);
    } else {
      store.session = session;
    }
  } else {
    store.signOut();
  }
});

export default store;
