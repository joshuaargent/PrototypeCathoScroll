'use client';

import { useMemo, useState } from 'react';

import { searchTopics } from '@/lib/search';

import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';

const suggestions = [
  'God',
  'Jesus',
  'Mary',
  'Prayer',
  'Grace',
  'Baptism',
  'The Church',
  'Confession',
  'Salvation',
  'Heaven',
];

export function SearchClient() {
  const [query, setQuery] =
    useState('');

  const results = useMemo(
    () => searchTopics(query),
    [query]
  );

  return (
    <div>
      <SearchInput
        value={query}
        onChange={setQuery}
      />

      {!query && (
        <section className="mt-8">
          <h2
            className="
              mb-4
              text-sm
              font-semibold
              uppercase
              tracking-wider
              text-text-muted
            "
          >
            Popular Searches
          </h2>

          <div className="flex flex-wrap gap-2">
            {suggestions.map(
              (suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() =>
                    setQuery(
                      suggestion
                    )
                  }
                  className="
                    rounded-full
                    border
                    border-border
                    px-4
                    py-2
                    text-sm
                    transition-colors
                    hover:bg-bg-secondary
                  "
                >
                  {suggestion}
                </button>
              )
            )}
          </div>
        </section>
      )}

      {query && (
        <div
          className="
            mt-6
            text-sm
            text-text-secondary
          "
        >
          {results.length}{' '}
          {results.length === 1
            ? 'result'
            : 'results'}
        </div>
      )}

      <SearchResults
        query={query}
        results={results}
      />
    </div>
  );
}