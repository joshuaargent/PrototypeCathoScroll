import { PageHeader } from '@/components/layout/PageHeader';

import { Card } from '@/components/ui/Card';

import { SigninForm } from '@/components/auth/SigninForm';

export default function SigninPage() {
  return (
    <>
      <div className="pt-8 md:pt-12">
        <PageHeader
          title="Sign In"
          description="Continue your learning journey with CathoScroll."
        />

        <section className="pb-12 md:pb-16">
          <div className="container">
            <div className="mx-auto max-w-md">
              <Card>
                <div className="mb-8 text-center">
                  <h2 className="text-text-primary text-2xl font-semibold">Welcome Back</h2>

                  <p className="text-text-secondary mt-2">
                    Sign in to access your account, bookmarks, progress, and future learning
                    features.
                  </p>
                </div>

                <SigninForm />
              </Card>

              <div className="mt-6 text-center">
                <p className="text-text-muted text-sm">
                  Don't have an account yet? Create one to save your learning progress across
                  devices.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
