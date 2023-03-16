import { Box, Text } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import { useUsers } from '../hooks/useUsers';
import { UsersListMemo } from './UsersList';
import { InputSearch } from './InputSearch';
import { UserRow } from './UserRow';
import { useFilteredUsersByQuery } from '../hooks/useFilteredUsersByQuery';
import { useSearchQuery } from '../hooks/useSearchQuery';

interface UsersViewProps {}

export const UsersView = (props: UsersViewProps) => {
  const { isLoading, users, userUpdate, errorMessage } = useUsers();
  const { query, setQuery, deferredQuery, isSearching } = useSearchQuery();
  const filteredUsers = useFilteredUsersByQuery(users, deferredQuery);

  if (errorMessage != null) {
    return (
      <Text align="center" color="red.400">
        An error occured: {errorMessage}
      </Text>
    );
  }

  return (
    <Box margin="48px auto" maxWidth="800px">
      <Text fontSize="3xl">Contacts list</Text>
      <InputSearch
        value={query}
        onTextChange={setQuery}
        isSearching={isSearching}
      />
      {isLoading ? (
        <Spinner margin="auto" size="md" />
      ) : (
        <UsersListMemo
          users={filteredUsers}
          isSearching={isSearching}
          renderUser={(user) => (
            <UserRow
              query={deferredQuery}
              key={user.id}
              user={user}
              onUserUpdate={userUpdate}
            />
          )}
        />
      )}
    </Box>
  );
};
