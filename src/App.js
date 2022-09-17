import "./App.css";
import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ListComparison from "./components/ListComparison";
import Error from "./components/Error";
export const UserContext = createContext(null);

function App() {
  const [isAuth, setIsAuth] = useState(true);
  const [username, setUsername] = useState("");

  return (
    <UserContext.Provider value={{ isAuth, setIsAuth, username, setUsername }}>
      <div className="App">
        <Routes>
          <Route index element={<Login />} />
          <Route
            path="clean"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <ListComparison isAuth={isAuth} />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Error />} />
        </Routes>
        {/* <ListComparison /> */}
      </div>
    </UserContext.Provider>
  );
}

export default App;
