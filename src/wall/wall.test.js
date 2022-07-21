const Wall = require('./wall')
const wall = new Wall();

test(`list of available actions`, () => {
    wall.treeBuilding([
        { name: 'castle', level: 1 },
        { name: 'windmill', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'warehouse', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'windmill', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'warehouse', level: 1 } },
    ]);
    expect(wall.actions()).toEqual([ 'build_castle', 'build_windmill', 'build_warehouse' ])
    expect(wall.requirementOf('windmill')).toEqual({ name: 'castle', level: 1 })
    expect(wall.canBuild('windmill')).toEqual(false)
    expect(wall.canBuild('castle')).toEqual(true)
})

test(`deny building that is not present in the tree`, () => {
    wall.treeBuilding([
        { name: 'castle', level: 1 },
        { name: 'windmill', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'warehouse', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'windmill', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'warehouse', level: 1 } },
    ]);
    expect(wall.canBuild('foo')).toEqual(false)
})

test(`allow next level of an already built building`, () => { })
