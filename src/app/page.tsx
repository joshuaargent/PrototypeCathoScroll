import { TopicFeed } from '@/components/topic/TopicFeed';

import { topics } from '@/data/topics';

export default function HomePage() {
  return (
  <div className="overflow-hidden">
   <TopicFeed topics={topics} />;
  </div>
  );
}
