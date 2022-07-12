const connection = new WebSocket('ws://localhost:12345'),
    msg = document.getElementById('msg');

function send (data) {
    if (connection.readyState === WebSocket.OPEN) {
        connection.send(data);
    } else {
        console.error('not connected');
    }
}

connection.addEventListener('open', () => {
    console.log('connected');
})

connection.addEventListener('message', e => {
    let numberOfClients = JSON.parse(e.data).numberOfClients;
    let numberOfVillages = JSON.parse(e.data).numberOfVillages;
    let divOfClients = document.querySelector('.numberOfClients');
    let divOfVillages = document.querySelector('.numberOfVillages');
    divOfClients.innerHTML = numberOfClients;
    divOfVillages.innerHTML = numberOfVillages;
})

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

function messaggio() {
    send(JSON.stringify({
        text: 'bottone',
        to: 'all'
    }));
};

setTimeout(() => { messaggio(); }, 500);
