import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface TopicCardProps {
  category: string;
  title: string;
  content: string;
  reference?: string;
}

export function TopicCard({
  category,
  title,
  content,
  reference,
}: TopicCardProps) {
  const isQuestion = title === 'Question';

  return (
    <Card
      padding="lg"
      className="
        flex
        min-h-[calc(100vh-9rem)]
        flex-col
        rounded-3xl
        shadow-lg
        overflow-hidden
      "
    >
      <div className="flex items-center justify-between">
        <Badge variant="accent">
          {category}
        </Badge>

        <span className="text-text-muted text-xs uppercase tracking-wider">
          {title}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center">

        <h1
          className={cn(
            'text-text-primary text-center leading-tight',
            isQuestion
              ? 'text-4xl font-extrabold md:text-6xl'
              : 'text-2xl font-semibold md:text-4xl'
          )}
        >
          {content}
        </h1>

        {reference && (
          <div className="mt-8 flex justify-center">
            <span
              className="
                bg-bg-secondary
                text-text-secondary
                border-border
                rounded-full
                border
                px-4
                py-2
                text-sm
              "
            >
              {reference}
            </span>
          </div>
        )}
      </div>

      <div className="text-text-muted flex justify-center pt-6 text-xs uppercase tracking-wider">
        {isQuestion
          ? 'Swipe ↔ for details • Swipe ↑↓ for questions'
          : 'Swipe ↔ to explore'}
      </div>
    </Card>
  );
}