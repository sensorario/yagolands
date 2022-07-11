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
    let div = document.querySelector('.numberOfClients');
    div.innerHTML = numberOfClients;
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

setTimeout(() => {
    send(JSON.stringify({
        text: 'new client is connected'
    }));
}, 1000);
