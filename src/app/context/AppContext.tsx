import React, { createContext, useState } from 'react';
import Authenticator from '../component/authenticator/Authenticator';

type AppContextType = {
  user?: User;
  setUser: (user: User) => void;
};

const AppContext = createContext<AppContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {}
});

interface IAppContextProviderProps {
  children: React.ReactNode;
}

const AppContextProvider: React.FC<IAppContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Authenticator>{children}</Authenticator>
    </AppContext.Provider>
  );
};

const useAppContext = () => React.useContext(AppContext);

export { AppContextProvider, useAppContext };
