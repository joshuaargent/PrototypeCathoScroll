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
  type,
  category,
  title,
  content,
  reference,
  onShare,
}: TopicCardProps) {
  const contentLength = content.length;

  const contentClasses = (() => {
    switch (type) {
      case 'question':
        if (contentLength < 60) {
          return 'text-5xl md:text-7xl font-extrabold';
        }

        if (contentLength < 100) {
          return 'text-4xl md:text-6xl font-extrabold';
        }

        return 'text-3xl md:text-5xl font-extrabold';

      case 'answer':
        return contentLength > 160
          ? 'text-xl md:text-2xl font-semibold'
          : 'text-2xl md:text-4xl font-semibold';

      case 'explanation':
        return contentLength > 250
          ? 'text-base md:text-lg font-medium'
          : 'text-lg md:text-2xl font-medium';

      case 'catechism':
        return contentLength > 250
          ? 'text-sm md:text-base'
          : 'text-base md:text-lg';

      case 'scripture':
        return contentLength > 250
          ? 'text-base md:text-lg italic'
          : 'text-lg md:text-xl italic';

      default:
        return 'text-lg';
    }
  })();

  return (
    <Card
      padding="lg"
      className="
        flex
        min-h-[calc(100vh-9rem)]
        flex-col
        rounded-3xl
        shadow-lg
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">
        <Badge
          variant="accent"
          size={type === 'question' ? 'lg' : 'md'}
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
              aria-label="Share topic"
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

      {/* Content */}

      <div className="flex flex-1 items-center justify-center">
        <div
          className={cn(
            'mx-auto text-center',
            type === 'question'
              ? 'max-w-2xl'
              : 'max-w-4xl'
          )}
        >
          <h1
            className={cn(
              'text-text-primary leading-tight',
              contentClasses
            )}
          >
            {content}
          </h1>

          {reference && (
            <div className="mt-8">
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
      </div>
    </Card>
  );
}