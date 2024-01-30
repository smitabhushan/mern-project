import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice';
import {persistReducer,persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//import persistStore from 'redux-persist/es/persistStore';
//combining the reducer first
const rootReducer=combineReducers({user:userReducer});
// setting the name of key in local storage
const persistConfig={
  key:'root',
  storage,
  version:1,
}

// persist the root reducer using persist reducer function
const persistedReducer=persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer:  persistedReducer,
  
   middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false,
  }),
});
export const persistor=persistStore(store);
// this persistStore method gonna make the store persist
