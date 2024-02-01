import axios                            from "axios";

import {
    MAPS,
    CHARACTERS,
    CHARACTER_EXISTS_ON,
    USERS,
    USER_BY_IP,
    SCORES,
}                                       from "../consts/api-consts";

import { CheckCharacterExistOnPayload, ScorePayload} from "../types/types";
import Leaderboard from "../components/Leaderboard/Leaderboard";

const axiosApi = axios.create();

const { get, post, put, delete: del, } = axiosApi;

export const getMaps = async () => {
    const response = await get(MAPS);
    return response;
}

export const getLeaderboard = async (map_id:string) => {
    const response = await get(`${SCORES}/${map_id}`);
    return response;
}
export const getUsersScore = async (map_id:string, user_id:string) => {
    const response = await get(`${SCORES}/?map_id=${map_id}&user_id=${user_id}`);
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

export const getUserByIp = async () => {
    const response = await get(`${USER_BY_IP}`);
    return response;
}

export const createUser = async () => {
    const response = await post(`${USERS}`);
    return response;
}

export const assignScore = async (payload:ScorePayload) => {
    const response = post(`${SCORES}`, payload);
    return response;
}