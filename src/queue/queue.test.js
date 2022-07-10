const Queue = require('./queue'),
    queue = new Queue();

test('queue starts empty', () => {
    expect(queue.isEmpty()).toBe(true);
})

test('queue message must contains type of message', () => {
    const wrongMessage = {};
    expect(() => queue.send(wrongMessage)).toThrow('message type is missing');
})

test('queue receive a message with instructions', () => {
    const message = {
        type: 'wrong_type',
    };
    expect(() => queue.send(message)).toThrow('message type is invalid');
})

test('queue receive a message with instructions', () => {
    const message = {
        type: 'building_instructions',
    };
    queue.send(message);
    expect(queue.isEmpty()).toEqual(false);
})

test.only('sort items per scheduling time', () => {
    var present = new Date();
    var future = new Date();
    future.setMonth(future.getMonth() + 3);

    queue.send({
        type: 'building_instructions',
        scheduling: future,
        message: 'future',
    });
    queue.send({
        type: 'building_instructions',
        scheduling: present,
        message: 'present',
    });
    expect(queue.list()).toEqual([{
        type: 'building_instructions',
        message: 'present',
    }, {
        type: 'building_instructions',
        message: 'future',
    }]);
})
