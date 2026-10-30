import Link from 'next/link';

import { ArrowRight, BookOpen, Compass, Search, Layers } from 'lucide-react';

import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function OnboardingPage() {
  return (
    <>
      <PageHeader
        title="Welcome to CathoScroll"
        description="Learn Catholic teaching one topic at a time."
      />

      <section className="pb-12 md:pb-16">
        <div className="container max-w-4xl">
          <div className="space-y-6">
            <Card>
              <div className="text-center">
                <div className="bg-accent-light text-accent mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                  <BookOpen className="h-8 w-8" />
                </div>

                <h2 className="text-text-primary mt-6 text-3xl font-bold">You're all set</h2>

                <p className="text-text-secondary mx-auto mt-4 max-w-2xl">
                  CathoScroll is designed to make Catholic teaching easy to explore. Open the feed,
                  discover topics, and go deeper whenever something interests you.
                </p>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-4">
                <div className="bg-accent-light text-accent flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                  <BookOpen className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold">1. Open the Feed</h3>

                  <p className="text-text-secondary mt-2">
                    The feed is the heart of CathoScroll. Each card presents a Catholic question
                    with a clear answer, making it easy to learn a little at a time.
                  </p>

                  <div className="bg-bg-secondary border-border mt-4 rounded-xl border p-4">
                    <p className="text-text-muted text-sm">Example Topic</p>

                    <p className="mt-2 font-semibold">What is Grace?</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-4">
                <div className="bg-accent-light text-accent flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                  <Layers className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold">2. Move Through Topics</h3>

                  <p className="text-text-secondary mt-2">
                    Browse naturally through the feed using swipe gestures, keyboard navigation, or
                    on-screen controls. Learn at your own pace and discover new topics as you go.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-4">
                <div className="bg-accent-light text-accent flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                  <Compass className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold">3. Dive Deeper</h3>

                  <p className="text-text-secondary mt-2">
                    Open any topic to explore a fuller explanation, related Catechism references,
                    and supporting Scripture passages.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-4">
                <div className="bg-accent-light text-accent flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                  <Search className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold">4. Explore Further</h3>

                  <p className="text-text-secondary mt-2">
                    Looking for a specific teaching? Use Categories and Search to quickly find
                    answers about God, Prayer, the Sacraments, the Church, Salvation, and much more.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <h3 className="text-text-primary text-xl font-semibold">
                  Start Small. Learn Daily.
                </h3>

                <p className="text-text-secondary mx-auto mt-3 max-w-2xl">
                  You don't need to read everything at once. Even a few minutes each day can help
                  you build a stronger understanding of the Catholic faith.
                </p>
              </div>
            </Card>

            <div className="flex justify-center">
              <Link href="/">
                <Button
                  size="lg"
                  style={{
                    color: '#ffffff',
                  }}
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
