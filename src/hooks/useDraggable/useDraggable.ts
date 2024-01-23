//https://stackoverflow.com/a/39192992

import {useCallback, useEffect, useRef, useState } from "react";
import { throttle } from "./throttle";
const id = (x:any) => x;
// complex logic should be a hook, not a component
export const useDraggable = ({ onDrag = id } = {}) => {
    const [pressed, setPressed] = useState(false);

    // do not store position in useState! even if you useEffect on
    // it and update `transform` CSS property, React still rerenders
    // on every state change, and it LAGS
    const position:any = useRef({ x: 0, y: 0 });
    const ref:any = useRef();

    // we've moved the code into the hook, and it would be weird to
    // return `ref` and `handleMouseDown` to be set on the same element
    // why not just do the job on our own here and use a function-ref
    // to subscribe to `mousedown` too? it would go like this:
    const unsubscribe:any = useRef();
    const legacyRef = useCallback((elem:HTMLElement) => {
        // in a production version of this code I'd use a
        // `useComposeRef` hook to compose function-ref and object-ref
        // into one ref, and then would return it. combining
        // hooks in this way by hand is error-prone

        // then I'd also split out the rest of this function into a
        // separate hook to be called like this:
        // const legacyRef = useDomEvent('mousedown');
        // const combinedRef = useCombinedRef(ref, legacyRef);
        // return [combinedRef, pressed];
        ref.current = elem;
        if (unsubscribe.current) {
            unsubscribe.current();
        }
        if (!elem) {
            return ;
        }
        const handleMouseDown = (e:MouseEvent) => {
            const element:HTMLButtonElement = e.target as HTMLButtonElement;

            element.style.userSelect = "none";
            setPressed(true);
        };
        elem.addEventListener("mousedown", handleMouseDown);
        unsubscribe.current = () => {
            elem.removeEventListener("mousedown", handleMouseDown);
        };
    }, []);
    // useEffect(() => {
    //   return () => {
    //     // this shouldn't really happen if React properly calls
    //     // function-refs, but I'm not proficient enough to know
    //     // for sure, and you might get a memory leak out of it
    //     if (unsubscribe.current) {
    //       unsubscribe.current();
    //     }
    //   };
    // }, []);

    useEffect(() => {
        if (!pressed) {
            return;
        }
        // updating the page without any throttling is a bad idea
        // requestAnimationFrame-based throttle would probably be fine,
        // but be aware that naive implementation might make element
        // lag 1 frame behind cursor, and it will appear to be lagging
        // even at 60 FPS
        const handleMouseMove = throttle((event:MouseEvent) => {
            // needed for TypeScript anyway
            if (!ref.current || !position.current) {
                return;
            }
            const pos = position.current;

            const elem = ref.current;

            position.current = onDrag({
                x: pos.x + event.movementX,
                y: pos.y + event.movementY
            });

            elem.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        });
        const handleMouseUp = (e:Event) => {
            const element:HTMLButtonElement = e.target as HTMLButtonElement;
            element.style.userSelect = "auto";
            setPressed(false);
        };
        // subscribe to mousemove and mouseup on document, otherwise you
        // can escape bounds of element while dragging and get stuck
        // dragging it forever
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            handleMouseMove.cancel();
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
        // if `onDrag` wasn't defined with `useCallback`, we'd have to
        // resubscribe to 2 DOM events here, not to say it would mess
        // with `throttle` and reset its internal timer
    }, [pressed, onDrag]);

    // actually it makes sense to return an array only when
    // you expect that on the caller side all of the fields
    // will be usually renamed
    return [legacyRef, pressed];

};