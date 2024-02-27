import {persistReducer, persistStore} from 'redux-persist';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

import counterSlice from './counter/counterSlice';
import championSlice from './champion/champion.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

//=============PERSIST-CONFIG=================//
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['champion'],
};
//=============================================//

const rootReducer = combineReducers({
  champion: championSlice,
  counter: counterSlice,
});

//=============PERSIST-REDUCER=================//
const persistedReducer = persistReducer(persistConfig, rootReducer);
//=============================================//

export const store = configureStore({
  reducer: {
    persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
