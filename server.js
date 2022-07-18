const websocket = require('ws'),
    server = new websocket.Server({ port: 12345, }),
    generator = require('./generator'),

    // import game libraries
    Game = require('./src/game/game'),
    Messenger = require('./src/messenger/messenger'),
    Tree = require('./src/tree/tree'),
    Building = require('./src/building/building'),
    Unit = require('./src/unit/unit'),
    Village = require('./src/village/village')


// globals
let seconds = 0;

// init game objects, ...
let game = new Game();
let tree = new Tree();
let messenger = new Messenger(tree);
let firstUnit = new Unit();

let castle = new Building();
castle.define('castle', [
    {name: 'iron', amount: 16},
    {name: 'wood', amount: 15},
    {name: 'clay', amount: 14},
    {name: 'grain', amount: 17},
]);

let warehouse = new Building();
warehouse.define('warehouse', [
    {name: 'iron', amount: 37},
    {name: 'wood', amount: 38},
    {name: 'clay', amount: 35},
    {name: 'grain', amount: 36},
]);

// websockets
server.on('connection', ws => {
    messenger.addClient({ id: generator.generateID(), ws: ws });
    ws.on('message', data => {
        messenger.messenger(data);
    });
})

// configure building Tree
tree.addBuilding('castle', castle);
tree.addBuilding('warehouse', warehouse, 1, 'castle', 1);

game.addBuildingTreeAndUnits(tree, [firstUnit]);

// @todo make this operation atomic
game.addDemoUser({ username: 'user', password: 'password', });
game.addVillage('user', new Village('user', 'sensorario\'s village'));

messenger.setState({
    numberOfVillages: game.numberOfVillages(),
    numberOfFields: game.numberOfFields(),
});

// castle of level 2 unlock units
game.grandUnitBuildiner({ building: 'castle', level: 2 });

function gameStarter() {
    game.start();
    setTimeout(() => {
        seconds++;
        messenger.updateSeconds(seconds);
        gameStarter();
    }, 1000);
}

gameStarter();
