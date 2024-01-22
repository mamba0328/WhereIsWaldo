import React from 'react';

import { Pointer } from "../../types/types";
const Pointer = ({x, y, status, ...props} : Pointer) => {
    return (
        <div className={'pointer'} style={ {left:`${x}%`, top: `${y}%`}}></div>
    );
};

export default Pointer;