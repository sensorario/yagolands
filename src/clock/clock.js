class Clock {

    time(seconds) {
        let sec = (seconds % 60).toString().padStart(2, '0');
        let min = (((seconds - sec)/ 60) % 60).toString().padStart(2, '0');
        let hours  = ((seconds-sec-(min*60))/3600).toString().padStart(2, '0');

        return `${hours}h:${min}m:${sec}s`;
    }

}

module.exports = Clock;
