let clients = [];

exports.addClient = function (client) {
    clients.push(client);
    console.log('clients:', clients.length)
}

exports.messenger = function (data) {
    let message = JSON.parse(data);
    if (message.to === '') { message.to = 'all' }

    let send = false;
    let newClients = []

    for(let i = 0; i < clients.length; i++) {
        if (message.to === 'all' || clients[i].id === message.to) { send = true }
        if (clients[i].ws.readyState === 3) { send = false }
        if (send === true) {
            console.log('message sent to the client', clients[i].id);
            newClients.push(clients[i])
        } else {
            console.log('client', clients[i], 'lost');
            console.log('message not sent to the client', clients[i].id);
        }
    }

    clients = newClients

    for(let i = 0; i < clients.length; i++) {
        clients[i].ws.send(JSON.stringify({
            id: clients[i].id,
            message: JSON.parse(data),
            numberOfClients: clients.length,
        }))
    }
}
