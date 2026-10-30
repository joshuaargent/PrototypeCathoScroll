export interface Profile {
  id: string;

  username: string;

  display_name: string;

  avatar_url: string | null;

  bio: string | null;

  created_at: string;

  subscription_tier: 'free' | 'premium';
}
