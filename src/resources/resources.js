class Resource
{

    constructor() {
        this.res = [];
    }

    config(resources) {
        this.res = resources;
    }

    add(resource) {
        this.res.push(resource);
    }

    all() {
        return this.res;
    }

}

module.exports = Resource
