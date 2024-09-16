import { createApi  } from '@reduxjs/toolkit/query/react';
import { setCredentials, setUser, removeUser } from './authSlice';
import { baseQueryWithInterceptor } from '../../utils/fetch';
import { localStorage } from '../../utils/localStorage';
import { setMessage } from '../alert/alertSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    getAuthUser: builder.query({
      query: () => '/current-user',
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {data} = await queryFulfilled;
          dispatch(setUser(data));
        } catch (e) {
          console.log(e);
        }
      }
    }),
    login: builder.mutation({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {data} = await queryFulfilled;
          await localStorage.setItem('token', data?.access);
          dispatch(setCredentials(data));
        } catch (e) {
          dispatch(setMessage('error', 'Erreur de connexion'))
        }
      }
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          await localStorage.setItem('token', '');
          dispatch(removeUser());
        } catch (e) {
          await localStorage.setItem('token', '');
          dispatch(removeUser());
          dispatch(setMessage('success', 'Déconnexion'))
        }
      }
    }),
  }),
});

export const {
  useGetAuthUserQuery,
  useLoginMutation,
  useLogoutMutation
} = authApi
