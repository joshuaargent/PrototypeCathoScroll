import { Card } from '@/components/ui/Card';

import { SigninForm } from '@/components/auth/SigninForm';

export default function SigninPage() {
  return (
    <main className="container py-12">
      <div className="mt-8 mb-16 text-center">
        <h1 className="text-5xl font-extrabold md:text-7xl">Welcome Back</h1>

        <p className="text-text-secondary mt-4 text-lg">
          Continue your learning journey with CathoScroll.
        </p>
      </div>

      <div className="mx-auto max-w-lg">
        <Card>
          <div className="mb-8 text-center">
            <h2 className="text-text-primary text-2xl font-semibold">Sign In</h2>

            <p className="text-text-secondary mt-2">
              Access your account, bookmarks, progress, and future learning features.
            </p>
          </div>

          <SigninForm />
        </Card>

        <div className="mt-6 text-center">
          <p className="text-text-muted text-sm">
            Don't have an account yet? Create one to save your learning progress across devices.
          </p>
        </div>
      </div>
    </main>
  );
}
