import axios                            from "axios";

import {
    MAPS,
    CHARACTERS,
    CHARACTER_EXISTS_ON,
    USERS,
    SCORES,
}                                       from "../consts/api-consts";

import { CheckCharacterExistOnPayload } from "../types/types";
import Leaderboard from "../components/Leaderboard/Leaderboard";

const axiosApi = axios.create({
    baseURL: process.env.API_ENDPOINT,
});


// axiosApi.interceptors.request.use((req):any => {
//     if (typeof window !== 'undefined' && localStorage.getItem('token')) {
//         req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//     }
//     return req;
// })

const { get, post, put, delete: del, } = axiosApi;

export const getMaps = async () => {
    const response = await get(MAPS);
    return response;
}

export const getLeaderboard = async (map_id:string) => {
    const response = await get(`${SCORES}/${map_id}`);
    return response;
}

export const getCharacters = async (mapId:string) => {
    const response = await get(`${CHARACTERS}/?map_id=${mapId}`);
    return response
}

export const checkCharacterExistOn = async (character_id:string, payload:CheckCharacterExistOnPayload) => {
    const response = await post(`${CHARACTER_EXISTS_ON}/${character_id}`, payload);
    return response
}