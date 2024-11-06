import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import taskRequestsSlice from "./taskRequestsSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  taskRequestData: taskRequestsSlice,
});

const persisredReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persisredReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);
