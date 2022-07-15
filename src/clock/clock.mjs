export default function time(seconds) {
    let sec = (seconds % 60).toString().padStart(2, '0');
    let min = (((seconds - sec)/ 60) % 60).toString().padStart(2, '0');
    let hours  = (((seconds-sec-(min*60))/3600) % 24).toString().padStart(2, '0');
    let days = ((seconds - sec - (min * 60) - (hours * 3600))/ 86400);

    if (days === 0) {
        return `${hours}h:${min}m:${sec}s`;
    }

    let dd = days === 1 ? 'day' : 'days';

    return `${days} ${dd} and ${hours}h:${min}m:${sec}s`;
}
