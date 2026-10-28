'use client';

import { useMemo, useState } from 'react';

import { shuffle } from '@/lib/utils';

import { Topic } from '@/types';

import { TopicViewer } from './TopicViewer';

interface TopicFeedProps {
  topics: Topic[];
}

export function TopicFeed({ topics }: TopicFeedProps) {
  const shuffledTopics = useMemo(() => shuffle(topics), [topics]);

  const [topicIndex, setTopicIndex] = useState(0);

  const nextTopic = () => {
    setTopicIndex((prev) => {
      if (prev >= shuffledTopics.length - 1) {
        return 0;
      }

      return prev + 1;
    });
  };

  const previousTopic = () => {
    setTopicIndex((prev) => {
      if (prev <= 0) {
        return 0;
      }

      return prev - 1;
    });
  };

  return (
    <TopicViewer
      topic={shuffledTopics[topicIndex]}
      onNextTopic={nextTopic}
      onPreviousTopic={previousTopic}
    />
  );
}
