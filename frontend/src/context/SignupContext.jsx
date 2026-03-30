import { createContext, useContext, useState } from "react";

const SignupContext = createContext();

export function SignupProvider({ children }) {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const update = (fields) => setSignupData((prev) => ({ ...prev, ...fields }));

  return (
    <SignupContext.Provider value={{ signupData, update }}>
      {children}
    </SignupContext.Provider>
  );
}

export function useSignup() {
  return useContext(SignupContext);
}