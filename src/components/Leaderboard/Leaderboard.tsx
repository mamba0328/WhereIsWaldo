import React, {useEffect, useState} from 'react';

import { getLeaderboard } from "../../api/routes";
import { getFormattedTime } from "../../utils/helpers/helpers";
import Loader from "../Loader/Loader";

type Props = {
    updateLeaderboardCount: number,
    styles: string,
    map_id: string,
}
function Leaderboard({styles, map_id, updateLeaderboardCount, ...props}:Props) {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const getSetLeaderBoard = async () => {
        try{
            const response = await getLeaderboard(map_id);
            setLeaderboard(response.data);
            setLoaded(true);
        } catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        getSetLeaderBoard();

    }, [map_id, updateLeaderboardCount])


    const renderLeaders = () => {
        if(!loaded){
            return <Loader/>
        }

        if(!leaderboard.length){
            return (
                <li className={'flex gap-4 font-bold text-white'}>
                    <p className={'text-highlightText w-[30px]'}>No results now</p>
                </li>
            )
        }

        return <ul>
            { leaderboard.map((item, index) => {
                    return (
                        <li className={'flex gap-4 font-bold text-white'}>
                            <p className={'text-highlightText w-[30px]'}>{++index}.</p>
                            <p className={'w-[40px]'}>{getFormattedTime(item.score)}</p>
                            <p className={'text-highlightText'}>{item.nickname}</p>
                        </li>);
              })
            }
        </ul>
    }

    return (
        <div className={styles}>
            <div className={'text-highlightText font-bold text-3xl text-center underline mb-5'}>Best scores</div>
            {renderLeaders()}
        </div>
    );
}

export default Leaderboard;