'use client';

import { useRouter } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';

export function UserMenu() {
  const router = useRouter();

  async function signOut() {
    const supabase =
      createClient();

    await supabase.auth.signOut();

    router.push('/');

    router.refresh();
  }

  return (
    <button
      onClick={signOut}
      className="
        rounded-lg
        border
        border-border
        px-4
        py-2
      "
    >
      Sign Out
    </button>
  );
}