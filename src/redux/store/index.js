import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import presenceSlice from '../features/presence/presenceSlice'
import {authApi} from '../features/auth/authService'
import alertSlice from '../features/alert/alertSlice'
import { presenceApi } from '../features/presence/presenceService'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    alert: alertSlice,
    auth: authSlice,
    presence: presenceSlice,


    [authApi.reducerPath]: authApi.reducer,
    [presenceApi.reducerPath]: presenceApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat([
      authApi.middleware,
      presenceApi.middleware
    ]),
})
setupListeners(store.dispatch)