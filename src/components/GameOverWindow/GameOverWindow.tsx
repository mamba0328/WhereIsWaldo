import React, {useEffect, useRef, useState} from 'react';
import Leaderboard from "../Leaderboard/Leaderboard";
import Loader from "../Loader/Loader";

import { Map } from "../../types/types";

import {getUserByIp, getUsersScore, assignScore, createUser} from "../../api/routes";

import { getFormattedTime } from "../../utils/helpers/helpers";


type Props = {
    score: number,
    map: Map,
}
function GameOverWindow({score, map, ...props}:Props) {
    const [currentUser, setCurrentUser] = useState(null);
    const [usersPreviousScore, setUsersPreviousScore] = useState(null);
    const [scoreIsSend, setScoreIsSend] = useState(false);
    const [updateLeaderboardCount, setUpdateLeaderboardCount] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const ref = useRef(null);
    const getSetCurrentUser = async () => {
        try{
            const response = await getUserByIp();
            response.data && setCurrentUser(response.data);
        } catch (error){
            console.log(error);
        }
    }

    const getSetUsersPreviousScore = async () => {
        try{
            const response = await getUsersScore(map._id, currentUser._id);
            response.data && setUsersPreviousScore(response.data);
            setLoaded(true)
        } catch (error){
            console.log(error);
        }
    }

    const submitScore = async () => {
        try {
            setLoaded(false)
            let user

            if(!currentUser){
                const newUser = await createUser();
                user = newUser.data;
            } else {
                user = currentUser;
            }

            const payload = {
                map_id: map._id,
                user_id: user._id,
                nickname: ref.current.value,
                score,
            }

            const response = await assignScore(payload);

            setUpdateLeaderboardCount(updateLeaderboardCount + 1);
            setScoreIsSend(true);
            setLoaded(true);
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        getSetCurrentUser();
    }, [map, score])

    useEffect(() => {
        getSetUsersPreviousScore();
    }, [currentUser])


    const renderAssignScoreForm = () => {
        const previousResultIsBetter = usersPreviousScore?.score < score;

        switch (true){
            case !loaded: {
                return <Loader/>
            }
            case scoreIsSend:{
                return <h1 className={'text-highlightText font-bold text-3xl'}>Your score is submitted</h1>
            }
            case previousResultIsBetter: {
                return (
                        <div className={'flex flex-col gap-2 items-center'}>
                            <h1 className={'text-highlightText font-bold text-3xl text-center'}>Your BestScore is</h1>
                            <p className={'text-white font-bold font-mono text-lg'}>{getFormattedTime(usersPreviousScore.score)}</p>
                        </div>
                )
            }
            default: {

                return (
                        <form className={'flex flex-col gap-2'}>
                            {/*@ts-ignore*/}
                            <input ref={ref} className={'bg-secondaryBg border-highlightText border-2 p-2'} type={'text'} name={'name'} id={'name'} placeholder={'Enter your name'}/>
                            <button className={'bg-secondaryBg text-highlightText font-bold uppercase p-2'} type={'button'} onClick={submitScore}>Submit your score!</button>
                        </form>
                )
            }
        }

    }

    return (
        <div className={'fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex max-h-[50vh] items-center bg-mainBg'}>

            <div className={'flex flex-col items-center gap-3 p-5'}>
                <h1 className={'text-highlightText font-bold text-3xl'}>You win!</h1>
                <p className={'text-white font-bold font-mono text-lg'}>{getFormattedTime(score)}</p>
                { renderAssignScoreForm() }
            </div>

            <Leaderboard updateLeaderboardCount={updateLeaderboardCount} map_id={map._id} styles={'w-max p-2 bg-secondaryBg max-h-[50vh] min-h-[50vh] overflow-auto overscroll-contain'}/>
        </div>
    );
}

export default GameOverWindow;