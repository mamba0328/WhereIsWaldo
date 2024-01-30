import React, {useEffect, useState} from 'react';

import { getLeaderboard } from "../../api/routes";

type Props = {
    styles: string,
    map_id: string,
}
function Leaderboard({styles, map_id, ...props}:Props) {
    const [leaderboard, setLeaderboard] = useState([]);

    const getSetLeaderBoard = async () => {
        try{
            const response = await getLeaderboard(map_id);
            setLeaderboard(response.data);
        } catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        getSetLeaderBoard();

    }, [map_id])


    const renderLeaders = () => {
        return <ul>
            { leaderboard.map(item => {
                    return <li>{item.name}</li>;
              })
            }
        </ul>
    }

    return (
        <div className={styles}>{renderLeaders()}</div>
    );
}

export default Leaderboard;