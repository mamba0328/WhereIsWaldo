import {checkCharacterExistOn} from "../api/routes";

export type Pointer = {
    x: number,
    y: number,
    status: 'FOUNDED' | 'PENDING' | 'WRONG',
    name?: string,
}


export type Position = {
    x: number,
    y: number,
}

export type CharacterPosition = {
    bottom_right: Position,
    top_left: Position,
}

export type Character =  {
    "_id": string,
    "name": string,
    "position": CharacterPosition,
    "map_id":string,
    "timeTaken": number,
    "status": number,
    hint: string,
}

export type Map = {
    name: string,
    path: string,
    _id: string,
}

export type CheckCharacterExistOnPayload = {
    map_id: string,
    point: Position,
}