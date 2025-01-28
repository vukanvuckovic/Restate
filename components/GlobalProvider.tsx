import { getCurrentUser } from "@/appwrite/userActions";
import { User } from "@/types";
import React, { createContext, useEffect, useState } from "react";

interface GlobalContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((result) => setUser(result))
      .finally(() => setLoading(false));
  }, []);

  return (
    <GlobalContext.Provider value={{ user, setUser, loading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
