import { SearchResultCard } from './SearchResultCard';

interface SearchResultsProps {
  query: string;
  results: {
    topic: any;
    score: number;
  }[];
}

export function SearchResults({
  query,
  results,
}: SearchResultsProps) {
  if (!query) {
    return null;
  }

  if (results.length === 0) {
    return (
      <section className="mt-8">
        <div
          className="
            rounded-2xl
            border
            border-border
            p-8
            text-center
          "
        >
          <h2 className="text-xl font-semibold">
            No results found
          </h2>

          <p className="mt-2 text-text-secondary">
            Try searching for God,
            Prayer, Mary, Grace,
            Baptism, or Salvation.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="space-y-4">
        {results.map((result) => (
          <SearchResultCard
            key={result.topic.slug}
            topic={result.topic}
          />
        ))}
      </div>
    </section>
  );
}