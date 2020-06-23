import React, { useState } from "react";

import { Provider } from "./src/context/AppContext";
import LoginScreen from "./src/screens/LoginScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";

export default function App() {
  const [user, setUser] = useState();
  return (
    <Provider value={[user, setUser]}>
      {user ? <WelcomeScreen /> : <LoginScreen />}
    </Provider>
  );
}
