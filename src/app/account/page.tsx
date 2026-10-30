import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  async function signOut() {
    'use server';

    const supabase = await createClient();

    await supabase.auth.signOut();

    redirect('/');
  }

  const displayName = profile?.display_name ?? 'User';

  const username = profile?.username ?? 'username';

  const initials = displayName
    .split(' ')
    .map((word) => word[0]?.toUpperCase())
    .slice(0, 2)
    .join('');

  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-2xl">
        <div className="space-y-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-accent-light text-accent flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold">
              {initials}
            </div>

            <h1 className="text-text-primary mt-6 text-3xl font-bold">{displayName}</h1>

            <p className="text-text-secondary mt-2 text-lg">@{username}</p>
          </div>

          <Card>
            <div className="space-y-6">
              <div>
                <p className="text-text-muted text-sm">Email Address</p>

                <p className="text-text-primary mt-1 font-medium">{user.email}</p>
              </div>

              <div>
                <p className="text-text-muted text-sm">Membership</p>

                <div className="bg-accent-light text-accent mt-2 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
                  Free Plan
                </div>
              </div>

              <div>
                <p className="text-text-muted text-sm">Username</p>

                <p className="text-text-primary mt-1 font-medium">@{username}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="space-y-4 text-center">
              <h2 className="text-text-primary text-lg font-semibold">What's Next?</h2>

              <p className="text-text-secondary">
                Bookmarks, progress tracking, learning streaks, achievements, and community features
                will appear here as CathoScroll grows.
              </p>
            </div>
          </Card>

          <form action={signOut}>
            <Button type="submit" variant="secondary" size="lg" className="w-full">
              Sign Out
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
