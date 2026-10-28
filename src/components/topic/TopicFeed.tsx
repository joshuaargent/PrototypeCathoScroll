'use client';

import { useEffect, useState } from 'react';

import { shuffle } from '@/lib/utils';

import { Topic } from '@/types';

import { TopicViewer } from './TopicViewer';

interface TopicFeedProps {
  topics: Topic[];
}

export function TopicFeed({
  topics,
}: TopicFeedProps) {
  const [feedTopics, setFeedTopics] =
    useState<Topic[]>([]);

  const [topicIndex, setTopicIndex] =
    useState(0);

  // Create initial shuffled feed
  useEffect(() => {
    setFeedTopics(shuffle(topics));
  }, [topics]);

  const nextTopic = () => {
    setTopicIndex(prev => {
      const nextIndex = prev + 1;

      // Reached end of feed
      if (nextIndex >= feedTopics.length) {
        setFeedTopics(shuffle(topics));

        return 0;
      }

      return nextIndex;
    });
  };

  const previousTopic = () => {
    setTopicIndex(prev =>
      Math.max(0, prev - 1)
    );
  };

  if (!feedTopics.length) {
    return null;
  }

  return (
    <TopicViewer
      topic={feedTopics[topicIndex]}
      onNextTopic={nextTopic}
      onPreviousTopic={previousTopic}
    />
  );
}