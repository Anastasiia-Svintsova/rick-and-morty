import React, { FC, useCallback, useEffect, useState } from 'react';

import { Avatar } from '@mui/material';

import { User } from '../../types/User';

interface UserAvatarProps {
  user: User;
}

export const UserAvatar: FC<UserAvatarProps> = ({ user }) => {
  const { photoURL, displayName } = user;
  const [userInitials, setUserInitials] = useState('U');

  const getUserInitials = useCallback(() => {
    if (displayName) {
      const name = displayName.trim().split(' ');
      const initials = `${name[0][0]}${name[1][0]}`;

      setUserInitials(initials);
    }
  }, [displayName]);

  useEffect(() => {
    if (!photoURL) getUserInitials();
  }, [getUserInitials, photoURL]);

  return photoURL ? (
    <Avatar alt='User avatar' src={photoURL} />
  ) : (
    <Avatar>{userInitials}</Avatar>
  );
};

export default UserAvatar;
