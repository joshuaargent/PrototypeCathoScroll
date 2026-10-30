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

  const [isAnimating, setIsAnimating] =
  useState(false);

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

  
useEffect(() => {
  const handleKeyDown = async (
    event: globalThis.KeyboardEvent
  ) => {
    if (event.repeat) return;
    if (isAnimating) return;

    const target =
      event.target as HTMLElement;

    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target.isContentEditable
    ) {
      return;
    }

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();

        if (previousSlide) {
          await moveSlide(
            'previous'
          );
        }
        break;

      case 'ArrowRight':
        event.preventDefault();

        if (nextSlide) {
          await moveSlide(
            'next'
          );
        }
        break;

      case 'ArrowUp':
        event.preventDefault();

        if (previousTopic) {
          await moveTopic(
            'previous'
          );
        }
        break;

      case 'ArrowDown':
        event.preventDefault();

        if (nextTopic) {
          await moveTopic(
            'next'
          );
        }
        break;

      case ' ':
        event.preventDefault();

        if (event.shiftKey) {
          if (previousSlide) {
            await moveSlide(
              'previous'
            );
          }
        } else {
          if (nextSlide) {
            await moveSlide('next');
          }
        }
        break;
    }
  };

  window.addEventListener(
    'keydown',
    handleKeyDown
  );

  return () =>
    window.removeEventListener(
      'keydown',
      handleKeyDown
    );
}, [
  previousSlide,
  nextSlide,
  previousTopic,
  nextTopic,
  isAnimating,
]);

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
  if (isAnimating) return;

  setIsAnimating(true);

  try {
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
} finally {
  setIsAnimating(false);
}
};

  const moveTopic = async (
  direction:
    | 'next'
    | 'previous'
) => {
  if (isAnimating) return;

  setIsAnimating(true);

  try {
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
} finally {
  setIsAnimating(false);
}
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
  x.get();
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
  y.get();
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
    width * 0.07;

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
          height * 0.07;

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
    <div className="h-full flex flex-col">

      <div className="px-6 pt-4 pb-4">
  <TopicProgress
    current={slideIndex}
    total={slides.length}
  />
</div>

      <div
  className="
    relative
    flex-1
    overflow-hidden
    pt-1
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
            <div
  className="
    absolute
    inset-x-0
    top-[-100%]
    h-full
    opacity-90
  "
>
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
            <div
  className="
    absolute
    inset-x-0
    top-[100%]
    h-full
    opacity-90
  "
>
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