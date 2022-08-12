const Wall = require('./wall')
const fakeId = 'f4k3-y4g0';

test(`extract abailable actions from inserted buildings`, () => {
    const wall = new Wall();
    wall.treeBuilding([
        { name: 'castle', level: 1 },
        { name: 'windmill', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'warehouse', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'windmill', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'warehouse', level: 1 } },
    ]);
    expect(wall.actions()).toEqual([
        'build_castle',
        'build_windmill',
        'build_warehouse',
    ])
})

test(`extract single requirement from a given building and level`, () => {
    const wall = new Wall();
    wall.treeBuilding([
        { name: 'castle', level: 1 },
        { name: 'windmill', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'warehouse', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'windmill', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'warehouse', level: 1 } },
    ]);
    expect(wall.getRequirementsOf('windmill', 1)).toEqual({ name: 'castle', level: 1 })
})

test(`detect a building without requirements cannot be built`, () => {
    const wall = new Wall();
    wall.treeBuilding([
        { name: 'castle', level: 1 },
        { name: 'windmill', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'warehouse', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'windmill', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'warehouse', level: 1 } },
    ]);
    expect(wall.canBuild('windmill', 1, fakeId)).toEqual(false)
    expect(wall.buildingStatus({ yid: fakeId })).toEqual([
        { name: 'castle', level: 0, visible: true },
        { name: 'windmill', level: 0, visible: false },
        { name: 'warehouse', level: 0, visible: false },
    ]);
})

test(`can built first building`, () => {
    const wall = new Wall();
    wall.treeBuilding([
        { name: 'castle', level: 1 },
        { name: 'windmill', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'warehouse', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'windmill', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'warehouse', level: 1 } },
    ]);
    expect(wall.canBuild('castle', 1, fakeId)).toEqual(true)
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
    expect(wall.canBuild('foo', 1, fakeId)).toEqual(false)
})

test(`deny building of allready built building`, () => {
    const wall = new Wall();
    wall.treeBuilding([
        { name: 'castle', level: 1 },
        { name: 'windmill', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'warehouse', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'windmill', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'warehouse', level: 1 } },
    ]);
    wall.addToQueue({ name: 'castle', level: 1, yid: fakeId, position: 42 });
    expect(wall.canBuild('castle', 1, fakeId)).toEqual(false)
    expect(wall.buildingStatus({ yid: fakeId })).toEqual([
        { name: 'castle', level: 1, visible: false },
        { name: 'windmill', level: 0, visible: true },
        { name: 'warehouse', level: 0, visible: true },
    ]);
})

test(`mark first building as visible whenever no other building are in queue`, () => {
    const wall = new Wall();
    wall.treeBuilding([
        { name: 'castle', level: 1 },
        { name: 'windmill', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'warehouse', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'windmill', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'warehouse', level: 1 } },
    ]);
    wall.addToQueue({ name: 'castle', level: 1, yid: fakeId, position: 42 });
    expect(wall.getQueueOf({yid:fakeId})).toEqual([{
        name: 'castle',
        level: 1,
        position: 42,
        visible: true,
    }])
})

test(`can build whenever requirements are satisfied`, () => {
    const wall = new Wall();
    wall.treeBuilding([
        { name: 'castle', level: 1 },
        { name: 'windmill', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'warehouse', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'windmill', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'warehouse', level: 1 } },
    ]);
    wall.addToQueue({ name: 'castle', level: 1, yid: fakeId, position: 42 });
    expect(wall.canBuild('warehouse', 1, fakeId)).toEqual(true)
})

test(`extract requirements of a given building`, () => {
    const wall = new Wall();
    wall.treeBuilding([
        { name: 'castle', level: 1 },
        { name: 'windmill', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'warehouse', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'windmill', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'warehouse', level: 1 } },
    ]);
    wall.addToQueue({ name: 'castle', level: 1, yid: fakeId, position: 42 });
    expect(wall.getRequirementsOf('warehouse', 1, fakeId)).toEqual({ name: 'castle', level: 1 })
})

test(`deny builfing that is already in the queue`, () => {
    const wall = new Wall();
    wall.treeBuilding([
        { name: 'castle', level: 1 },
        { name: 'windmill', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'warehouse', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'windmill', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'warehouse', level: 1 } },
    ]);
    wall.addToQueue({ name: 'castle', level: 1, yid: fakeId, position: 42 });
    wall.addToQueue({ name: 'warehouse', level: 1, yid: fakeId, position: 42 });
    expect(wall.canBuild('warehouse', 1, fakeId)).toEqual(false)
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
    wall.addToQueue({ name: 'castle', level: 1, yid: fakeId, position: 42 });
    wall.addToQueue({ name: 'castle', level: 2, yid: fakeId, position: 42 });
    expect(wall.extractNextLevelOf({ buildingName: 'castle', yid: fakeId, })).toEqual(3); })

test(`can build next level of a building whenever requirements are satisfied`, () => {
    const wall = new Wall();
    wall.treeBuilding([
        { name: 'castle', level: 1 },
        { name: 'windmill', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'warehouse', level: 1, required: { name: 'castle', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'windmill', level: 1 } },
        { name: 'castle', level: 2, required: { name: 'warehouse', level: 1 } },
    ]);
    wall.addToQueue({ name: 'castle', level: 1, yid: fakeId, position: 42 });
    wall.addToQueue({ name: 'warehouse', level: 1, yid: fakeId, position: 42 });
    wall.addToQueue({ name: 'windmill', level: 1, yid: fakeId, position: 42 });
    expect(wall.canBuild('castle', 2, fakeId)).toEqual(true);
})
