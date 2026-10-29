import { notFound } from 'next/navigation';

import { TopicViewer } from '@/components/topic/TopicViewer';
import { topics } from '@/data/topics';

interface TopicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TopicPage({
  params,
}: TopicPageProps) {
  const { slug } = await params;

  const topic = topics.find(
    topic => topic.slug === slug
  );

  if (!topic) {
    notFound();
  }

  return (
    <TopicViewer topic={topic} />
  );
}