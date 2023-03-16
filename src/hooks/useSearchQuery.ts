import { useState, useDeferredValue } from 'react';

export const useSearchQuery = () => {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isSearching = query !== deferredQuery;

  return { query, setQuery, deferredQuery, isSearching };
};
