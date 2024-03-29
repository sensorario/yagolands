const Tree = require('./tree');
const Building = require('./../building/building');
const b = new Building;

// @todo some refactoring here is necessary, I know.
// ... Done is better than perfect

test('list all buildings inside the tree', () => {
    const t = new Tree;

    xxx = new Building()
    xxx.define('iron', [], 1);
    t.addBuilding('xxx', xxx, 1);

    expect(t.listBuildings()).toEqual([{ name: 'xxx' }]);
    expect(t.numbweOfBuildings()).toEqual(1);

    yyy = new Building()
    yyy.define('iron', [], 1);
    t.addBuilding('yyy', yyy, 1, 'xxx', 1);
    t.addBuilding('xxx', xxx, 2, 'yyy', 1);

    expect(t.listBuildings()).toEqual([{ name: 'xxx' }, {name: 'yyy'}]);
    expect(t.numbweOfBuildings()).toEqual(2);
});

test('only first item in the tree must can have empty requirements', () => {
    const t = new Tree;
    builder = new Building()
    builder.define('castle', [{
        name: 'iron',
        amount: 10
        }], 1);
    t.addBuilding('xxx', builder, 1);
    expect(function () { t.addBuilding('xxx', builder); }).toThrow('building xxx must have requirements')
});

test('start empty', () => {
    const t = new Tree;
    expect(t.isEmpty()).toBe(true);
});

test('accept independent building', () => {
    const t = new Tree;
    builder = new Building();
    builder.define('iron', [], 1);
    t.addBuilding('castle', builder, 1);
    expect(t.isEmpty()).toBe(false);
});

test('extract one single building from the tree', () => {
    const t = new Tree;
    builder = new Building()
    builder.define('iron', [], 1);
    t.addBuilding('xxx', builder, 1);
    expect(t.extractBuilding('xxx')).toEqual({ name: 'xxx' });
});

test('extract full lookup table from the building tree', () => {
    const t = new Tree;
    builder = new Building()
    builder.define('iron', [], 42);
    t.addBuilding('castle', builder, 1);
    expect(t.lookupTable()).toEqual([{
        identifier: 'castle.1',
        building: 'castle',
        level: 1,
        requires: null,
        ingombro: 42
    }]);
});

test('detect first building has no requirements', () => {
    const t = new Tree;
    builder = new Building()
    builder.define('iron', [], 1);
    t.addBuilding('castle', builder, 1);
    let req = { requiredBuilding: 'castle', requiredLevel: 1 };
    expect(t.needsRequirements(req)).toBe(false);
});

test('detect other building has requirements', () => {
    const t = new Tree;

    let castle = new Building();
    let house = new Building();
    let windmill = new Building();
    let stall = new Building();

    castle.define('iron', [], 1);
    t.addBuilding('castle', castle, 1);

    house.define('iron', [], 1);
    t.addBuilding('house', house, 1, 'castle', 1);

    windmill.define('iron', [], 1);
    t.addBuilding('windmill', windmill, 1, 'castle', 1);
    t.addBuilding('windmill', windmill, 2, 'castle', 3);

    stall.define('iron', [], 1);
    t.addBuilding('stall', stall, 1, 'windmill', 1);
    t.addBuilding('stall', stall, 1, 'house', 1);

    let data = [{
        req: { requiredBuilding: 'stall', requiredLevel: 1 },
        res: [ { requiredBuilding: 'windmill', requiredLevel: 1 }, { requiredBuilding: 'house', requiredLevel: 1 } ],
    },{
        req: { requiredBuilding: 'windmill', requiredLevel: 1 },
        res: [ { requiredBuilding: 'castle', requiredLevel: 1 } ],
    },{
        req: { requiredBuilding: 'windmill', requiredLevel: 2 },
        res: [ { requiredBuilding: 'castle', requiredLevel: 3 } ],
    }];

    for(let i = 0; i < data.length; i++) {
        expect(t.needsRequirements(data[i].req))
            .toEqual(data[i].res)
    }
});

test('only one item in the tree can have empty requirements', () => {
    const t = new Tree;

    let castle = new Building();
    let house = new Building();

    castle.define('castle', [
        { name: 'iron', amount: 3 },
        { name: 'clay', amount: 3 },
    ], 1);
    house.define('windmill', [
        { name: 'iron', amount: 3 },
        { name: 'clay', amount: 3 },
    ], 1);

    t.addBuilding('castle', castle, 1);

    expect(t.firstBuilding()).toEqual({castle: 1});
})

test('create a map', () => {
    const t = new Tree;

    let castle = new Building();
    let house = new Building();

    castle.define('iron', [], 1);
    house.define('iron', [], 1);

    t.addBuilding('castle', castle, 1);
    t.addBuilding('house', house, 1, 'castle', 1);

    expect(t.createMap()).toEqual([{
        name: 'castle',
        level: 1,
    }, {
        name: 'house',
        level: 1,
        required: {
            name: 'castle',
            level: 1,
        },
    }]);
})

test('build an array of actions', () => {
    const t = new Tree;

    let castle = new Building();
    let house = new Building();

    castle.define('iron', [], 1);
    house.define('iron', [], 1);

    t.addBuilding('castle', castle, 1);
    t.addBuilding('house', house, 1, 'castle', 1);

    expect(t.actions()).toEqual([ 'build_castle', 'build_house' ]);
})
