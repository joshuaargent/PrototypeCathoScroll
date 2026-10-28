'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Topic } from '@/types';
import { getTopicSlides } from '@/lib/topicSlides';

import { TopicCard } from './TopicCard';
import { TopicProgress } from './TopicProgress';

interface TopicViewerProps {
  topic: Topic;

  onNextTopic?: () => void;
  onPreviousTopic?: () => void;
}

type Direction =
  | -2 // topic up
  | -1 // slide left
  | 0
  | 1 // slide right
  | 2; // topic down

export function TopicViewer({
  topic,
  onNextTopic,
  onPreviousTopic,
}: TopicViewerProps) {
  const slides = getTopicSlides(topic);

  const [slideIndex, setSlideIndex] =
    useState(0);

  const [direction, setDirection] =
    useState<Direction>(0);

  const slide = slides[slideIndex];

  // ----------------------------------
  // Horizontal Navigation
  // ----------------------------------

  const nextSlide = () => {
    if (slideIndex >= slides.length - 1)
      return;

    setDirection(1);

    setSlideIndex(prev => prev + 1);
  };

  const previousSlide = () => {
    if (slideIndex <= 0) return;

    setDirection(-1);

    setSlideIndex(prev => prev - 1);
  };

  // ----------------------------------
  // Vertical Navigation
  // ----------------------------------

  const nextTopic = () => {
    setDirection(2);

    setSlideIndex(0);

    onNextTopic?.();
  };

  const previousTopic = () => {
    setDirection(-2);

    setSlideIndex(0);

    onPreviousTopic?.();
  };

  // ----------------------------------
  // Keyboard Support
  // ----------------------------------

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      switch (event.key) {
        case 'ArrowRight':
          nextSlide();
          break;

        case 'ArrowLeft':
          previousSlide();
          break;

        case 'ArrowUp':
          previousTopic();
          break;

        case 'ArrowDown':
          nextTopic();
          break;
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [slideIndex]);

  // ----------------------------------
  // Render
  // ----------------------------------

  return (
    <div className="container py-6">

      <div className="mb-4">
        <TopicProgress
          current={slideIndex}
          total={slides.length}
        />
      </div>

      <AnimatePresence mode="wait">

        <motion.div
          key={`${topic.id}-${slideIndex}`}

          drag
          dragMomentum={false}
          dragElastic={0.12}

          style={{
            touchAction: 'none',
          }}

          whileDrag={{
            scale: 0.985,
          }}

          onDragEnd={(event, info) => {
            const horizontalThreshold = 90;
            const verticalThreshold = 120;

            const absX = Math.abs(
              info.offset.x
            );

            const absY = Math.abs(
              info.offset.y
            );

            const horizontalGesture =
              absX > absY;

            if (horizontalGesture) {
              if (
                info.offset.x <
                -horizontalThreshold
              ) {
                nextSlide();
                return;
              }

              if (
                info.offset.x >
                horizontalThreshold
              ) {
                previousSlide();
                return;
              }
            }

            if (!horizontalGesture) {
              if (
                info.offset.y <
                -verticalThreshold
              ) {
                nextTopic();
                return;
              }

              if (
                info.offset.y >
                verticalThreshold
              ) {
                previousTopic();
              }
            }
          }}

          initial={{
            opacity: 0,

            x:
              direction === 1
                ? 140
                : direction === -1
                  ? -140
                  : 0,

            y:
              direction === 2
                ? 220
                : direction === -2
                  ? -220
                  : 0,
          }}

          animate={{
            opacity: 1,
            x: 0,
            y: 0,
          }}

          exit={{
            opacity: 0,

            x:
              direction === 1
                ? -140
                : direction === -1
                  ? 140
                  : 0,

            y:
              direction === 2
                ? -220
                : direction === -2
                  ? 220
                  : 0,
          }}

          transition={{
            duration: 0.22,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <TopicCard
            category={topic.category}
            title={slide.title}
            content={slide.content}
            reference={slide.reference}
          />
        </motion.div>

      </AnimatePresence>

      <div
        className="
          text-text-muted
          mt-6
          flex
          items-center
          justify-center
          gap-6
          text-xs
          uppercase
          tracking-wider
        "
      >
        <span>↔ Explore Topic</span>
        <span>↕ Change Question</span>
      </div>

    </div>
  );
}