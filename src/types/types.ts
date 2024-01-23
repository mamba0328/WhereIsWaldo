export type Pointer = {
    x: number,
    y: number,
    status: 'SUCCESS' | 'PENDING',
}


export type Position = {
    x: number,
    y: number,
}

export type CharacterPosition = {
    beginning: Position,
    end: Position,
}

export type Character =  {
    "id": string,
    "name": string,
    "position": CharacterPosition,
    "map_id":string,
    "timeTaken": number,
    "status": number,
    hint: string,
}