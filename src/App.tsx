import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import routes from "./utils/routes";
import AppContainer from "./pages/AppContainer";
import LoginPage from "./pages/auth/login";
import React from "react";
import { AuthContext } from "./context/auth/AuthContext";

function App() {
  const authState = React.useContext(AuthContext);

  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    if (Boolean(authState?.token)) {
      return <>{children}</>;
    } else {
      return <Navigate to="/login" replace />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <AppContainer />
            </RequireAuth>
          }
        >
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
