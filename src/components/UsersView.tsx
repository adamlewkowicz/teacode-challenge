import { useState, useMemo, useDeferredValue } from 'react';
import { Highlight, Box } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import { useUsers } from '../hooks/useUsers';
import { UsersListMemo } from './UsersList';
import { InputSearch } from './InputSearch';
import { UserRow } from './UserRow';

interface UsersViewProps {}

export const UsersView = (props: UsersViewProps) => {
  const { isLoading, users, userUpdate } = useUsers();
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isSearching = query !== deferredQuery;

  const filteredUsersByQuery = useMemo(() => {
    if (deferredQuery.trim().length === 0) {
      return users;
    }
    const regExp = new RegExp(deferredQuery, 'gi');

    return users.filter((user) => {
      const loweredQuery = deferredQuery.toLowerCase();
      const fullName = `${user.first_name} ${user.last_name}`;

      const isMatchingFirstName = regExp.test(user.first_name);
      const isMatchingLastName = regExp.test(user.last_name);
      const isMatchingAny = isMatchingFirstName || isMatchingLastName;

      if (isMatchingAny) {
        console.log(fullName, loweredQuery, regExp);
        // @ts-ignore
        user.displayName = (
          <Highlight
            query={deferredQuery}
            styles={{ px: '0', py: '0', bg: 'orange.100' }}
          >
            {`${user.first_name} ${user.last_name}`}
          </Highlight>
        );
      }
      // @ts-ignore
      user.displayName = `${user.first_name} ${user.last_name}`;
      return isMatchingAny;
    });
  }, [deferredQuery, users]);

  return (
    <Box margin="64px auto" maxWidth="800px">
      <InputSearch
        value={query}
        onTextChange={setQuery}
        isSearching={isSearching}
      />
      {isLoading ? (
        <Spinner margin="auto" size="md" />
      ) : (
        <UsersListMemo
          users={filteredUsersByQuery}
          isSearching={isSearching}
          renderUser={(user) => (
            <UserRow key={user.id} user={user} onUserUpdate={userUpdate} />
          )}
        />
      )}
    </Box>
  );
};
