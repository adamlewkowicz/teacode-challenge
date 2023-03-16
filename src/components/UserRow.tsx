import { memo } from 'react';
import { UserExtended } from '../hooks/useUsers';
import styled from '@emotion/styled';
import { UserAvatar } from './UserAvatar';
import { Highlight } from '@chakra-ui/react';

interface UserRowProps {
  user: UserExtended;
  onUserUpdate: (
    userId: UserExtended['id'],
    data: Partial<UserExtended>
  ) => void;
  query: string;
}

export const UserRow = memo(({ user, query, onUserUpdate }: UserRowProps) => {
  return (
    <ListItem isSelected={user.isSelected}>
      <UserAvatar user={user} />
      <div>
        {query.length > 0 ? (
          <Highlight query={query} styles={{ bg: 'orange.100' }}>
            {user.fullName}
          </Highlight>
        ) : (
          user.fullName
        )}
      </div>
      <Checkbox
        type="checkbox"
        checked={user.isSelected}
        onChange={(event) =>
          onUserUpdate(user.id, { isSelected: event.target.checked })
        }
      />
    </ListItem>
  );
});

const ListItem = styled.li<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  padding: 24px 16px;
  border-bottom: 1px solid #edf2f7;
  gap: 36px;
  background-color: ${(props) => (props.isSelected ? '#ebf8ff' : '#fff')};
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  margin-left: auto;
  accent-color: #3182ce;
`;
