import { memo } from 'react';
import { Avatar, Checkbox, Flex, Td, Text, Tr } from '@chakra-ui/react';
import { UserSelectable } from '../hooks/useUsers';

interface UserRowProps {
  user: UserSelectable;
  onUserUpdate: (
    userId: UserSelectable['id'],
    data: Partial<UserSelectable>
  ) => void;
}

export const UserRow = memo(({ user, onUserUpdate }: UserRowProps) => (
  <Tr key={user.id} bgColor={user.isSelected ? 'blue.50' : 'none'}>
    <Td>
      <Flex gap={8} align="center">
        <Avatar size="md" name={`${user.first_name} ${user.last_name}`} />{' '}
        <Text minWidth="150px">
          {/* <Highlight query="sat" styles={{ bg: 'orange.100' }}>
              {`${user.first_name} ${user.last_name}`}
            </Highlight> */}
          {user.first_name} {user.last_name}
          {/* {(user as any).displayName ?? user.first_name} */}
        </Text>
        <Checkbox
          marginLeft="auto"
          checked={user.isSelected}
          onChange={(event) =>
            onUserUpdate(user.id, { isSelected: event.target.checked })
          }
        />
      </Flex>
      {/* src={user.avatar} */}
    </Td>
  </Tr>
));
