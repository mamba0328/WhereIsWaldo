import React, {useState, useCallback, useEffect,} from 'react';

import GameWrapper from "./components/GameWrapper/GameWrapper";
import MapsSelector from "./components/MapsSelector/MapsSelector";

import { Map } from './types/types';

const App = () => {
    const [selectedMap, setSelectedMap] = useState(null);

    const selectHandler = (map:Map) => setSelectedMap(map);

    const renderApp = () => {
        if(!selectedMap){
            return <MapsSelector selectMap={selectHandler}/>
        } else {
            return <GameWrapper map={selectedMap}/>
        }
    }

    return (
        <main className={'main'}>
            {renderApp()}
        </main>
    );
};

export default App;