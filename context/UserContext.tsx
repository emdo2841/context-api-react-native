import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

export type UserProfile = {
  name: string;
  email: string;
};

type UserContextValue = {
  user: UserProfile | null;
  signIn: (profile: UserProfile) => void;
  signOut: () => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserProfile | null>(null);

  const value = useMemo<UserContextValue>(() => ({
    user,
    signIn: setUser,
    signOut: () => setUser(null),
  }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used inside UserProvider');
  }
  return context;
}
