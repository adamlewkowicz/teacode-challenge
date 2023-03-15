import { Table, Tbody, TableContainer } from '@chakra-ui/react';
import { UserSelectable } from '../hooks/useUsers';
import { memo, ReactNode } from 'react';

interface UsersListProps {
  users: UserSelectable[];
  renderUser: (user: UserSelectable) => ReactNode;
  isSearching: boolean;
}

export const UsersList = ({
  users,
  isSearching,
  renderUser,
}: UsersListProps) => {
  return (
    <TableContainer style={{ opacity: isSearching ? '0.5' : '1' }}>
      <Table>
        <Tbody>{users.map(renderUser)}</Tbody>
      </Table>
    </TableContainer>
  );
};

export const UsersListMemo = memo(UsersList);
