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

test('building time of a building is sum of its resources', () => {
    const data = [
        { building: 'castle', level: 0, res: [{ name: 'iron', amount: 10, }], expectedAmount: 10, },
        { building: 'castle', level: 1, res: [{ name: 'iron', amount: 10, }], expectedAmount: 13, },
        { building: 'castle', level: 2, res: [{ name: 'iron', amount: 10, }], expectedAmount: 17, },
        { building: 'castle', level: 3, res: [{ name: 'iron', amount: 10, }], expectedAmount: 22, },
    ];

    for (let i = 0; i < data.length; i++) {
        building.define(data[i].building, data[i].res)

        expect(building.time({level: data[i].level}))
            .toBe(data[i].expectedAmount);
    }
})
