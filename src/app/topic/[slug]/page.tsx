import { topics } from '@/data/topics';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TopicPage({
  params,
}: Props) {
  const { slug } = await params;

  const topic = topics.find(
    (t) => t.slug === slug
  );

  return (
    <main className="container py-12">
      <h1>{topic?.question}</h1>
      <p>{topic?.answer}</p>
    </main>
  );
}