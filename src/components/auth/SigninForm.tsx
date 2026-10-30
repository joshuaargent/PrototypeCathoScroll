'use client';

import { useState } from 'react';

import Link from 'next/link';

import { useRouter } from 'next/navigation';

import { Eye, EyeOff, Loader2 } from 'lucide-react';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

import { createClient } from '@/lib/supabase/client';

export function SigninForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    setError('');

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        setError('Invalid email or password.');

        return;
      }

      router.refresh();

      router.push('/account');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-accent-light/30 text-text-secondary rounded-xl p-4 text-sm">
        Sign in to access your account, bookmarks, learning progress, and future CathoScroll
        features.
      </div>

      <Input
        label="Email"
        type="email"
        value={email}
        placeholder="you@example.com"
        autoComplete="email"
        disabled={loading}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          placeholder="Enter your password"
          autoComplete="current-password"
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-text-muted hover:text-text-primary absolute top-[38px] right-3 transition-colors"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={loading}
        style={{
          color: '#ffffff',
        }}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing In...
          </>
        ) : (
          'Sign In'
        )}
      </Button>

      <p className="text-text-secondary text-center text-sm">
        Don't have an account?{' '}
        <Link href="/signup" className="text-accent font-medium hover:underline">
          Create Account
        </Link>
      </p>
    </form>
  );
}
