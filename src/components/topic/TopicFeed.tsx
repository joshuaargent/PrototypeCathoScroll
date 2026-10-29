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

  // ----------------------------------
  // Initial Feed
  // ----------------------------------

  useEffect(() => {
    setFeedTopics(shuffle(topics));
  }, [topics]);

  // ----------------------------------
  // Navigation
  // ----------------------------------

  const nextTopic = () => {
    setTopicIndex(prev => {
      const next = prev + 1;

      // Loop feed

      if (
        next >= feedTopics.length
      ) {
        const reshuffled =
          shuffle(topics);

        setFeedTopics(reshuffled);

        return 0;
      }

      return next;
    });
  };

  const previousTopic = () => {
    setTopicIndex(prev =>
      Math.max(0, prev - 1)
    );
  };

  // ----------------------------------
  // Loading
  // ----------------------------------

  if (!feedTopics.length) {
    return null;
  }

  return (
    return (
  <div className="h-full">
    <TopicViewer
      topics={feedTopics}
      topicIndex={topicIndex}
      onNextTopic={nextTopic}
      onPreviousTopic={previousTopic}
    />
  </div>
);
}