import React from 'react';

import { Pointer } from "../../types/types";
import { pointerStatuses } from "../../consts/consts";

const Pointer = ({x, y, status, ...props} : Pointer) => {
    return (
        <div className={`pointer pointer_${status === pointerStatuses.FOUNDED ? 'founded' : 'pending'}`} style={ {left:`${x}%`, top: `${y}%`}}></div>
    );
};

export default Pointer;