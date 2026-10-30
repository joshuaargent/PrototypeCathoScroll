import Link from 'next/link';

import { topics } from '@/data/topics';
import { Badge } from '@/components/ui/Badge';

const categoryMetadata = [
  {
    slug: 'god',
    name: 'God',
    description:
      'Who God is and what He has revealed about Himself.',
  },
  {
    slug: 'jesus-christ',
    name: 'Jesus Christ',
    description:
      'The life, mission, death and resurrection of Christ.',
  },
  {
    slug: 'the-church',
    name: 'The Church',
    description:
      'The Catholic Church, its authority and mission.',
  },
  {
    slug: 'scripture',
    name: 'Scripture',
    description:
      'The Bible and God’s revelation through Sacred Scripture.',
  },
  {
    slug: 'prayer',
    name: 'Prayer',
    description:
      'Growing closer to God through prayer.',
  },
  {
    slug: 'the-sacraments',
    name: 'The Sacraments',
    description:
      'The seven sacraments and the life of grace.',
  },
  {
    slug: 'mary-saints',
    name: 'Mary & Saints',
    description:
      'The Blessed Virgin Mary and the communion of saints.',
  },
  {
    slug: 'salvation',
    name: 'Salvation',
    description:
      'How Christ saves humanity and brings eternal life.',
  },
  {
    slug: 'sin-grace',
    name: 'Sin & Grace',
    description:
      'Sin, forgiveness and life in God’s grace.',
  },
  {
    slug: 'moral-life',
    name: 'Moral Life',
    description:
      'Living according to God’s commandments.',
  },
  {
    slug: 'marriage-family',
    name: 'Marriage & Family',
    description:
      'Catholic teaching on marriage and family life.',
  },
  {
    slug: 'life-issues',
    name: 'Life Issues',
    description:
      'Human dignity from conception to natural death.',
  },
  {
    slug: 'heaven-hell-purgatory',
    name: 'Heaven, Hell & Purgatory',
    description:
      'Death, judgement and eternal destiny.',
  },
  {
    slug: 'apologetics',
    name: 'Apologetics',
    description:
      'Defending and explaining the Catholic faith.',
  },
  {
    slug: 'science-faith',
    name: 'Science & Faith',
    description:
      'The relationship between Catholicism and science.',
  },
];

export default function CategoriesPage() {
  const categories = categoryMetadata.map(
    (category) => ({
      ...category,
      topicCount: topics.filter(
        (topic) =>
          topic.category ===
          category.name
      ).length,
    })
  );

  const totalTopics = topics.length;

  return (
    <main className="container py-12">
      <div className="mb-12">

        <Link
          href="/"
          className="
            mb-6
            inline-flex
            text-sm
            text-text-secondary
            transition-colors
            hover:text-text-primary
          "
        >
          ← Explore Feed
        </Link>

        <h1
          className="
            text-5xl
            font-extrabold
            md:text-7xl
          "
        >
          Categories
        </h1>

        <p
          className="
            mt-4
            text-lg
            text-text-secondary
          "
        >
          Browse the Catholic faith by topic.
        </p>

        <div className="mt-6">
          <Badge
            variant="accent"
            size="lg"
          >
            {categories.length} Categories •{' '}
            {totalTopics} Topics
          </Badge>
        </div>
      </div>

      <div
  className="
    grid
    gap-6
    md:grid-cols-2
    xl:grid-cols-3
  "
>
  {categories.map((category) => (
    <Link
      key={category.slug}
      href={`/categories/${category.slug}`}
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
        <div className="flex items-center justify-between">
          <Badge
            variant="accent"
            size="sm"
          >
            {category.topicCount}{' '}
            {category.topicCount === 1
              ? 'Topic'
              : 'Topics'}
          </Badge>
        </div>

        <h2
          className="
            mt-4
            text-2xl
            font-bold
          "
        >
          {category.name}
        </h2>

        <p
          className="
            mt-3
            text-text-secondary
            leading-relaxed
          "
        >
          {category.description}
        </p>
      </article>
    </Link>
  ))}
</div>

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
          className="inline-flex items-center text-lg font-medium text-text-primary hover:text-text-secondary"
        >
          Explore the Feed →
        </Link>
      </section>
    </main>
  );
}