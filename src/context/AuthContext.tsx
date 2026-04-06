import { createContext, useContext, useEffect, useState } from 'react';
import { type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';

interface AuthContextType {
  user: (User & UserData) | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeDb: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, currentUser => {
      if (unsubscribeDb) unsubscribeDb();

      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);

        unsubscribeDb = onSnapshot(userDocRef, docSnap => {
          if (docSnap.exists()) {
            setUser({ ...currentUser, ...docSnap.data() });
          } else {
            setUser(currentUser);
          }
          setLoading(false);
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeDb) unsubscribeDb();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
