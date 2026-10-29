'use client';

import {
  animate,
  motion,
  useMotionValue,
} from 'framer-motion';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { flushSync } from 'react-dom';

import { Topic } from '@/types';
import { getTopicSlides } from '@/lib/topicSlides';

import { TopicCard } from './TopicCard';
import { TopicProgress } from './TopicProgress';

interface TopicViewerProps {
  topics: Topic[];
  topicIndex: number;

  onNextTopic?: () => void;
  onPreviousTopic?: () => void;
}

export function TopicViewer({
  topics,
  topicIndex,
  onNextTopic,
  onPreviousTopic,
}: TopicViewerProps) {
  const [slideIndex, setSlideIndex] =
    useState(0);

  const [axis, setAxis] = useState<
    'x' | 'y' | null
  >(null);

  const [isDragging, setIsDragging] =
    useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const startRef = useRef({
    x: 0,
    y: 0,
  });

  const currentRef = useRef({
    x: 0,
    y: 0,
  });

  const currentTopic =
    topics[topicIndex];

  const previousTopic =
    topicIndex > 0
      ? topics[topicIndex - 1]
      : null;

  const nextTopic =
    topicIndex < topics.length - 1
      ? topics[topicIndex + 1]
      : null;

  const slides = useMemo(
    () => getTopicSlides(currentTopic),
    [currentTopic]
  );

  useEffect(() => {
  setSlideIndex(0);
}, [topicIndex]);

  useEffect(() => {
  x.set(0);
  y.set(0);
}, [slideIndex, topicIndex, x, y]);

  const currentSlide =
    slides[slideIndex];

  const previousSlide =
    slideIndex > 0
      ? slides[slideIndex - 1]
      : null;

  const nextSlide =
    slideIndex <
    slides.length - 1
      ? slides[slideIndex + 1]
      : null;

  const shareTopic = async () => {
    try {
      const url =
        typeof window !== 'undefined'
          ? `${window.location.origin}/topic/${currentTopic.slug}`
          : '';

      if (navigator.share) {
        await navigator.share({
          title:
            currentTopic.question,
          url,
        });

        return;
      }

      await navigator.clipboard.writeText(
        url
      );
    } catch {}
  };

  const springHome = () => {
  animate(x, 0, {
    type: 'spring',
    stiffness: 1800,
    damping: 120,
  });

  animate(y, 0, {
    type: 'spring',
    stiffness: 1800,
    damping: 120,
  });
};

  const moveSlide = async (
  direction:
    | 'next'
    | 'previous'
) => {
  const width =
    window.innerWidth;

  await animate(
    x,
    direction === 'next'
      ? -width
      : width,
    {
      duration: 0.1,
      ease: 'easeOut',
    }
  );

  x.set(0);

  flushSync(() => {
    setSlideIndex(prev =>
      direction === 'next'
        ? prev + 1
        : prev - 1
    );
  });
};

  const moveTopic = async (
  direction:
    | 'next'
    | 'previous'
) => {
  const height =
    window.innerHeight;

  await animate(
    y,
    direction === 'next'
      ? -height
      : height,
    {
      duration: 0.1,
      ease: 'easeOut',
    }
  );

  y.set(0);

  flushSync(() => {
    setSlideIndex(0);

    if (direction === 'next') {
      onNextTopic?.();
    } else {
      onPreviousTopic?.();
    }
  });
};

  const handlePointerDown = (
  event: React.PointerEvent
) => {
  setIsDragging(true);

  event.currentTarget.setPointerCapture(
    event.pointerId
  );

  setAxis(null);

  currentRef.current = {
    x: 0,
    y: 0,
  };

  startRef.current = {
    x: event.clientX,
    y: event.clientY,
  };
};

  const handlePointerMove = (
    event: React.PointerEvent
  ) => {
    if (!isDragging) return;

    const deltaX =
      event.clientX -
      startRef.current.x;

    const deltaY =
      event.clientY -
      startRef.current.y;

    if (!axis) {
      if (
  Math.abs(deltaX) > 2 ||
  Math.abs(deltaY) > 2
) {
        setAxis(
          Math.abs(deltaX) >
            Math.abs(deltaY)
            ? 'x'
            : 'y'
        );
      }

      return;
    }

    if (axis === 'x') {
  if (
    !previousSlide &&
    deltaX > 0
  ) {
    x.set(deltaX * 0.25);
  } else if (
    !nextSlide &&
    deltaX < 0
  ) {
    x.set(deltaX * 0.25);
  } else {
    x.set(deltaX);
  }

  y.set(0);

  currentRef.current.x =
    deltaX;
}

    if (axis === 'y') {
  if (
    !previousTopic &&
    deltaY > 0
  ) {
    y.set(deltaY * 0.25);
  } else if (
    !nextTopic &&
    deltaY < 0
  ) {
    y.set(deltaY * 0.25);
  } else {
    y.set(deltaY);
  }

  x.set(0);

  currentRef.current.y =
    deltaY;
}
  };

  const handlePointerUp =
    async () => {
      setIsDragging(false);

      const dx =
  currentRef.current.x;

const dy =
  currentRef.current.y;

const absDx = Math.abs(dx);
const absDy = Math.abs(dy);

const velocityX =
  absDx / 16;

const velocityY =
  absDy / 16;

      const width =
        window.innerWidth;

      const height =
        window.innerHeight;

      if (axis === 'x') {
  const threshold =
    width * 0.08;

  const commit =
  absDx > threshold ||
  velocityX > 25;

  if (
    commit &&
    dx < 0 &&
    nextSlide
  ) {
    await moveSlide(
      'next'
    );
  } else if (
    commit &&
    dx > 0 &&
    previousSlide
  ) {
    await moveSlide(
      'previous'
    );
  } else {
    springHome();
  }
}

      if (axis === 'y') {
        const threshold =
          height * 0.08;

        const commit =
  absDy > threshold ||
  velocityY > 25;

        if (
  commit &&
  dy < 0 &&
  nextTopic
) {
          await moveTopic(
            'next'
          );
        } else if (
  commit &&
  dy > 0 &&
  previousTopic
) {
          await moveTopic(
            'previous'
          );
        } else {
          springHome();
        }
      }

      currentRef.current = {
        x: 0,
        y: 0,
      };

      setAxis(null);
    };

  return (
    <div className="h-full">

      <div className="px-6 pt-4">
        <TopicProgress
          current={slideIndex}
          total={slides.length}
        />
      </div>

      <div
        className="
          relative
          h-[calc(100vh-5rem)]
          overflow-hidden
        "
      >
        <motion.div
          style={{
            x,
            y,
            width: '100%',
            height: '100%',
            touchAction: 'none',
          }}
          onPointerDown={
            handlePointerDown
          }
          onPointerMove={
            handlePointerMove
          }
          onPointerUp={
            handlePointerUp
          }
          onPointerCancel={
            handlePointerUp
          }
          className="
  absolute
  inset-0
  select-none
  will-change-transform
  transform-gpu
"
        >
          {/* TOP */}

          {previousTopic && (
            <div className="absolute inset-x-0 top-[-100%] h-full">
              <TopicCard
                type="question"
                category={
                  previousTopic.category
                }
                title="Question"
                content={
                  previousTopic.question
                }
              />
            </div>
          )}

          {/* LEFT */}

          {previousSlide && (
            <div
  className="
    absolute
    inset-y-0
    left-[-100%]
    w-full
    opacity-90
  "
>
              <TopicCard
                type={
                  previousSlide.type
                }
                category={
                  currentTopic.category
                }
                title={
                  previousSlide.title
                }
                content={
                  previousSlide.content
                }
                reference={
                  previousSlide.reference
                }
              />
            </div>
          )}

          {/* CENTER */}

          <div className="absolute inset-0">
            <TopicCard
              type={
                currentSlide.type
              }
              category={
                currentTopic.category
              }
              title={
                currentSlide.title
              }
              content={
                currentSlide.content
              }
              reference={
                currentSlide.reference
              }
              onShare={shareTopic}
            />
          </div>

          {/* RIGHT */}

          {nextSlide && (
            <div
  className="
    absolute
    inset-y-0
    left-[100%]
    w-full
    opacity-90
  "
>
              <TopicCard
                type={
                  nextSlide.type
                }
                category={
                  currentTopic.category
                }
                title={
                  nextSlide.title
                }
                content={
                  nextSlide.content
                }
                reference={
                  nextSlide.reference
                }
              />
            </div>
          )}

          {/* BOTTOM */}

          {nextTopic && (
            <div className="absolute inset-x-0 top-[100%] h-full">
              <TopicCard
                type="question"
                category={
                  nextTopic.category
                }
                title="Question"
                content={
                  nextTopic.question
                }
              />
            </div>
          )}
        </motion.div>
      </div>

    </div>
  );
}