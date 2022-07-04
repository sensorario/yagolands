const Unit = require('./unit')
const unit = new Unit();

test('unit building time require unit level', () => {
    unit.define('soldier', [{
        name: 'iron',
        amount: 32,
    }, {
        name: 'wood',
        amount: 43,
    }])

    expect(function() { unit.time() }).toThrow('missing level');
})

test('provide resources', () => {
    unit.define('soldier', [{
        name: 'iron',
        amount: 32,
    }, {
        name: 'wood',
        amount: 43,
    }])

    expect(unit.get())
        .toEqual([{ name: 'iron', amount: 32, }, { name: 'wood', amount: 43, }]);
})

test('unit building time of a unit is sum of its resources', () => {
    const data = [
        { unit: 'soldier', level: 0, res: [{ name: 'iron', amount: 10, }], expectedAmount: 10, },
        { unit: 'soldier', level: 1, res: [{ name: 'iron', amount: 10, }], expectedAmount: 13, },
        { unit: 'soldier', level: 2, res: [{ name: 'iron', amount: 10, }], expectedAmount: 17, },
        { unit: 'soldier', level: 3, res: [{ name: 'iron', amount: 10, }], expectedAmount: 22, },
        { unit: 'soldier', level: 4, res: [{ name: 'iron', amount: 10, }], expectedAmount: 29, },
        { unit: 'soldier', level: 5, res: [{ name: 'iron', amount: 10, }], expectedAmount: 37, },
        { unit: 'soldier', level: 20, res: [{ name: 'iron', amount: 10, }], expectedAmount: 1900, },
        { unit: 'soldier', level: 20, res: [{ name: 'iron', amount: 44, }], expectedAmount: 8362, },
    ];

    for (let i = 0; i < data.length; i++) {
        unit.define(data[i].unit, data[i].res)

        expect(unit.time({level: data[i].level}))
            .toBe(data[i].expectedAmount);
    }
})
