const Queue = require('./queue'),
    queue = new Queue();

test('queue starts empty', () => {
    expect(queue.isEmpty()).toBe(true);
})

test('queue receive a message with instructions', () => {
    const message = {
        building: 'castle',
    };
    queue.send(message);
    expect(queue.isEmpty()).toBe(true);
})
