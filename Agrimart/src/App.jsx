import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./components/Home";
import {
  RouteAboutUs,
  RouteAddProduct,
  RouteContactUs,
  RouteCropNutrition,
  RouteCropProtection,
  RouteIndex,
  RouteNursery,
  RouteNurseryAdd,
  RouteNurseryEdit,
  RouteProduct,
  RouteProfile,
  RouteRegistration,
  RouteSchemes,
  RouteSeeds,
  RouteSettings,
  RouteSignIn,
  RouteSignUp,
  RouteWeather,
} from "./helpers/RouteName.js";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/Profile";
import AddProduct from "./pages/AddProduct";
import FarmerRegistration from "./pages/FarmerRegistration";
import Schemes from "./pages/Schemes";
import Weather from "./pages/Weather";
import Seeds from "./pages/Seeds";
import Nursery from "./pages/Nursery";
import FarmProduct from "./pages/FramProduct";
import CropProtection from "./pages/CropProtection";
import CropNutrition from "./pages/CropNutrition";
import Settings from "./pages/settings";
import AddNursery from "./pages/AddNursery";
import EditNursery from "./pages/EditNursery";

const App = () => {
  return (
    <Routes>
      <Route path={RouteIndex} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={RouteIndex} element={<Layout />} />
        <Route path={RouteSignIn} element={<Login />} />
        <Route path={RouteSignUp} element={<Signup />} />
        <Route path={RouteAboutUs} element={<AboutUs />} />
        <Route path={RouteContactUs} element={<ContactUs />} />
        <Route path={RouteProfile} element={<Profile />} />
        <Route path={RouteRegistration} element={<FarmerRegistration />} />
        <Route path={RouteAddProduct} element={<AddProduct />} />
        <Route path={RouteSchemes} element={<Schemes />} />
        <Route path={RouteWeather} element={<Weather />} />
        <Route path={RouteSeeds} element={<Seeds />} />
        <Route path={RouteCropProtection} element={<CropProtection />} />
        <Route path={RouteCropNutrition} element={<CropNutrition />} />

        <Route path={RouteNursery} element={<Nursery />} />
        <Route path={RouteNurseryAdd} element={<AddNursery />} />
        <Route path="/nursery/edit/:nurseryid" element={<EditNursery />} />

        <Route path="/" element={<Navigate to="/farmer/register" />} />
        <Route path="/farmer/register" element={<FarmerRegistration />} />
        <Route path="/add-product" element={<AddProduct />} />


        <Route path={RouteProduct} element={<FarmProduct />} />
        <Route path={RouteSettings} element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default App;
