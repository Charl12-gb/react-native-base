import { createSlice } from '@reduxjs/toolkit';
import { localStorage } from '../../utils/localStorage';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        user: null,
    },
    reducers: {
        setCredentials: (state, {payload}) => {
            state.token = payload.access;
            state.user = payload.user;
        },
        setUser: (state, {payload}) => {
            state.user = payload.user;
        },
        removeUser: (state, action) => {
            state.token = null;
            state.user = null;
        }
    }
})

export const selectToken = (state) => state.auth.token;

export const refreshToken = async () => {
    return {
        access_token: await localStorage.getItem('token')
    }
}


const { reducer, actions } = authSlice;

export const { setCredentials, setUser, removeUser } = actions
export default reducer;