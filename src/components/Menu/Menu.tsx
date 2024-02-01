import React, {useCallback, useState} from 'react';
import { useDraggable } from "../../hooks/useDraggable/useDraggable";

import { charStatuses } from "../../consts/consts";
import { Character } from "../../types/types";

import { getFormattedTime } from "../../utils/helpers/helpers";

type Props = {
    config: Character[],
    exitMap: Function
}
function Menu({config, exitMap, ...props} : Props) {
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

    const renderItems = () => {
       return (
           <ul className={'flex flex-col gap-3 p-2'}>
               {config.map((item, index) => {
                   const isFounded = item.status === charStatuses.FOUNDED;
                   const foundedStyles = isFounded ? 'line-through text-appGreen' : '';
                   const formattedTime = getFormattedTime(item.timeTaken);
                   return (
                       <li key={index} className={`tooltip-wrapper border-b-2 border-b-secondaryBg border-opacity-30 select-none mr-5 flex flex-col gap-2 ${isFounded && 'founded'}` }>
                           <div className={'flex w-full justify-between gap-2'}>
                               <p className={`font-bold font-mono ${foundedStyles}`}>{item.name}</p>
                               {isFounded && <span className={'ml-auto opacity-80'}>{formattedTime}</span>}
                           </div>
                           {!collapsed && <p className={'tooltip hidden text-highlightText'}>{item.hint}</p>}
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
        <div ref={ref} className={`collapse-menu min-w-[300px] fixed left-2 top-2 bg-mainBg bg-opacity-90 py-5 pl-1 pr-0 pt-0 text-mainText overflow-hidden ${collapsed ? 'max-h-[50px]' : 'max-h-[99vh]'}`}>
            <div className={'flex items-center justify-center'}>
                <img className={'max-w-[40px] cursor-pointer box-border py-1'} src={'/imgs/icons/exit.svg'} alt={'exit-button'} onClick={() => exitMap()}/>
                {collapsed && <p className={'text-mainText font-bold font-mono min-w-max text-center flex-grow'}>Chars left: {itemsLeft}</p>}
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