const websocket = require('ws'),
    server = new websocket.Server({ port: 12345, }),
    messenger = require('./messenger'),
    generator = require('./generator')

server.on('connection', ws => {
    messenger.addClient({ id: generator.generateID(), ws: ws });
    ws.on('message', data => { messenger.messenger(data) })
})
