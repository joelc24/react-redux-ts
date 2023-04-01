import {
  type ThunkAction,
  configureStore,
  type Action
} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './slice/auth';

const persistAuthConfig = {
  key: 'auth',
  storage,
  whiteList: ['accessToken']
};

const store = configureStore({
  reducer: {
    auth: persistReducer<ReturnType<typeof authReducer>>(
      persistAuthConfig,
      authReducer
    )
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type Thunk = ThunkAction<
  Promise<unknown>,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);

export default store;
