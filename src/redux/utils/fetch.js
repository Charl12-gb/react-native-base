import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { localStorage } from './localStorage';
import { useAppDispatch } from './hooks';
import { API_URL } from '@env';

export const apiUrl = API_URL

const baseQuery = fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers, { getState }) => {
        headers.set("Accept", `application/json`);
        headers.set("Content-type", `application/json`);
        const token = getState().auth.token;
        headers.set("Authorization","Bearer " + token);
        return headers;
    }
})

export const baseQueryWithInterceptor = async (args, api, extraOptions) => {
    console.log('(-è(è(è-e(è(')
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        const dispatch = useAppDispatch()
        await localStorage.setItem('token', '');
        dispatch(removeUser());
    }

    if(result.error && result.error.status == "FETCH_ERROR"){
        return {error: {data:{message: result.error.error}}}
    }
    
    return result

}