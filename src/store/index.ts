import {enableMapSet} from 'immer';

import {configureStore} from '@reduxjs/toolkit';
import {likedProductsReducer} from "@/features";

enableMapSet();

export const store = configureStore({
  reducer: {
    liked: likedProductsReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
