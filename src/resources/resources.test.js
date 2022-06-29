const Resource = require('./resources');
const resources = new Resource;

test('can be configurable by design resource by resource', () => {
    resources.add('clay');
    resources.add('iron');
    expect(resources.all()).toEqual(['clay', 'iron']);
})

test('can be configurable by design in one shot', () => {
    resources.config(['clay', 'iron']);
    expect(resources.all()).toEqual(['clay', 'iron']);
})

test('single item can be added lazily', () => {
    resources.config(['clay', 'iron']);
    resources.add('wood');
    expect(resources.all()).toEqual(['clay', 'iron', 'wood']);
})
