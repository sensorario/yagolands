const Clock = require('./clock')
const clock = new Clock();

test(`display 00h:00m:00s`, () => {
    const inputs = [
        {sec:0, time:'00h:00m:00s'},
        {sec:42, time:'00h:00m:42s'},
        {sec:61, time:'00h:01m:01s'},
        {sec:3601, time:'01h:00m:01s'},
        {sec:3701, time:'01h:01m:41s'},
        {sec:86401, time:'1 day and 00h:00m:01s'},
        {sec:176401, time:'2 days and 01h:00m:01s'},
    ];

    for (let i = 0; i < inputs.length; i++) {
        expect(clock.time(inputs[i].sec))
            .toEqual(inputs[i].time);
    }
})
