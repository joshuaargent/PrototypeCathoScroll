import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/signin');
  }

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  async function signOut() {
    'use server';

    const supabase = await createClient();

    await supabase.auth.signOut();

    redirect('/');
  }

  return (
    <main className="container py-12">
      <div className="mt-8 mb-16">
        <h1 className="text-5xl font-extrabold md:text-7xl">Account</h1>

        <p className="text-text-secondary mt-4 text-lg">
          Welcome back, {profile?.display_name ?? 'Friend'}.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Badge variant="accent" size="lg">
            @{profile?.username ?? 'username'}
          </Badge>

          <Badge variant="accent" size="lg">
            {profile?.subscription_tier === 'premium' ? 'Premium' : 'Free Account'}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="border-border rounded-2xl border p-6">
          <p className="text-text-muted text-sm">Email Address</p>

          <p className="mt-3 text-lg font-medium">{user.email}</p>
        </article>

        <article className="border-border rounded-2xl border p-6">
          <p className="text-text-muted text-sm">Username</p>

          <p className="mt-3 text-lg font-medium">@{profile?.username}</p>
        </article>

        <article className="border-border rounded-2xl border p-6">
          <p className="text-text-muted text-sm">Membership</p>

          <p className="mt-3 text-lg font-medium">
            {profile?.subscription_tier === 'premium' ? 'Premium' : 'Free'}
          </p>
        </article>

        <article className="border-border rounded-2xl border p-6">
          <p className="text-text-muted text-sm">Joined</p>

          <p className="mt-3 text-lg font-medium">
            {profile?.created_at
              ? new Date(profile.created_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : 'Recently'}
          </p>
        </article>
      </div>

      <section className="border-border mt-16 border-t pt-8">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold">Sign Out</h2>

          <p className="text-text-secondary mt-2">
            Sign out of your CathoScroll account on this device.
          </p>

          <form action={signOut} className="mt-6">
            <Button type="submit" variant="secondary" size="lg">
              Sign Out
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
