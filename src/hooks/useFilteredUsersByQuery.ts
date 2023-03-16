import { UserExtended } from './useUsers';
import { useMemo } from 'react';

export const useFilteredUsersByQuery = (
  users: UserExtended[],
  query: string
) => {
  const filteredUsersByQuery = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (normalizedQuery.trim().length === 0) {
      return users;
    }

    return users.filter((user) => {
      const normalizedFirstName = user.first_name.toLowerCase();
      const normalizedLastName = user.last_name.toLowerCase();
      const normalizedFullName = user.fullName.toLowerCase();

      const isMatchingAny =
        normalizedFirstName.includes(normalizedQuery) ||
        normalizedLastName.includes(normalizedQuery) ||
        normalizedFullName.includes(normalizedQuery);

      return isMatchingAny;
    });
  }, [users, query]);

  return filteredUsersByQuery;
};
