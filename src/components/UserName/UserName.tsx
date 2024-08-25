'use client';

import { FC, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { fetchUserName } from '@/firebase/utils';
import { Notification } from '@/components/Notification';
import { Loader } from '@/components/Loader';

export const UserName: FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState('');
  const [fetchUserNameError, setFetchUserNameError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      fetchUserName(user, setName);
    } catch (err) {
      setFetchUserNameError(
        err instanceof Error ? err : new Error('An error occured while fetching user data')
      );
    }
  }, [user, loading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h2>Welcome{user && name && ` Back, ${name}`}!</h2>
      {error && <Notification isOpen={!!error} message={error.message} severity="error" />}
      {fetchUserNameError && (
        <Notification
          isOpen={!!fetchUserNameError}
          message={fetchUserNameError.message}
          severity="error"
        />
      )}
    </>
  );
};
