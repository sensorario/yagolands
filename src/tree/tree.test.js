const Tree = require('./tree');
const Building = require('./../building/building');
const b = new Building;

// @todo some refactoring here is necessary, I know.
// ... Done is better than perfect

test('list all buildings inside the tree', () => {
        const t = new Tree;
    builder = new Building()
    builder.define({
        name: 'iron',
        amount: 10,
    });
    t.addBuilding('xxx', builder);
    expect(t.listBuildings()).toEqual([{
        name: 'xxx'
    }]);
});

test('start empty', () => {
        const t = new Tree;
    expect(t.isEmpty()).toBe(true);
});

test('accept independent building', () => {
        const t = new Tree;
    builder = new Building();
    builder.define({
        name: 'iron',
        amount: 10,
    });
    t.addBuilding('castle', builder);
    expect(t.isEmpty()).toBe(false);
});

test('extract one single building from the tree', () => {
        const t = new Tree;
    builder = new Building()
    builder.define({
        name: 'iron',
        amount: 10,
    });
    t.addBuilding('xxx', builder);
    expect(t.extractBuilding('xxx')).toEqual({
        name: 'xxx'
    });
});

test('extract lookup table', () => {
        const t = new Tree;
    builder = new Building()
    builder.define({
        name: 'iron',
        amount: 10,
    });
    t.addBuilding('castle', builder);
    expect(t.lookupTable()).toEqual([{
        building: 'castle',
        level: 1,
        requires: null 
    }]);
});

test('detect first building has no requirements', () => {
    const t = new Tree;
    builder = new Building()
    builder.define({
        name: 'iron',
        amount: 10,
    });
    t.addBuilding('castle', builder);
    let req = {
        requiredBuilding: 'castle',
        requiredLevel: 1,
    };
    expect(t.needsRequirements(req)).toBe(false);
});

test('detect other building has requirements', () => {
    const t = new Tree;

    let castle = new Building();
    let house = new Building();

    castle.define({ name: 'iron', amount: 10, });
    t.addBuilding('castle', castle);
    house.define({ name: 'iron', amount: 10, });
    t.addBuilding('house', house, 1, 'castle', 1);

    let req = { requiredBuilding: 'house', requiredLevel: 1, };
    let res = { requiredBuilding: 'castle', requiredLevel: 1, };

    expect(t.needsRequirements(req)).toEqual(res)
});
