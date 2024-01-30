import React from 'react';
import Leaderboard from "../Leaderboard/Leaderboard";

import { Map } from "../../types/types";

type Props = {
    score: number,
    map: Map,
}
function GameOverWindow({score, map, ...props}:Props) {
    return (
        <div>


            <Leaderboard map_id={map._id} styles={''}/>
        </div>
    );
}

export default GameOverWindow;