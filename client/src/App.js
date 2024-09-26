import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import PagenotFound from "./pages/PagenotFound";
import Profile from "./pages/Profile";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
        <Route
          path="/explore"
          element={user ? <Explore /> : <Navigate to="../auth" />}
        />
        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </>
  );
}

export default App;
