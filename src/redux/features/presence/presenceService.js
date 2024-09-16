import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithInterceptor } from '../../utils/fetch';
import { setPresenceCode, setStats } from './presenceSlice';

export const presenceApi = createApi({
  reducerPath: 'presenceApi',
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    getPresenceCode: builder.mutation({
      query: () => ({
        url: '/get-presence-validation-code',
        method: 'GET',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setPresenceCode(data));
        } catch (e) {
          console.log(e);
        }
      }
    }),
    getUsers: builder.query({
      query: () => '/users',
    }),
    associateFingerprint: builder.mutation({
      query: (fingerprint) => ({
        url: '/associate/fingerprint',
        method: 'POST',
        body: { fingerprint },
      }),
    }),
    getPresenceValidationCode: builder.query({
      query: () => '/get-presence-validation-code',
    }),
    storePresenceConfigurations: builder.mutation({
      query: (configurations) => ({
        url: '/store/presence-configurations',
        method: 'POST',
        body: configurations,
      }),
    }),
    updatePresenceConfigurations: builder.mutation({
      query: (configurations) => ({
        url: '/update/presence-configurations',
        method: 'PUT',
        body: configurations,
      }),
    }),
    getUserPresences: builder.query({
      query: () => '/user-presences',
    }),
    getUserPresenceStats: builder.query({
      query: (filters) => {
        console.log("filters", filters);
        return  `/user-presences/stats?user_id=${filters.user_id}&start_date=${filters.start_date}&end_date=${filters.end_date}&status=${filters.status}&day=${filters.day}`
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {          
          const data = await queryFulfilled
          dispatch(setStats(data.data))
        } catch (error) {
          console.log(error)
        }
      }
    }),
    getPresenceConfigurations: builder.query({
      query: () => '/presence-configurations',
    }),
  }),
});

export const {
  useGetPresenceCodeMutation,
  useGetUsersQuery,
  useAssociateFingerprintMutation,
  useGetPresenceValidationCodeQuery,
  useStorePresenceConfigurationsMutation,
  useUpdatePresenceConfigurationsMutation,
  useGetUserPresencesQuery,
  useGetUserPresenceStatsQuery,
  useGetPresenceConfigurationsQuery,
} = presenceApi;
