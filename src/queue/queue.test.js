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
        type: 'building_instructions',
    };
    queue.send(message);
    expect(queue.isEmpty()).toEqual(false);
})
