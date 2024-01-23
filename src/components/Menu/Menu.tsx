import React, {useCallback, useState} from 'react';
import { useDraggable } from "../../hooks/useDraggable/useDraggable";

import { charStatuses } from "../../consts/consts";
import { Character } from "../../types/types";

type Props = {
    config: Character[],
}
function Menu({config, ...props} : Props) {
    const [collapsed, setCollapsed] = useState(false);

    const handleDrag = useCallback(
        ({ x, y } : {x:number, y:number}) => ({
            x: Math.max(0, x),
            y: Math.max(0, y)
        }),
        []
    );
    const [ref, pressed]= useDraggable({
        onDrag: handleDrag
    });


    const getFormattedTime = (ms:number) => {
        const date = new Date(ms);
        const seconds = date.getSeconds();
        const minutes = date.getMinutes();
        return `${minutes}:${seconds < 9 ? '0' + seconds : seconds}`
    }
    const renderItems = () => {
       return (
           <ul className={'flex flex-col gap-3'}>
               {config.map(item => {
                   const isFounded = item.status === charStatuses.FOUNDED;
                   const foundedStyles = isFounded ? 'line-through text-appGreen' : '';
                   const formattedTime = getFormattedTime(item.timeTaken);
                   return (
                       <li className={`tooltip-wrapper border-b-2 border-b-secondaryBg border-opacity-30 select-none mr-5 flex flex-col gap-2 ${isFounded && 'founded'}` }>
                           <div className={'flex w-full justify-between gap-2'}>
                               <p className={`font-bold font-mono ${foundedStyles}`}>{item.name}</p>
                               {isFounded && <span className={'ml-auto opacity-80'}>{formattedTime}</span>}
                           </div>
                           <p className={'tooltip hidden text-highlightText'}>{item.hint}</p>
                       </li>
                   )
               })}
            </ul>
       )
    }

    const toggleMenu = () => setCollapsed(!collapsed);


    const itemsLeft = config.filter(item => item.status === charStatuses.UNFOUNDED)?.length;

    return (
        // @ts-ignore
        <div ref={ref} className={`collapse-menu fixed left-2 top-2 bg-mainBg bg-opacity-90 p-5 pr-0 pt-0 text-mainText overflow-hidden ${collapsed ? 'max-h-[35px]' : 'max-h-[99vh]'}`}>
            <div className={'flex items-center justify-center'}>
                {collapsed && <p className={'text-mainText font-bold font-mono'}>Chars left: {itemsLeft}</p>}
                <div className={' max-w-min p-3 ml-auto' } onClick={toggleMenu}>
                    <div className={`collapse-button ${collapsed ? '' : 'active'} ` }></div>
                </div>
            </div>
            <div>
                {renderItems()}
            </div>
        </div>
    );
}

export default Menu;