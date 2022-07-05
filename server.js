const websocket = require('ws'),
    server = new websocket.Server({ port: 12345, }),
    messenger = require('./messenger'),
    generator = require('./generator'),

    // import game libraries
    Game = require('./src/game/game'),
    Tree = require('./src/tree/tree'),
    Building = require('./src/building/building'),
    Unit = require('./src/unit/unit')


// init game objects, ...
const game = new Game();
const tree = new Tree();
const castle = new Building();
const firstUnit = new Unit();

// configure the game
tree.addBuilding('castle', castle);
game.addBuildingTreeAndUnits(tree, [firstUnit]);
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

