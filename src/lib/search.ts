import { topics } from '@/data/topics';

export function searchTopics(
  query: string
) {
  const q = query
    .trim()
    .toLowerCase();

  if (!q) {
    return [];
  }

  return topics
    .map((topic) => {
      let score = 0;

      if (
        topic.question
          .toLowerCase()
          .includes(q)
      ) {
        score += 50;
      }

      if (
        topic.answer
          .toLowerCase()
          .includes(q)
      ) {
        score += 25;
      }

      if (
        topic.category
          .toLowerCase()
          .includes(q)
      ) {
        score += 20;
      }

      if (
        topic.explanation
          .toLowerCase()
          .includes(q)
      ) {
        score += 10;
      }

      if (
        topic.catechism.text
          .toLowerCase()
          .includes(q)
      ) {
        score += 10;
      }

      if (
        topic.scripture.text
          .toLowerCase()
          .includes(q)
      ) {
        score += 10;
      }

      if (
        topic.scripture.reference
          .toLowerCase()
          .includes(q)
      ) {
        score += 5;
      }

      return {
        topic,
        score,
      };
    })
    .filter(
      (result) => result.score > 0
    )
    .sort(
      (a, b) => b.score - a.score
    );
}