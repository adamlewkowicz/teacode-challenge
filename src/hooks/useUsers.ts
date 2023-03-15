import { useState, useEffect, useMemo, useCallback } from 'react';
import { getUsers, User } from '../api/getUsers';

export type UserSelectable = User & { isSelected: boolean };

export const useUsers = () => {
  const [users, setUsers] = useState<UserSelectable[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((data) => {
        const selectableUsers = data.map((user) => ({
          ...user,
          isSelected: false,
        }));
        setUsers(selectableUsers);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const userUpdate = useCallback(
    (userId: UserSelectable['id'], user: Partial<UserSelectable>) => {
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

  // const selectedUsers = useMemo(() => {
  //   return users.filter((user) => user.isSelected);
  // }, [users]);

  // useEffect(() => {
  //   console.log(
  //     `Selected user ids: ${selectedUsers.map((user) => user.id).join(', ')}`
  //   );
  // }, [selectedUsers]);

  return { users, isLoading, userUpdate };
};
