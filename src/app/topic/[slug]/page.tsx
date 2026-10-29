import Link from 'next/link';
import { notFound } from 'next/navigation';

import { topics } from '@/data/topics';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface TopicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: TopicPageProps) {
  const { slug } = await params;

  const topic = topics.find(
    (t) => t.slug === slug
  );

  if (!topic) {
    return {
      title: 'Topic Not Found',
    };
  }

  return {
    title: `${topic.question} | CathoScroll`,
    description: topic.explanation.slice(
      0,
      160
    ),
  };
}

export default async function TopicPage({
  params,
}: TopicPageProps) {
  const { slug } = await params;

  const topicIndex = topics.findIndex(
    (t) => t.slug === slug
  );

  if (topicIndex === -1) {
    notFound();
  }

  const topic = topics[topicIndex];

  const previousTopic =
    topicIndex > 0
      ? topics[topicIndex - 1]
      : null;

  const nextTopic =
    topicIndex < topics.length - 1
      ? topics[topicIndex + 1]
      : null;

  const relatedTopics = topics
    .filter(
      (t) =>
        t.category === topic.category &&
        t.slug !== topic.slug
    )
    .slice(0, 4);

  return (
    <main className="container py-12">

      {/* Top CTA */}

      <div className="mb-10">
        <Link href="/">
          <Button variant="outline">
            ← Explore Feed
          </Button>
        </Link>
      </div>

      {/* Hero */}

      <section className="mb-16">

        <Badge
          variant="accent"
          size="lg"
        >
          {topic.category}
        </Badge>

        <div
          className="
            mt-6
            text-sm
            uppercase
            tracking-wider
            text-text-muted
          "
        >
          Topic {topicIndex + 1} of {topics.length}
        </div>

        <h1
          className="
            mt-2
            max-w-4xl
            text-5xl
            font-extrabold
            leading-tight
            md:text-7xl
          "
        >
          {topic.question}
        </h1>

        <div
          className="
            mt-8
            rounded-2xl
            border
            border-border
            bg-bg-card
            p-8
          "
        >
          <div
            className="
              mb-3
              text-sm
              uppercase
              tracking-wider
              text-text-muted
            "
          >
            Answer
          </div>

          <p
            className="
              max-w-none
              text-2xl
              font-semibold
              leading-relaxed
              md:text-3xl
            "
          >
            {topic.answer}
          </p>
        </div>

      </section>

      {/* Explanation */}

      <section className="mb-16">

        <h2 className="mb-6">
          Explanation
        </h2>

        <div className="prose max-w-none">
          <p>{topic.explanation}</p>
        </div>

      </section>

      {/* Catechism */}

      <section
        className="
          mb-12
          rounded-2xl
          border
          border-border
          bg-accent-light/10
          p-8
        "
      >
        <h2 className="mb-4">
          Catechism
        </h2>

        <p
          className="
            max-w-none
            text-lg
            leading-relaxed
          "
        >
          {topic.catechism.text}
        </p>
      </section>

      {/* Scripture */}

      <section
        className="
          mb-16
          rounded-2xl
          border
          border-border
          bg-bg-card
          p-8
        "
      >
        <h2 className="mb-2">
          Scripture
        </h2>

        <p
          className="
            mb-4
            text-sm
            text-text-secondary
          "
        >
          {topic.scripture.reference}
        </p>

        <blockquote
          className="
            border-l-4
            border-accent
            pl-4
            text-xl
            italic
          "
        >
          {topic.scripture.text}
        </blockquote>
      </section>

      {/* Related Topics */}

      {relatedTopics.length > 0 && (
        <section className="mb-16">

          <h2 className="mb-6">
            Related Topics
          </h2>

          <div className="grid gap-4 md:grid-cols-2">

            {relatedTopics.map(
              (related) => (
                <Link
                  key={related.slug}
                  href={`/topic/${related.slug}`}
                  className="
                    rounded-2xl
                    border
                    border-border
                    bg-bg-card
                    p-6
                    transition-all
                    hover:-translate-y-1
            "
                  >
                    {related.question}
                  </h3>
                </Link>
              )
            )}

          </div>

        </section>
      )}

      {/* Navigation */}

      <section
        className="
          border-t
          border-border
          pt-8
        "
      >

        <div
          className="
            flex
            flex-col
            gap-4
            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          <div>
            {previousTopic ? (
              {`/topic/${previousTopic.slug}`}
                <Button variant="outline">
                  ← Previous Topic
                </Button>
              </Link>
            ) : (
              <div />
            )}
          </div>

          /
            <Button>
              Explore Feed
            </Button>
          </Link>

          <div>
            {nextTopic ? (
              {`/topic/${nextTopic.slug}`}
                <Button variant="outline">
                  Next Topic →
                </Button>
              </Link>
            ) : (
              <div />
            )}
          </div>

        </div>

      </section>

    </main>
  );
}