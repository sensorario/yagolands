const Game = require('./game')
const Tree = require('./../tree/tree')
const Building = require('./../building/building')
const Unit = require('./../unit/unit')

const game = new Game();

test('game cant start without buildings', () => {
    expect(game.canStart()).toBe(false);
})

test('game cant start without definition of building that unlock units', () => {
    let tree = new Tree();
    let castle = new Building();
    let firstUnit = new Unit();

    tree.addBuilding('castle', castle);
    game.addBuildingTreeAndUnits(tree, [firstUnit]);

    expect(function () { game.start() } ).toThrow('mannaggia');
})

test('game cant start without definition of building that unlock units', () => {
    let tree = new Tree();
    let castle = new Building();
    let firstUnit = new Unit();

    tree.addBuilding('castle', castle);
    game.addBuildingTreeAndUnits(tree, [firstUnit]);
    game.grandUnitBuildiner({
        building: 'castle',
        level: 2,
    });

    expect(game.canStart()).toBe(true);
})

