import { Topic, TopicSlide } from '@/types';

export function getTopicSlides(topic: Topic): TopicSlide[] {
  return [
    {
      title: 'Question',
      content: topic.question,
    },

    {
      title: 'Short Answer',
      content: topic.answer,
    },

    {
      title: 'Explanation',
      content: topic.explanation,
    },

    {
      title: 'Catechism',
      content: topic.catechism.text,
      reference: `CCC ${topic.catechism.paragraphs.join(', ')}`,
    },

    {
      title: topic.scripture.reference,
      content: topic.scripture.text,
    },
  ];
}
