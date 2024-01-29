import React, {useEffect, useState} from 'react';
import {getMaps} from "../../api/routes";

import { Map } from '../../types/types'

type Props = {
    selectMap: (obj:Map) => void;
}
function MapsSelector({selectMap, ...props}:Props) {
    const [maps, setMaps] = useState([] as Map[])

    const getSetMaps = async () => {
        try {
            const maps = await getMaps();
            setMaps(maps.data)
        } catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        getSetMaps();
    }, [])

    useEffect(() => {
        //rewrite to select handler
        selectMap(maps[0]);
    }, [maps])

    return (
        <div></div>
    );
}

export default MapsSelector;