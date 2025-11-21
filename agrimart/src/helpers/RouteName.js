export const RouteIndex = "/";
export const RouteSignIn = "/login";
export const RouteSignUp = "/sign-up";
export const RouteAboutUs = "/about-us";
export const RouteContactUs = "/contact-us";
export const RouteSupport = "/support";
export const RouteFAQ = "/faq";
export const RouteChatbot = "/chatbot";
export const RouteTickets = "/tickets";
export const RouteProfile = "/profile";
export const RouteRegistration = "/farmer-registration";
export const RouteAddProduct = "/add-product";
export const RouteSchemes = "/gov-schemes";
export const RouteWeather = "/weather";
export const RouteSeeds = "/shop/seeds";
export const RouteSeedsAdd = "/seeds/add";
export const RouteCropProtection = "/shop/crop-protection";
export const RouteCropNutrition = "/shop/crop-nutrition";
export const RouteNursery = "/nursery";
export const RouteNurseryAdd = "/nursery/add";
export const SchemaRoute = "/add-schema";
export const RouteCropProtectionAdd = "/shop/crop-protection/add";
export const RouteCropNutritionAdd = "/shop/crop-nutrition/add";
export const RouteEquipmentAdd = "/shop/equipment/add";
export const RouteEquipment = "/shop/equipment";
export const RouteOrganic = "/shop/organic";
export const RouteOrganicAdd = "/shop/organic/add";
export const RouteCart = "/profile/cart";
export const RouteOrder = "/profile/order";
export const RouteAddress = "/checkout/address";
export const RoutePayment = "/checkout/payment";

export const RouteNurseryEdit = (nursery_id) => {
  if (nursery_id) {
    return `/nursery/edit/${nursery_id}`;
  } else {
    return `/nursery/edit/nursery_id`;
  }
};
export const RouteSeedsEdit = (seed_id) => {
  if (seed_id) {
    return `/seeds/edit/${seed_id}`;
  } else {
    return `/seeds/edit/seed_id`;
  }
};

export const RouteCropProtectionEdit = (protection_id) => {
  if (protection_id) {
    return `/crop-protection/edit/${protection_id}`;
  } else {
    return `/crop-protection/edit/protection_id`;
  }
};

export const RouteCropNutritionEdit = (nutrition_id) => {
  if (nutrition_id) {
    return `/crop-nutrition/edit/${nutrition_id}`;
  } else {
    return `/crop-nutrition/edit/nutrition_id`;
  }
};

export const RouteEquipmentEdit = (equipment_id) => {
  if (equipment_id) {
    return `/equipment/edit/${equipment_id}`;
  } else {
    return `/equipment/edit/equipment_id`;
  }
};

export const RouteOrganicEdit = (organic_id) => {
  if (organic_id) {
    return `/organic/edit/${organic_id}`;
  } else {
    return `/organic/edit/organic_id`;
  }
};

export const RouteProduct = "/farm-product";
export const RouteSettings = "/settings";
