import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // ✅ Import Signup
import { RouteAboutUs, RouteAddProduct, RouteContactUs, RouteIndex,  RouteProfile, RouteRegistration, RouteSchemes, RouteSignIn, RouteSignUp, RouteWeather } from "./helpers/RouteName.js";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/Profile";
import AddProduct from "./pages/AddProduct";
import FarmerRegistration from "./pages/FarmerRegistration";
import Schemes from "./pages/Schemes";
import Weather from "./pages/Weather";


const App = () => {
  return (
    <Routes>
      <Route path={RouteIndex} element={<Layout />} />
      <Route path={RouteSignIn} element={<Login />} /> 
      <Route path={RouteSignUp} element={<Signup />} /> 
      <Route path={RouteAboutUs} element={<AboutUs />} />
      <Route path={RouteContactUs} element={<ContactUs />} />
      <Route path={RouteProfile} element={<Profile />} />
      <Route path={RouteRegistration} element={<FarmerRegistration />} />
      <Route path={RouteAddProduct} element={<AddProduct />} />
      <Route path={RouteSchemes} element={<Schemes />} />
      <Route path={RouteWeather} element={<Weather/>}/>
    </Routes>
    
  );
};

export default App;
