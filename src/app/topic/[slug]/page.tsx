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
    <h1>{topic.question}</h1>

    <p>{topic.answer}</p>

    <pre>
      {JSON.stringify(topic, null, 2)}
    </pre>
  </main>

);
}