import React, {useEffect} from 'react';

import Home from './components/Home'
const App = () => {

    useEffect(() => {
        document.title = 'Where is Waldo clone'
    }, [])

    return (
        <Home/>
    );
};

export default App;