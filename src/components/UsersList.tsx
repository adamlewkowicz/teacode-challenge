import { UserExtended } from '../hooks/useUsers';
import { memo, ReactNode } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import styled from '@emotion/styled';

interface UsersListProps {
  users: UserExtended[];
  renderUser: (user: UserExtended, style?: any) => ReactNode;
  isSearching: boolean;
}

const style = {};

export const UsersList = ({
  users,
  isSearching,
  renderUser,
}: UsersListProps) => {
  const sizer = (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={height}
          width={width}
          itemCount={users.length}
          itemSize={80}
        >
          {({ index, style }) => {
            const user = users[index];
            return renderUser(user, style) as any;
          }}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
  // return sizer;

  return (
    <List
      style={{
        opacity: isSearching ? '0.5' : '1',
      }}
    >
      {users.map((user) => renderUser(user, style))}
    </List>
  );
};

const List = styled.ul`
  transition: opacity 0.2s ease;
`;

export const UsersListMemo = memo(UsersList);
