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
  | -2
  | -1
  | 0
  | 1
  | 2;

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
  // Reset When Topic Changes
  // ----------------------------------

  useEffect(() => {
    setSlideIndex(0);
  }, [topic.id]);

  // ----------------------------------
  // Horizontal Navigation
  // ----------------------------------

  const nextSlide = () => {
    if (slideIndex >= slides.length - 1) {
      setDirection(2);

      setSlideIndex(0);

      onNextTopic?.();

      return;
    }

    setDirection(1);

    setSlideIndex(prev => prev + 1);
  };

  const previousSlide = () => {
    if (slideIndex <= 0) {
      setDirection(-2);

      setSlideIndex(0);

      onPreviousTopic?.();

      return;
    }

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
  // Share Topic
  // ----------------------------------

  const shareTopic = async () => {
    const url =
      typeof window !== 'undefined'
        ? `${window.location.origin}/topic/${topic.slug}`
        : '';

    try {
      if (navigator.share) {
        await navigator.share({
          title: topic.question,
          text:
            'Learn Catholic teaching one swipe at a time.',
          url,
        });

        return;
      }

      await navigator.clipboard.writeText(url);
    } catch {
      // User cancelled share
    }
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

  return (
    <div className="container py-6">

      <div className="mb-4">
        <TopicProgress
          current={slideIndex}
          total={slides.length}
        />
      </div>

      <AnimatePresence>

        <motion.div
          key={`${topic.id}-${slideIndex}`}

          drag

          dragMomentum

          dragElastic={0.15}

          style={{
            touchAction: 'none',
          }}

          whileDrag={{
            scale: 0.985,
          }}

          onDragEnd={(event, info) => {
            const absX = Math.abs(
              info.offset.x
            );

            const absY = Math.abs(
              info.offset.y
            );

            const velocityX = Math.abs(
              info.velocity.x
            );

            const velocityY = Math.abs(
              info.velocity.y
            );

            const horizontalGesture =
              absX > absY;

            if (horizontalGesture) {
              const fastSwipe =
                velocityX > 100;

              const farSwipe =
                absX > 20;

              if (fastSwipe || farSwipe) {
                if (info.offset.x < 0) {
                  nextSlide();
                } else {
                  previousSlide();
                }
              }

              return;
            }

            const fastVertical =
              velocityY > 150;

            const farVertical =
              absY > 25;

            if (
              fastVertical ||
              farVertical
            ) {
              if (info.offset.y < 0) {
                nextTopic();
              } else {
                previousTopic();
              }
            }
          }}

          initial={{
            opacity: 0,

            x:
              direction === 1
                ? 50
                : direction === -1
                  ? -50
                  : 0,

            y:
              direction === 2
                ? 80
                : direction === -2
                  ? -80
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
                ? -50
                : direction === -1
                  ? 50
                  : 0,

            y:
              direction === 2
                ? -80
                : direction === -2
                  ? 80
                  : 0,
          }}

          transition={{
            duration: 0.08,
            ease: 'linear',
          }}
        >
          <TopicCard
            type={slide.type}
            category={topic.category}
            title={slide.title}
            content={slide.content}
            reference={slide.reference}
            onShare={shareTopic}
          />
        </motion.div>

      </AnimatePresence>

    </div>
  );
}