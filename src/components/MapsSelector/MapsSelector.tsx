import React, {useEffect, useState, useLayoutEffect} from 'react';
import {getMaps} from "../../api/routes";

import { Map } from '../../types/types'
import Loader from "../Loader/Loader";

type Props = {
    selectMap: (obj:Map) => void;
}
function MapsSelector({selectMap, ...props}:Props) {
    const [maps, setMaps] = useState([] as Map[]);
    const [mapPreview, setMapPreview] = useState('');
    const [currentTimer, setCurrentTimer] = useState(null)

    const changeMapPreview = (mapPath:string) => {
        if(!mapPreview && !mapPath){
            return setMapPreview(maps[0].path);
        }
        if(!mapPath){
            const currentMapPreviewIndex = maps.findIndex(map => map.path === mapPreview);
            const nextMapPreview = currentMapPreviewIndex + 1 === maps.length ? maps[0].path : maps[currentMapPreviewIndex + 1].path;
            return setMapPreview(nextMapPreview);
        }

        return setMapPreview(mapPath);
    }
    const changeMapPreviewDelayed = () => {
        return setTimeout(() => {
            // @ts-ignore
            changeMapPreview();
        }, 1000 * 5) //1sec * 15 = 15 sec
    }
    const getSetMaps = async () => {
        try {
            const maps = await getMaps();
            setMaps(maps.data)
        } catch (error){
            console.log(error);
        }
    }

    const setMapIsLoaded = (index:number) => {
        const mapsClone = [...maps];
        mapsClone[index].loaded = true;
        setMaps(mapsClone);
    }

    useEffect(() => {
        getSetMaps();
    }, [])


    useEffect(() => {

        if(!currentTimer && maps.length){ //only on mount, so map already previewed
            //@ts-ignore
            changeMapPreview();
        }

        //if preview was changed by hover, reset timeout
        if(currentTimer){
            clearTimeout(currentTimer)
        }

        if(maps.length){
            const timerId = changeMapPreviewDelayed();
            setCurrentTimer(timerId);
        }
    }, [maps, mapPreview])

    useLayoutEffect(() => {
        if(currentTimer){
            clearTimeout(currentTimer)
        }
    }, [])

    const renderMaps = () => {
        //turns out to funny naming
        return maps.map((map, index)=>{
            return (
                <li
                    key={index}
                    className={`flex flex-col text-center p-2 hover:bg-highlightText cursor-pointer ${mapPreview === map.path ? 'bg-highlightText' : 'bg-secondaryBg'}`}
                    onClick={() => {
                        if(!map.loaded) return
                        selectMap(map)
                     }
                    }
                    onMouseOver={() => setMapPreview(map.path)}
                >
                        <div className={'w-[350px] h-[225px] bg-cover relative'} style={{backgroundImage:`url(${map.path.replace('.', '_small.')})`}}>
                            <img src={map.path} className={`${map.loaded ? 'opacity-100' : 'opacity-0'} w-[350px] h-[225px]`} alt={`${map.name} preview`} onLoad={() => setMapIsLoaded(index)}/>
                            {!map.loaded && <Loader styles={'absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2'}/>}
                        </div>
                        <p className={'text-white text-lg font-bold'}>{map.name}</p>
                </li>
            )
        })
    }

    return (
        <section className={'grid content-center w-full bg-mainBg min-h-[100vh] py-10 bg-cover bg-no-repeat overflow-x-hidden'} style={{backgroundImage:`url(${mapPreview})`}}>
            <div className={'relative bg-secondaryBg bg-opacity-60 mb-[25vh] md:pt-[5rem] lg:pt-[9rem]'}>
                <h1 className={'md:text-6xl lg:text-9xl animate-grow logo font-bold text-highlightText text-center absolute left-1/2 -translate-x-1/2 w-full top-0 select-none'}>Where is Waldo?</h1>
                <p className={'font-bold text-white text-center pb-2'}>*To start the game: wait until one of the next maps is loaded and select it</p>
            </div>
            <ul className={'flex w-full justify-center px-10 flex-wrap gap-5 p-5'}>
                {renderMaps()}
            </ul>
        </section>
    );
}

export default MapsSelector;