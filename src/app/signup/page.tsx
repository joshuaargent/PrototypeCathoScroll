import { PageHeader } from '@/components/layout/PageHeader';

import { Card } from '@/components/ui/Card';

import { SignupForm } from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <>
      <div className="pt-8 md:pt-12">
        <PageHeader
          title="Create Account"
          description="Start your learning journey with CathoScroll."
        />

        <section className="pb-12 md:pb-16">
          <div className="container">
            <div className="mx-auto max-w-md">
              <Card>
                <div className="mb-8 text-center">
                  <h2 className="text-text-primary text-2xl font-semibold">Join CathoScroll</h2>
                </div>

                <SignupForm />
              </Card>

              <div className="mt-6 text-center">
                <p className="text-text-muted text-sm">
                  Free accounts include bookmarks, progress tracking, and future community features.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
