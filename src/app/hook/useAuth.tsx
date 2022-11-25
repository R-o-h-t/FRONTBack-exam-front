import React, { useCallback, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { backendUrl } from '../util/query';

const useAuth = () => {
  const { user: currentUser, setUser } = useAppContext();

  const [loading, setLoading] = React.useState(true);

  const setCurrentUser = useCallback(
    (user: User) => {
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    },
    [setUser]
  );

  const refreshToken = useCallback(async () => {
    const token = await fetch(`${backendUrl}/api/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refresh: currentUser.token.refresh })
    }).then((response) => response.json());
    setCurrentUser({
      ...currentUser,
      token: {
        access: token.access,
        refresh: currentUser.token.refresh
      }
    });
  }, [currentUser, setCurrentUser]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, [setCurrentUser]);

  const login = useCallback(
    async (userInfo: UserLogin) => {
      if (currentUser) {
        throw new Error('User is already logged in');
      }

      // login the user here, store the token and fetch the user info from the server
      // then set the user info to the context

      const token: Token = await fetch(`${backendUrl}/api/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      }).then((response) => response.json());

      const user: UserFetch = await fetch(`${backendUrl}/users/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access}`
        }
      })
        .then((response) => response.json())
        .catch((error) => {
          console.log(error);
        });

      setCurrentUser({
        ...user,
        token
      });
    },
    [currentUser, setCurrentUser]
  );

  const register = useCallback(
    async (userInfo: UserRegister) => {
      if (currentUser) {
        throw new Error('User is already logged in');
      }

      // register the user here, fetch for the token and set the user info to the context

      const user = await fetch(`${backendUrl}/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      }).then((response) => response.json());

      const token = await fetch(`${backendUrl}/api/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: userInfo.username,
          password: userInfo.password
        })
      }).then((response) => response.json());

      setCurrentUser({
        ...user,
        token
      });
    },
    [currentUser, setCurrentUser]
  );

  const logout = useCallback(() => {
    if (!currentUser) {
      throw new Error('User is not logged in');
    }
    setCurrentUser(null);
    localStorage.removeItem('user');
  }, [currentUser, setCurrentUser]);

  const isAuthenticated = useCallback(() => {
    return !!currentUser;
  }, [currentUser]);

  const isAdmin = useCallback(() => {
    if (!currentUser) {
      throw new Error('User is not logged in');
    }
    return currentUser?.role === 'A';
  }, [currentUser]);

  return {
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
    currentUser,
    loading,
    refreshToken
  };
};

export default useAuth;
