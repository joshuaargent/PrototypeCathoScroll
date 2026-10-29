'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

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

  const currentSlide =
    slides[slideIndex];

  const previousSlide =
    slideIndex > 0
      ? slides[slideIndex - 1]
      : null;

  const nextSlide =
    slideIndex < slides.length - 1
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
          drag

          dragMomentum={false}

          dragElastic={0.05}

          dragTransition={{
            bounceStiffness: 1200,
            bounceDamping: 50,
          }}

          style={{
            width: '100%',
            height: '100%',
            touchAction: 'none',
          }}

          onDrag={(event, info) => {
            if (axis) return;

            const absX = Math.abs(
              info.offset.x
            );

            const absY = Math.abs(
              info.offset.y
            );

            if (absX < 10 && absY < 10)
              return;

            setAxis(
              absX > absY ? 'x' : 'y'
            );
          }}

          whileDrag={{
            scale: 0.998,
          }}

          onDragEnd={(event, info) => {
            const absX = Math.abs(
              info.offset.x
            );

            const absY = Math.abs(
              info.offset.y
            );

            const velocityX =
              Math.abs(
                info.velocity.x
              );

            const velocityY =
              Math.abs(
                info.velocity.y
              );

            if (axis === 'x') {
              const trigger =
                absX > 80 ||
                velocityX > 800;

              if (trigger) {
                if (
                  info.offset.x < 0 &&
                  nextSlide
                ) {
                  setSlideIndex(
                    prev => prev + 1
                  );
                }

                if (
                  info.offset.x > 0 &&
                  previousSlide
                ) {
                  setSlideIndex(
                    prev => prev - 1
                  );
                }
              }
            }

            if (axis === 'y') {
              const trigger =
                absY > 80 ||
                velocityY > 800;

              if (trigger) {
                if (
                  info.offset.y < 0 &&
                  nextTopic
                ) {
                  setSlideIndex(0);
                  onNextTopic?.();
                }

                if (
                  info.offset.y > 0 &&
                  previousTopic
                ) {
                  setSlideIndex(0);
                  onPreviousTopic?.();
                }
              }
            }

            setAxis(null);
          }}

          className="
            absolute
            inset-0
          "
        >
          {/* ABOVE */}

          {previousTopic && (
            <div
              className="
                absolute
                inset-x-0
                -top-full
                h-full
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
                -left-full
                w-full
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

          <div
            className="
              absolute
              inset-0
            "
          >
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
              onShare={
                shareTopic
              }
            />
          </div>

          {/* RIGHT */}

          {nextSlide && (
            <div
              className="
                absolute
                inset-y-0
                left-full
                w-full
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

          {/* BELOW */}

          {nextTopic && (
            <div
              className="
                absolute
                inset-x-0
                top-full
                h-full
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