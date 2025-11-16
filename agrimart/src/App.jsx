import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./components/Home";
import {
  RouteAboutUs,
  RouteAddProduct,
  RouteCart,
  RouteContactUs,
  RouteCropNutrition,
  RouteCropNutritionAdd,
  RouteCropProtection,
  RouteCropProtectionAdd,
  RouteEquipment,
  RouteEquipmentAdd,
  RouteIndex,
  RouteNursery,
  RouteNurseryAdd,
  RouteNurseryEdit,
  RouteOrder,
  RouteOrganic,
  RouteOrganicAdd,
  RouteProduct,
  RouteProfile,
  RouteRegistration,
  RouteSchemes,
  RouteSeeds,
  RouteSeedsAdd,
  RouteSettings,
  RouteSignIn,
  RouteSignUp,
  RouteWeather,
  SchemaRoute,
  RouteAddress,
  RoutePayment,
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
import AddSeeds from "./pages/AddSeeds";
import EditSeeds from "./pages/EditSeeds";
import AddCropProtection from "./pages/AddCropProtection";
import AddCropNutrition from "./pages/AddCropNutrition";
import Equipment from "./pages/Equipment";
import AddEquipment from "./pages/AddEquipment";
import Organic from "./pages/Organic";
import AddOrganic from "./pages/AddOrganic";
import EditCropProtection from "./pages/EditCropProtection";
import EditCropNutrition from "./pages/EditCropNutrition";
import EditEquipment from "./pages/EditEquipment";
import EditOrganic from "./pages/EditOrganic";
import AddSchema from "./pages/AddSchema";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Address from "./pages/Address";
import Payment from "./pages/Payment";



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

        <Route path={RouteCart} element={<Cart />} />
        <Route path={RouteOrder} element={<Orders />} />
        <Route path={RouteAddress} element={<Address />} />
        <Route path={RoutePayment} element={<Payment />} />

        <Route path={RouteRegistration} element={<FarmerRegistration />} />

        <Route path={RouteAddProduct} element={<AddProduct />} />

        <Route path={RouteSchemes} element={<Schemes />} />
        <Route path={SchemaRoute} element={<AddSchema />} />

        <Route path={RouteWeather} element={<Weather />} />

        <Route path={RouteSeeds} element={<Seeds />} />
        <Route path={RouteSeedsAdd} element={<AddSeeds />} />
        <Route path="/seeds/edit/:seedid" element={<EditSeeds />} />

        <Route path={RouteCropProtection} element={<CropProtection />} />
        <Route path={RouteCropProtectionAdd} element={<AddCropProtection />} />
        <Route
          path="/crop-protection/edit/:protectionid"
          element={<EditCropProtection />}
        />

        <Route path={RouteCropNutrition} element={<CropNutrition />} />
        <Route path={RouteCropNutritionAdd} element={<AddCropNutrition />} />
        <Route
          path="/crop-nutrition/edit/:nutritionid"
          element={<EditCropNutrition />}
        />

        <Route path={RouteEquipment} element={<Equipment />} />
        <Route path={RouteEquipmentAdd} element={<AddEquipment />} />
        <Route
          path="/equipment/edit/:equipmentid"
          element={<EditEquipment />}
        />

        <Route path={RouteOrganic} element={<Organic />} />
        <Route path={RouteOrganicAdd} element={<AddOrganic />} />
        <Route path="/organic/edit/:organicid" element={<EditOrganic />} />

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
