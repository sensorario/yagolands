import clock from './src/clock/clock.mjs';

const connection = new WebSocket('ws://localhost:12345'),
    msg = document.getElementById('msg');

let savedTime = 0;

connection.addEventListener('message', e => {
    savedTime = JSON.parse(e.data).rawseconds;
});

connection.addEventListener('message', e => {
    console.log(e.data);
});

connection.addEventListener('message', e => {
    let numberOfClients = JSON.parse(e.data).numberOfClients;
    let numberOfVillages = JSON.parse(e.data).numberOfVillages;
    let numberOfFields = JSON.parse(e.data).numberOfFields;
    let seconds = JSON.parse(e.data).seconds;

    let divOfClients = document.querySelector('.numberOfClients');
    let divOfVillages = document.querySelector('.numberOfVillages');
    let divOfFields = document.querySelector('.numberOfFields');
    let divOfSeconds = document.querySelector('.seconds');

    divOfClients.innerHTML = numberOfClients;
    divOfVillages.innerHTML = numberOfVillages;
    divOfFields.innerHTML = numberOfFields;
    divOfSeconds.innerHTML = seconds;
})

function updateClock() {
    document.querySelector('.seconds').innerHTML = clock(++savedTime);
    setTimeout(() => updateClock(), 1000);
}

updateClock();

msg.addEventListener('keydown', e => {
    let kc = e.which || e.keyCode;
    if (kc === 13) {
        let to = document.getElementById('to')
        send(JSON.stringify({
            text: msg.value,
            to: to.value
        }));
        msg.value = '';
        to.value = '';
    }
})


function send (data) {
    if (connection.readyState === WebSocket.OPEN) {
        connection.send(data);
    } else {
        console.error('not connected');
    }
}

function messaggio() {
    send(JSON.stringify({
        text: 'bottone',
        to: 'all'
    }));
};

setTimeout(() => { messaggio(); }, 500);
