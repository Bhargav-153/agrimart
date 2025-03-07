import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // ✅ Import Signup
import { RouteIndex, RouteSignIn, RouteSignUp } from "./helpers/RouteName.js";

const App = () => {
  return (
    <Routes>
      <Route path={RouteIndex} element={<Layout />} />
      <Route path={RouteSignIn} element={<Login />} /> {/* ✅ Login Route */}
      <Route path={RouteSignUp} element={<Signup />} /> {/* ✅ Sign Up Route */}
    </Routes>
  );
};

export default App;
