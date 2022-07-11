# Yagolands

## Yet Another (Browser) Game Online

### Getting started

 - git clone https://github.com/sensorario/websocket-node-chat.git
 - cd websocket-node-chat
 - npm install
 - npm test

### Install the engine

 - npm i https://github.com/sensorario/yagolands

### Sample server

```javascript
const websocket = require('ws'),
    server = new websocket.Server({ port: 12345, }),
    messenger = require('./node_modules/yagolands/messenger'),
    generator = require('./node_modules/yagolands/generator'),

// import game libraries
Game = require('./node_modules/yagolands/src/game/game'),
Tree = require('./node_modules/yagolands/src/tree/tree'),
Building = require('./node_modules/yagolands/src/building/building'),
Unit = require('./node_modules/yagolands/src/unit/unit')


// init game objects, ...
const game = new Game();
const tree = new Tree();
const castle = new Building();
const firstUnit = new Unit();

// configure the game
tree.addBuilding('castle', castle);
game.addBuildingTreeAndUnits(tree, [firstUnit]);
game.addDemoUser({
    username: 'sensorario',
    password: 'password',
});
game.grandUnitBuildiner({
    building: 'castle',
    level: 2,
});

function gameStarter(game) {
    console.log('.');
    game.start();
    setTimeout(() => {
    gameStarter(game);
    }, 1000);
}
gameStarter(game);

server.on('connection', ws => {
    messenger.addClient({ id: generator.generateID(), ws: ws });
    ws.on('message', data => { messenger.messenger(data) })
})
```
