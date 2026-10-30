import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';

import { Topic } from '@/types';

interface SearchResultCardProps {
  topic: Topic;
}

export function SearchResultCard({ topic }: SearchResultCardProps) {
  return (
    <Link
      href={`/topic/${topic.slug}`}
      className="border-border bg-bg-card hover:bg-bg-secondary block rounded-2xl border p-6 transition-colors"
    >
      <Badge variant="accent" size="sm">
        {topic.category}
      </Badge>

      <h2 className="mt-4 text-xl leading-snug font-bold">{topic.question}</h2>

      <p className="text-text-secondary mt-3 leading-relaxed">
        {topic.answer.length > 180 ? `${topic.answer.slice(0, 180)}...` : topic.answer}
      </p>

      <div className="text-accent mt-4 text-sm font-medium">View Topic →</div>
    </Link>
  );
}
