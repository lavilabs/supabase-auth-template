import { SupabaseClient } from "@supabase/supabase-js";
import React from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../supabase-modules";

type SupabaseContextType = {
  sb: SupabaseClient;
  user: User | null;
};

export const SupabaseContext = React.createContext<SupabaseContextType>({
  sb: supabase,
  user: null,
});

export const SupabaseContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      setUser(user);
    }
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user!);
      }
      if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });
  }, []);

  return (
    <SupabaseContext.Provider value={{ user, sb: supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = React.useContext(SupabaseContext);

  if (context === undefined) {
    throw new Error(
      "useSupabase must be used within a SupabaseContext.Provider"
    );
  }

  return context.sb;
};

export const useUser = () => {
  const context = React.useContext(SupabaseContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a SupabaseContext.Provider");
  }

  return context.user;
};
