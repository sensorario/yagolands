const lookup = require('./lookup');

test('receive map with one deep level', () => {
    lookup.add([{ from: 'from', to: 'to' }]);
    expect(lookup.search('from')).toEqual('to');
})

test('receive map with more deep level', () => {
    lookup.add([
        { from: 'two', to: 'three' },
        { from: 'one', to: 'two' },
    ]);
    expect(lookup.search('one')).toEqual('three');
})
