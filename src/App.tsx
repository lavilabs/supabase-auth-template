import React from "react";
import { useSupabase, useUser } from "./context/supabaseContext";

const App = () => {
  const supabase = useSupabase();
  const user = useUser();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await supabase.auth.signUp({ email, password });
    await supabase.auth.signIn({ email, password });
  };

  if (user) {
    return (
      <div>
        <h1>Hello {user.email}</h1>
        <button onClick={() => supabase.auth.signOut()}>signout</button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleRegister}
      >
        <h1>Register</h1>
        email
        <input
          required
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        password
        <input
          required
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default App;
