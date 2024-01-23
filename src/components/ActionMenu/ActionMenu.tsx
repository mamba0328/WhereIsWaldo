import React from 'react';

import { Character, Position} from "../../types/types";
import { charStatuses } from "../../consts/consts";

type Props = {
    config: Character[],
    position: Position,
}
function ActionMenu({config, position:{x, y}, ...props}:Props) {
    const unfoundedItems = config.filter(item => item.status === charStatuses.UNFOUNDED);


    //prevents showing outside the window
    const translateX = x > 50 ? '-100%' : 0;
    const translateY = y > 50 ? '-100%' : 0;

    return (
        <div className={'pointer-menu bg-secondaryBg bg-opacity-80 p-2'} style={ {left:`${x}%`, top: `${y}%`, transform:`translate(${translateX}, ${translateY})`}}>
            <h1 className={'font-bold font-mono text-mainText text-center border-b-secondaryBg border-b-2'}>Who is it?</h1>
            <ul className={'flex-col gap-2'}>
                {unfoundedItems.map(item => {
                    return (
                        <li className={`border-b-2 border-b-secondaryBg border-opacity-30 select-none mr-5 flex gap-2` }>
                            <p className={`font-bold font-mono text-mainText hover:text-highlightText`}>{item.name}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default ActionMenu;