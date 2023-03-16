import styled from '@emotion/styled';
import { UserExtended } from '../hooks/useUsers';
import { useState } from 'react';

interface UserAvatarProps {
  user: UserExtended;
}

export const UserAvatar = ({ user }: UserAvatarProps) => {
  const [isError, setIsError] = useState(false);

  if (user.avatar && !isError) {
    return (
      <Avatar
        src={user.avatar}
        loading="lazy"
        onError={() => setIsError(true)}
        alt={`${user.first_name} ${user.last_name}`}
      />
    );
  }

  return (
    <AvatarPlaceholder profileColor={user.profileColor}>
      {user.first_name[0]}
      {user.last_name[0]}
    </AvatarPlaceholder>
  );
};

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const AvatarPlaceholder = styled.div<{ profileColor: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: grid;
  align-items: center;
  text-align: center;
  background-color: ${(props) => props['profileColor']};
  font-weight: 700;
`;
