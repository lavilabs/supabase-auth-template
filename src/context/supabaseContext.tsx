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
      console.log(event, session);
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
    throw new Error("useLocaleDispatch must be used within a LocaleProvider");
  }

  return context.sb;
};

export const useUser = () => {
  const context = React.useContext(SupabaseContext);

  if (context === undefined) {
    throw new Error("useLocaleDispatch must be used within a LocaleProvider");
  }

  return context.user;
};
