import {
  combineReducers,
  configureStore,
  EnhancedStore,
  Store,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import listStateSlice from "./slices/listSlices";
import loginSlice from "./slices/loginSlices";
import myTeamsStateSlice from "./slices/myTeamsStateSlice";
import userProfileSlices from "./slices/userProfileSlices";
import axiosSlice from "./slices/axiosSlice";
import storage from "redux-persist/lib/storage";
import { createWrapper, MakeStore } from "next-redux-wrapper";
import myPageStateSlice from "./slices/pageSlice";

export const rootReducer = combineReducers({
  login: loginSlice,
  axiosState: axiosSlice,
  listState: listStateSlice,
  myTeamsState: myTeamsStateSlice,
  pageState: myPageStateSlice,
  userProfileState: userProfileSlices,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const setupStore = (context: any): EnhancedStore => store;
const makeStore: MakeStore<any> = (context: any) => setupStore(context);

export const persistor = persistStore(store);
export const wrapper = createWrapper<Store>(makeStore);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
