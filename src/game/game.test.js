const Game = require('./game')
const Tree = require('./../tree/tree')
const Building = require('./../building/building')

const game = new Game();

test('game cant start without buildings', () => {
    expect(game.canStart()).toBe(false);
})

test('game can start with building tree', () => {
    let tree = new Tree();
    let castle = new Building();

    tree.addBuilding('castle', castle)

    game.addBuildingTree(tree)

    expect(game.canStart()).toBe(true);
})

