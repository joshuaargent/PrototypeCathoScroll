import { notFound } from 'next/navigation';

import { TopicViewer } from '@/components/topic/TopicViewer';

import { topics } from '@/data/topics';

interface Props {
  params: {
    slug: string;
  };
}

export default function TopicPage({ params }: Props) {
  const topic = topics.find((t) => t.slug === params.slug);

  if (!topic) {
    notFound();
  }

  return <TopicViewer topic={topic} />;
}
