import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

interface TopicCardProps {
  category: string;

  title: string;

  content: string;

  reference?: string;
}

export function TopicCard({ category, title, content, reference }: TopicCardProps) {
  return (
    <Card padding="lg" className="flex min-h-[calc(100vh-9rem)] flex-col rounded-3xl shadow-lg">
      <div>
        <Badge variant="accent">{category}</Badge>
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <p className="text-text-secondary mb-4 text-center text-sm tracking-[0.2em] uppercase">
          {title}
        </p>

        <h1 className="text-text-primary text-center text-4xl leading-tight font-bold md:text-5xl">
          {content}
        </h1>

        {reference && <p className="text-text-secondary mt-8 text-center text-sm">{reference}</p>}
      </div>
    </Card>
  );
}
