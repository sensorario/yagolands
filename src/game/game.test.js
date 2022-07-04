const Game = require('./game')
const Tree = require('./../tree/tree')
const Building = require('./../building/building')
const Unit = require('./../unit/unit')

const game = new Game();

test('game cant start without buildings', () => {
    expect(game.canStart()).toBe(false);
})

test('game can start with building tree and units defined', () => {
    let tree = new Tree();
    let castle = new Building();
    let firstUnit = new Unit();

    tree.addBuilding('castle', castle);
    game.addBuildingTreeAndUnits(tree, [firstUnit]);

    expect(game.canStart()).toBe(true);
    expect(game.numbweOfBuildings()).toEqual(1);
    expect(game.numbweOfUnits()).toEqual(1);
})

