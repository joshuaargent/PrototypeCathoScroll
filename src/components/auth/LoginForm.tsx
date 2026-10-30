'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function LoginForm() {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      // Supabase login tomorrow
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Email"
        type="email"
        value={email}
        placeholder="you@example.com"
        autoComplete="email"
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

      <div className="flex justify-end">
        <Link href="/forgot-password" className="text-accent text-sm hover:underline">
          Forgot Password?
        </Link>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={loading}
        style={{ color: '#ffffff' }}
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

      <div className="relative py-2">
        <div className="border-border absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-bg-primary text-text-muted px-3">Or</span>
        </div>
      </div>

      <Button type="button" variant="secondary" size="lg" className="w-full">
        Continue with Google
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
