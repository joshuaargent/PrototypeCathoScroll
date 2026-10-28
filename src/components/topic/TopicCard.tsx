import { Share2 } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

import { cn } from '@/lib/utils';

interface TopicCardProps {
  type:
    | 'question'
    | 'answer'
    | 'explanation'
    | 'catechism'
    | 'scripture';

  category: string;
  title: string;
  content: string;
  reference?: string;
  onShare?: () => void;
}

export function TopicCard({
  category,
  title,
  content,
  reference,
  onShare,
}: TopicCardProps) {
  const type = title.toLowerCase();

  const isQuestion =
    type.includes('question');

  const isAnswer =
    type.includes('answer');

  const isExplanation =
    type.includes('explanation');

  const isCatechism =
    type.includes('catechism');

  return (
    <Card
      padding="lg"
      className="
        flex
        min-h-[calc(100vh-9rem)]
        max-h-[calc(100vh-9rem)]
        flex-col
        overflow-hidden
        rounded-3xl
        shadow-lg
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <Badge
          variant="accent"
          size={isQuestion ? 'lg' : 'md'}
        >
          {category}
        </Badge>

        <div className="flex items-center gap-4">

          <span
            className="
              text-text-muted
              text-xs
              uppercase
              tracking-wider
            "
          >
            {title}
          </span>

          {onShare && (
            <button
              onClick={onShare}
              className="
                text-text-muted
                hover:text-text-primary
                transition-colors
              "
            >
              <Share2 className="h-5 w-5" />
            </button>
          )}

        </div>

      </div>

      {/* Main Content */}

      <div
        className="
          flex-1
          overflow-y-auto
          py-8
        "
      >
        <div
          className={cn(
            'mx-auto text-center',

            isQuestion
              ? 'max-w-2xl'
              : 'max-w-3xl'
          )}
        >
          <h1
            className={cn(
              'text-text-primary leading-tight',

              // Question
              isQuestion &&
                'text-4xl font-extrabold md:text-6xl',

              // Answer
              isAnswer &&
                'text-xl font-semibold md:text-2xl',

              // Explanation
              isExplanation &&
                'text-lg font-medium md:text-xl',

              // Catechism
              isCatechism &&
                'text-base font-normal md:text-lg',

              // Scripture
              !isQuestion &&
                !isAnswer &&
                !isExplanation &&
                !isCatechism &&
                'text-lg italic md:text-xl'
            )}
          >
            {content}
          </h1>
        </div>

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

    </Card>
  );
}