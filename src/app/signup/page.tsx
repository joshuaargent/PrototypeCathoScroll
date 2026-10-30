import { Card } from '@/components/ui/Card';

import { SignupForm } from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <main className="container py-12">
      <div className="mt-8 mb-16 text-center">
        <h1 className="text-5xl font-extrabold md:text-7xl">Join CathoScroll</h1>

        <p className="text-text-secondary mt-4 text-lg">
          Start your learning journey one topic at a time.
        </p>
      </div>

      <div className="mx-auto max-w-xl">
        <Card>
          <div className="mb-8 text-center">
            <h2 className="text-text-primary text-2xl font-semibold">Create Account</h2>

            <p className="text-text-secondary mt-2">
              Create your free account to save bookmarks, track your progress, and access future
              community features.
            </p>
          </div>

          <SignupForm />
        </Card>

        <div className="mt-6 text-center">
          <p className="text-text-muted text-sm">
            Free accounts include bookmarks, progress tracking, and future learning features.
          </p>
        </div>
      </div>
    </main>
  );
}
