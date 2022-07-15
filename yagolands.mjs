import clock from './src/clock/clock.mjs';

const connection = new WebSocket('ws://localhost:12345'),
    msg = document.getElementById('msg');

let savedTime = 0;

function send (data) {
    if (connection.readyState === WebSocket.OPEN) {
        connection.send(data);
    } else {
        console.error('not connected');
    }
}

connection.addEventListener('message', e => {
    savedTime = JSON.parse(e.data).rawseconds;
});

function updateClock() {
    document.querySelector('.seconds').innerHTML = clock(++savedTime);
    setTimeout(() => updateClock(), 1000);
}

updateClock();
