const Building = require('./building')
const building = new Building();

test('building time require building level', () => {
    building.define('castle', [{
        name: 'iron',
        amount: 32,
    }, {
        name: 'wood',
        amount: 43,
    }])

    expect(function() { building.time() }).toThrow('missing level');
})

test('provide resources', () => {
    building.define('castle', [{
        name: 'iron',
        amount: 32,
    }, {
        name: 'wood',
        amount: 43,
    }])

    expect(building.get())
        .toEqual([{ name: 'iron', amount: 32, }, { name: 'wood', amount: 43, }]);
})

test('building time of a building is sum of its resources', () => {
    const data = [
        { building: 'castle', level: 0, res: [{ name: 'iron', amount: 10, }], expectedAmount: 10, },
        { building: 'castle', level: 1, res: [{ name: 'iron', amount: 10, }], expectedAmount: 13, },
        { building: 'castle', level: 2, res: [{ name: 'iron', amount: 10, }], expectedAmount: 17, },
        { building: 'castle', level: 3, res: [{ name: 'iron', amount: 10, }], expectedAmount: 22, },
        { building: 'castle', level: 4, res: [{ name: 'iron', amount: 10, }], expectedAmount: 29, },
        { building: 'castle', level: 5, res: [{ name: 'iron', amount: 10, }], expectedAmount: 37, },
        { building: 'castle', level: 20, res: [{ name: 'iron', amount: 10, }], expectedAmount: 1900, },
        { building: 'castle', level: 20, res: [{ name: 'iron', amount: 44, }], expectedAmount: 8362, },
    ];

    for (let i = 0; i < data.length; i++) {
        building.define(data[i].building, data[i].res)

        expect(building.time({level: data[i].level}))
            .toBe(data[i].expectedAmount);
    }
})
