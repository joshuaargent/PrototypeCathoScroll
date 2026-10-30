import Link from 'next/link';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

import { Badge } from '@/components/ui/Badge';

import { topics } from '@/data/topics';

export default async function BookmarksPage() {
  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    redirect('/signin');
  }

  const { data: bookmarks } =
    await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', {
        ascending: false,
      });

  const bookmarkedTopics =
    topics.filter((topic) =>
      bookmarks?.some(
        (bookmark) =>
          bookmark.topic_id ===
          topic.id
      )
    );

  return (
    <main className="container py-12">
      <div className="mt-8 mb-16">
        <h1
          className="
            text-5xl
            font-extrabold
            md:text-7xl
          "
        >
          Bookmarks
        </h1>

        <p
          className="
            mt-4
            text-lg
            text-text-secondary
          "
        >
          Topics you've saved for later.
        </p>

        <div className="mt-6">
          <Badge
            variant="accent"
            size="lg"
          >
            {
              bookmarkedTopics.length
            }{' '}
            Saved
            {bookmarkedTopics.length ===
            1
              ? ' Topic'
              : ' Topics'}
          </Badge>
        </div>
      </div>

      {bookmarkedTopics.length ===
      0 ? (
        <section
          className="
            border-border
            rounded-2xl
            border
            p-12
            text-center
          "
        >
          <h2
            className="
              text-2xl
              font-bold
            "
          >
            No bookmarks yet
          </h2>

          <p
            className="
              mt-3
              text-text-secondary
            "
          >
            Save topics while browsing
            the feed and they'll appear
            here for easy access later.
          </p>

          <Link
            href="/"
            className="
              mt-6
              inline-flex
              text-lg
              font-medium
              text-text-primary
              hover:text-text-secondary
            "
          >
            Explore the Feed →
          </Link>
        </section>
      ) : (
        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {bookmarkedTopics.map(
            (topic) => (
              <Link
                key={topic.id}
                href={`/topic/${topic.slug}`}
              >
                <article
                  className="
                    h-full
                    rounded-2xl
                    border
                    border-border
                    p-6
                    transition-colors
                    hover:bg-bg-secondary
                  "
                >
                  <div>
                    <Badge
                      variant="accent"
                      size="sm"
                    >
                      {topic.category}
                    </Badge>
                  </div>

                  <h2
                    className="
                      mt-4
                      text-2xl
                      font-bold
                    "
                  >
                    {topic.question}
                  </h2>

                  <p
                    className="
                      mt-3
                      line-clamp-3
                      text-text-secondary
                    "
                  >
                    {topic.answer}
                  </p>
                </article>
              </Link>
            )
          )}
        </div>
      )}

      <section
        className="
          mt-16
          border-t
          border-border
          pt-8
          text-center
        "
      >
        <Link
          href="/"
          className="
            inline-flex
            items-center
            text-lg
            font-medium
            text-text-primary
            hover:text-text-secondary
          "
        >
          Explore the Feed →
        </Link>
      </section>
    </main>
  );
}