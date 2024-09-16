import { createSlice } from '@reduxjs/toolkit';

export const presenceSlice = createSlice({
    name: 'presence',
    initialState: {
        presenceCode: null,
        presenceStats: {},
        generalStats: [],
        requestStats: {}
    },
    reducers: {
        setPresenceCode: (state, action) => {
            state.presenceCode = action.payload;
        },
        setStats: (state, action) => {
            console.log(action.payload)
            state.presenceStats = action.payload.presence
            state.requestStats = action.payload.request
        }
    }
});

const { reducer, actions } = presenceSlice;

export const { setPresenceCode, setStats } = actions;

export default reducer;
