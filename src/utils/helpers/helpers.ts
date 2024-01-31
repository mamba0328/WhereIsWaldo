export const getFormattedTime = (ms:number) => {
    const date = new Date(ms);
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    return `${minutes}:${seconds < 9 ? '0' + seconds : seconds}`
}