export function formatNumberToTimeLength(timeLength) {
    const hour = Math.floor(timeLength / 60);
    const minute = Math.floor(timeLength % 60);
    return (hour ? `${hour}h` : '') + (minute ? ` ${minute}m` : '');
}