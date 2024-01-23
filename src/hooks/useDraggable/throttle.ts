export const throttle = (callback:Function) => {
    let token:number = null,
        lastArgs:any[] = null;
    const invoke = () => {
        callback(...lastArgs);
        token = null;
    };
    const result = (...args:any[]) => {
        lastArgs = args;
        if (!token) {
            token = requestAnimationFrame(invoke);
        }
    };

    result.cancel = () => token && cancelAnimationFrame(token);
    return result;
};