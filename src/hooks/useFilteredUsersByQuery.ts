import { UserExtended } from './useUsers';
import { useMemo } from 'react';

export const useFilteredUsersByQuery = (
  users: UserExtended[],
  query: string
) => {
  const filteredUsersByQuery = useMemo(() => {
    if (query.trim().length === 0) {
      return users;
    }
    const regExp = new RegExp(query, 'gi');

    return users.filter((user) => {
      const isMatchingFirstName = regExp.test(user.first_name);
      const isMatchingLastName = regExp.test(user.last_name);
      const isMatchingAny = isMatchingFirstName || isMatchingLastName;
      return isMatchingAny;
    });
  }, [users, query]);

  return filteredUsersByQuery;
};
