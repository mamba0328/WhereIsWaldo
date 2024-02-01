import React, { useState,} from 'react';

import GameWrapper from "../GameWrapper/GameWrapper";
import MapsSelector from "..//MapsSelector/MapsSelector";

import { Map } from '../../types/types';

const App = () => {
    const [selectedMap, setSelectedMap] = useState(null);
    const selectHandler = (map:Map) => setSelectedMap(map);

    const renderApp = () => {
        if(!selectedMap){
            return <MapsSelector selectMap={selectHandler}/>
        } else {
            return <GameWrapper map={selectedMap} exitMap={() => setSelectedMap(null)}/>
        }
    }

    return (
        <main className={'main'}>
            {renderApp()}
        </main>
    );
};

export default App;