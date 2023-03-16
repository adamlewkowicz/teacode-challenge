import { UserExtended } from '../hooks/useUsers';
import { memo, ReactNode } from 'react';
import styled from '@emotion/styled';

interface UsersListProps {
  users: UserExtended[];
  renderUser: (user: UserExtended) => ReactNode;
  isSearching: boolean;
}

export const UsersList = ({
  users,
  isSearching,
  renderUser,
}: UsersListProps) => {
  return (
    <List
      style={{
        opacity: isSearching ? '0.5' : '1',
      }}
    >
      {users.map((user) => renderUser(user))}
    </List>
  );
};

const List = styled.ul`
  transition: opacity 0.2s ease;
`;

export const UsersListMemo = memo(UsersList);
