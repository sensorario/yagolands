const Tree = require('./tree');
const Building = require('./../building/building');
const t = new Tree;
const b = new Building;

test('start empty', () => {
    expect(t.isEmpty()).toBe(true);
})

test('accept building', () => {
    builder = new Building()

    t.addBuilding('castle', builder.define({
        name: 'iron',
        amount: 10,
    }));

    expect(t.isEmpty()).toBe(false);
})
