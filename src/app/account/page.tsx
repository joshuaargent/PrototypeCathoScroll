import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

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

  const initials =
    profile?.display_name?.[0]?.toUpperCase() ?? profile?.username?.[0]?.toUpperCase() ?? 'U';

  return (
    <>
      <PageHeader title="Account" description="Manage your CathoScroll account." />

      <section className="pb-12 md:pb-16">
        <div className="container max-w-3xl">
          <div className="space-y-6">
            <Card>
              <div className="flex flex-col items-center text-center">
                <div className="bg-accent-light text-accent flex h-20 w-20 items-center justify-center rounded-full text-3xl font-bold">
                  {initials}
                </div>

                <h2 className="text-text-primary mt-4 text-2xl font-semibold">
                  {profile?.display_name ?? 'User'}
                </h2>

                <p className="text-text-secondary mt-1">@{profile?.username ?? 'username'}</p>
              </div>
            </Card>

            <Card>
              <div className="space-y-6">
                <div>
                  <p className="text-text-muted text-sm">Email Address</p>

                  <p className="text-text-primary mt-1 font-medium">{user.email}</p>
                </div>

                <div>
                  <p className="text-text-muted text-sm">Membership</p>

                  <p className="text-text-primary mt-1 font-medium capitalize">
                    {profile?.subscription_tier ?? 'free'}
                  </p>
                </div>

                <div>
                  <p className="text-text-muted text-sm">Username</p>

                  <p className="text-text-primary mt-1 font-medium">@{profile?.username}</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <h3 className="text-text-primary text-lg font-semibold">Your Learning Journey</h3>

                <p className="text-text-secondary mt-2 text-sm">
                  Bookmarks, progress tracking, achievements, and additional account features will
                  appear here as CathoScroll continues to grow.
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
    </>
  );
}
