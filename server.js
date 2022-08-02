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
    Wall = require('./src/wall/wall')


// globals
let seconds = 0;
let gameStatus = {};

// init game objects, ...
let game = new Game();
let tree = new Tree();
let messenger = new Messenger(tree, gameStatus);
let firstUnit = new Unit();
let wall = new Wall();

let castle = new Building();
let warehouse = new Building();
let windmill = new Building();
let barracks = new Building();
let edificioCiccio = new Building();

edificioCiccio.define('edificioCiccio', [
    {name: 'iron', amount: 10},
    {name: 'wood', amount: 10},
    {name: 'clay', amount: 10},
    {name: 'grain', amount: 10},
    {name: 'cippa', amount: 10},
]);
castle.define('castle', [
    {name: 'iron', amount: 10},
    {name: 'wood', amount: 10},
    {name: 'clay', amount: 10},
    {name: 'grain', amount: 10},
    {name: 'cippa', amount: 10},
]);
warehouse.define('warehouse', [
    {name: 'iron', amount: 10},
    {name: 'wood', amount: 11},
    {name: 'clay', amount: 10},
    {name: 'grain', amount: 10},
    {name: 'cippa', amount: 10},
]);
windmill.define('windmill', [
    {name: 'iron', amount: 10},
    {name: 'wood', amount: 12},
    {name: 'clay', amount: 10},
    {name: 'grain', amount: 10},
    {name: 'cippa', amount: 10},
]);
barracks.define('barracks', [
    {name: 'iron', amount: 10},
    {name: 'wood', amount: 11},
    {name: 'clay', amount: 11},
    {name: 'grain', amount: 11},
    {name: 'cippa', amount: 10},
]);

// websockets
server.on('connection', ws => {
    messenger.addClient({ id: generator.generateID(), ws: ws });
    ws.on('message', data => {
        messenger.messenger(data);
    });
})

// configure building Tree
tree.addBuilding('castle', castle, 1);
tree.addBuilding('warehouse', warehouse, 1, 'castle', 1);
tree.addBuilding('windmill', windmill, 1, 'castle', 1);
tree.addBuilding('castle', castle, 2, 'windmill', 1);
tree.addBuilding('castle', castle, 2, 'warehouse', 1);
tree.addBuilding('barracks', barracks, 1, 'castle', 2);
tree.addBuilding('edificioCiccio', edificioCiccio, 1, 'castle', 1);

let mappone = tree.createMap();
console.log(mappone);
wall.treeBuilding(mappone);

game.addBuildingTreeAndUnits(tree, [firstUnit]);

// @todo make this operation atomic
game.addDemoUser({ username: 'user', password: 'password', });
game.addVillage('user', new Village('user', 'sensorario\'s village'));

messenger.setWall(wall);
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
