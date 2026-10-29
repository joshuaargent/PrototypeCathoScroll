import { Share2 } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';

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
        return contentLength > 180
          ? 'text-lg md:text-xl font-semibold'
          : 'text-xl md:text-3xl font-semibold';

      case 'explanation':
        return contentLength > 300
          ? 'text-base md:text-lg font-medium'
          : 'text-lg md:text-xl font-medium';

      case 'catechism':
        return 'text-sm md:text-base';

      case 'scripture':
        return contentLength > 220
          ? 'text-base md:text-lg italic'
          : 'text-lg md:text-xl italic';

      default:
        return 'text-lg';
    }
  })();

  return (
    <div
      className={cn(
        `
  h-full
  w-full
  px-6
  py-6
  md:px-8
  md:py-8
  flex
  flex-col
`,
        type === 'question' &&
          'bg-accent-light/5'
      )}
    >
      {/* Header */}

      <div
  className="
    flex
    flex-1
    items-center
    justify-center
    pb-12
  "
>

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
              : 'max-w-3xl'
          )}
        >

          <div
            className={cn(
              'text-text-primary leading-tight',
              contentClasses
            )}
          >
            {content}
          </div>

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

    </div>
  );
}