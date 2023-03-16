import { useState, useEffect, useCallback } from 'react';
import { getUsers, User } from '../api/getUsers';
import { getRandomColor } from '../utils/color';

export type UserExtended = User & { isSelected: boolean; profileColor: string };

export const useUsers = () => {
  const [users, setUsers] = useState<UserExtended[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((data) => {
        const selectableUsers = data.map((user) => ({
          ...user,
          isSelected: false,
          profileColor: getRandomColor(),
        }));
        setUsers(selectableUsers);
      })
      .catch((error) => setErrorMessage(error.message ?? 'Unknown error'))
      .finally(() => setIsLoading(false));
  }, []);

  const userUpdate = useCallback(
    (userId: UserExtended['id'], user: Partial<UserExtended>) => {
      setUsers((prevUsers) =>
        prevUsers.map((prevUser) => {
          if (prevUser.id === userId) {
            return {
              ...prevUser,
              ...user,
            };
          }
          return prevUser;
        })
      );
    },
    []
  );

  useEffect(() => {
    // Filtering through selected user ids has been put to requestIdleCallback
    // to avoid blocking the main thread from more urgent UI updates.
    const callbackId = requestIdleCallback(() => {
      const selectedUsers = users.filter((user) => user.isSelected);
      const joinedIds = selectedUsers.map((user) => user.id).join(', ');

      console.log(
        `Selected user ids: ${selectedUsers.length > 0 ? joinedIds : 'none'}`
      );
    });
    return () => cancelIdleCallback(callbackId);
  }, [users]);

  return { users, isLoading, errorMessage, userUpdate };
};
