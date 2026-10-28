'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Topic } from '@/types';
import { getTopicSlides } from '@/lib/topicSlides';

import { TopicCard } from './TopicCard';
import { TopicProgress } from './TopicProgress';
import { SwipeHint } from './SwipeHint';

interface TopicViewerProps {
  topic: Topic;

  onNextTopic?: () => void;
  onPreviousTopic?: () => void;
}

export function TopicViewer({
  topic,
  onNextTopic,
  onPreviousTopic,
}: TopicViewerProps) {
  const slides = getTopicSlides(topic);

  const [slideIndex, setSlideIndex] = useState(0);

  const [direction, setDirection] = useState(0);

  // ----------------------------------------
  // Navigation
  // ----------------------------------------

  const nextSlide = () => {
    if (slideIndex === slides.length - 1) {
      onNextTopic?.();
      setSlideIndex(0);
      return;
    }

    setDirection(1);
    setSlideIndex(prev => prev + 1);
  };

  const previousSlide = () => {
    if (slideIndex === 0) {
      onPreviousTopic?.();
      return;
    }

    setDirection(-1);
    setSlideIndex(prev => prev - 1);
  };

  // ----------------------------------------
  // Keyboard Navigation
  // ----------------------------------------

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        nextSlide();
      }

      if (event.key === 'ArrowLeft') {
        previousSlide();
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

  const slide = slides[slideIndex];

  // ----------------------------------------
  // Render
  // ----------------------------------------

  return (
    <div className="container py-6">

      <TopicProgress
        current={slideIndex}
        total={slides.length}
      />

      <div className="mt-4">

        <AnimatePresence mode="wait">

          <motion.div
            key={`${topic.id}-${slideIndex}`}
            drag="x"
            dragConstraints={{
              left: 0,
              right: 0,
            }}
            dragElastic={0.15}
            whileDrag={{
              rotate: 2,
              scale: 0.98,
            }}
            onDragEnd={(event, info) => {
              const swipeThreshold = 100;

              if (
                info.offset.x <
                -swipeThreshold
              ) {
                nextSlide();
              }

              if (
                info.offset.x >
                swipeThreshold
              ) {
                previousSlide();
              }
            }}
            initial={{
              opacity: 0,
              x: direction * 150,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: direction * -150,
            }}
            transition={{
              duration: 0.25,
              ease: 'easeOut',
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

      </div>

      <SwipeHint
        isLastSlide={
          slideIndex ===
          slides.length - 1
        }
      />

    </div>
  );
}
