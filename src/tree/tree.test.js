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
