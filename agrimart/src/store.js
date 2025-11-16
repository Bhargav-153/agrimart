import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/user/user.slice.js";
import cartReducer from "./redux/cart/cart.slice.js";
import storageSession from "redux-persist/lib/storage/session"; // correct import
import { persistReducer, persistStore } from "redux-persist";


const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer, // ✅ Added cart slice
});

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["user", "cart"], // ✅ persist both
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});

export const persistor = persistStore(store);
