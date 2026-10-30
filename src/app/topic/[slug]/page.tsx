import { topics } from '@/data/topics';

export default function TopicPage() {
  const topic = topics[0];

  return (
    <main className="container py-12">
      <h1>{topic.question}</h1>
      <p>{topic.answer}</p>
    </main>
  );
}