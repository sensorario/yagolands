const Tree = require('./../tree/tree');
const Building = require('./../building/building');
const timing = require('./timing');

test('calculate duration using resources amount', () => {
    let tree = new Tree();
    let castle = new Building();
    castle.define('castle', [
        { name: 'iron', amount: 22 },
        { name: 'wood', amount: 18 },
        { name: 'fizz', amount: 31 },
        { name: 'buzz', amount: 24 },
    ])
    tree.addBuilding('castle', castle, 1);
    expect(timing.getTimeToBuild( 'build_castle', 1, tree)).toEqual(95);
    expect(timing.getTimeToBuild( 'build_castle', 2, tree)).toEqual(122);
});

test('other calc', () => {
    expect(timing.risorsa(22, 1)).toEqual(22);
    expect(timing.risorsa(22, 2)).toEqual(28);
    expect(timing.risorsa(22, 3)).toEqual(36);
    expect(timing.risorsa(22, 4)).toEqual(46);
    expect(timing.risorsa(22, 5)).toEqual(59);
});
