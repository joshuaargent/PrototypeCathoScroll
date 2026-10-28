import { Share2 } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

import { cn } from '@/lib/utils';

interface TopicCardProps {
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
  const isQuestion = title === 'Question';

  const isAnswer =
    title === 'Short Answer';

  const isExplanation =
    title === 'Explanation';

  const isCatechism =
    title === 'Catechism';

  const isScripture =
    !isQuestion &&
    !isAnswer &&
    !isExplanation &&
    !isCatechism;

  return (
    <Card
      padding="lg"
      className="
        flex
        min-h-[calc(100vh-9rem)]
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

        {onShare && (
          <button
            onClick={onShare}
            aria-label="Share Topic"
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

      {/* Content */}

      <div className="flex flex-1 flex-col justify-center">

        {!isQuestion && (
          <p
            className="
              text-text-muted
              mb-6
              text-center
              text-xs
              uppercase
              tracking-[0.25em]
            "
          >
            {title}
          </p>
        )}

        <div
          className={cn(
            'mx-auto max-w-3xl text-center',

            isQuestion &&
              'max-w-2xl',

            (isExplanation ||
              isCatechism ||
              isScripture) &&
              'max-w-4xl'
          )}
        >

          <h1
            className={cn(
              'text-text-primary leading-tight',

              // Question
              isQuestion &&
                'text-4xl font-extrabold md:text-6xl',

              // Short Answer
              isAnswer &&
                'text-2xl font-semibold md:text-3xl',

              // Explanation
              isExplanation &&
                'text-xl font-medium md:text-2xl',

              // Catechism
              isCatechism &&
                'text-lg font-normal md:text-xl',

              // Scripture
              isScripture &&
                'text-xl font-medium italic md:text-2xl'
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