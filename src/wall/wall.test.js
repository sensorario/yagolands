const Wall = require('./wall')

test(`list of available actions`, () => {
    const wall = new Wall();
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
    const wall = new Wall();
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

test(`list of available actions`, () => {
    const wall = new Wall();
    wall.treeBuilding([
        { name: 'castle', level: 1 },
        { name: 'windmill', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'warehouse', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'windmill', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'warehouse', level: 1 } },
    ]);
    wall.addToQueue({ name: 'castle', level: 1 });
    expect(wall.canBuild('castle')).toEqual(false)
    expect(wall.getRequirementsOf('warehouse', 1)).toEqual({ name: 'castle', level: 1 })
    expect(wall.isRequirementPresent({ name: 'castle', level: 1 })).toEqual(true)
    expect(wall.canBuild('warehouse', 1)).toEqual(true)
})

test(`list of available actions`, () => {
    const wall = new Wall();
    wall.treeBuilding([
        { name: 'castle', level: 1 },
        { name: 'windmill', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'warehouse', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'windmill', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'warehouse', level: 1 } },
    ]);
    wall.addToQueue({ name: 'castle', level: 1 });
    wall.addToQueue({ name: 'warehouse', level: 1 });
    expect(wall.canBuild('warehouse', 1)).toEqual(false)
})

test(`extracrt next level of a given building`, () => {
    const wall = new Wall();
    wall.treeBuilding([
        { name: 'castle', level: 1 },
        { name: 'windmill', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'warehouse', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'windmill', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'warehouse', level: 1 } },
    ]);
    wall.addToQueue({ name: 'castle', level: 1 });
    wall.addToQueue({ name: 'castle', level: 2 });
    expect(wall.extractNextLevelOf('castle')).toEqual(3);
})
