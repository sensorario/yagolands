const Tree = require('./../tree/tree');
const Building = require('./../building/building');
const timing = require('./timing');

test('first test', () => {
    let tree = new Tree();
    let castle = new Building();
    castle.define('castle', [
        { name: 'iron', amount: 32 },
        { name: 'wood', amount: 43 },
    ])
    tree.addBuilding('castle', castle, 1);
    let seconds = timing.getTimeToBuild( 'build_castle', 1, tree);
    expect(seconds).toEqual(75);
});
