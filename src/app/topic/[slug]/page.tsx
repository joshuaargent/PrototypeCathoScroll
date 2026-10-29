import Link from 'next/link';
import { notFound } from 'next/navigation';

import { topics } from '@/data/topics';
import { Badge } from '@/components/ui/Badge';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TopicPage({
  params,
}: Props) {
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

      {/* Back */}

      <Link
        href="/"
        className="
          inline-flex
          items-center
          text-sm
          text-text-secondary
          hover:text-text-primary
          transition-colors
        "
      >
        ← Explore Feed
      </Link>

      {/* Hero */}

      <section className="mt-8 mb-16">

        <Badge
          variant="accent"
          size="lg"
        >
          {topic.category}
        </Badge>

        <div
          className="
            mt-4
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
            mt-4
            text-5xl
            font-extrabold
            leading-tight
            md:text-7xl
          "
        >
          {topic.question}
        </h1>

        <p
          className="
            mt-8
            max-w-4xl
            text-2xl
            font-semibold
            leading-relaxed
            md:text-3xl
          "
        >
          {topic.answer}
        </p>

      </section>

      {/* Explanation */}

      <section className="mb-16">

        <h2 className="mb-6 text-3xl font-bold">
          Explanation
        </h2>

        <p
          className="
            max-w-4xl
            text-lg
            leading-relaxed
          "
        >
          {topic.explanation}
        </p>

      </section>

      {/* Catechism */}

      <section
        className="
          mb-16
          rounded-2xl
          border
          border-border
          bg-accent-light/10
          p-8
        "
      >

        <h2 className="mb-6 text-3xl font-bold">
          Catechism
        </h2>

        <p
          className="
            text-lg
            leading-relaxed
          "
        >
          {topic.catechism.text}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">

          {topic.catechism.paragraphs.map(
            (paragraph) => (
              <span
                key={paragraph}
                className="
                  rounded-full
                  border
                  border-border
                  px-3
                  py-1
                  text-sm
                "
              >
                CCC {paragraph}
              </span>
            )
          )}

        </div>

      </section>

      {/* Scripture */}

      <section
        className="
          mb-16
          rounded-2xl
          border
          border-border
          p-8
        "
      >

        <h2 className="mb-3 text-3xl font-bold">
          Scripture
        </h2>

        <p
          className="
            mb-6
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
            pl-6
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

          <h2 className="mb-6 text-3xl font-bold">
            Related Topics
          </h2>

          <div className="grid gap-4 md:grid-cols-2">

            {relatedTopics.map(
              (related) => (
                <Link
                  key={related.slug}
                  href={`/topic/${related.slug}`}
                  className="
                    block
                    rounded-2xl
                    border
                    border-border
                    p-6
                    transition-colors
                    hover:bg-bg-secondary
                  "
                >

                  <Badge
                    variant="accent"
                    size="sm"
                  >
                    {related.category}
                  </Badge>

                  <h3
                    className="
                      mt-3
                      text-lg
                      font-semibold
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
              <Link
                href={`/topic/${previousTopic.slug}`}
                className="
                  text-text-secondary
                  hover:text-text-primary
                  transition-colors
                "
              >
                ← Previous Topic
              </Link>
            ) : (
              <div />
            )}
          </div>

          <Link
            href="/"
            className="
              font-medium
              text-accent
              hover:text-accent-hover
              transition-colors
            "
          >
            Explore Feed
          </Link>

          <div>
            {nextTopic ? (
              <Link
                href={`/topic/${nextTopic.slug}`}
                className="
                  text-text-secondary
                  hover:text-text-primary
                  transition-colors
                "
              >
                Next Topic →
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