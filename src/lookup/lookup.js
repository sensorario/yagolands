let _map = null;

let add = (map) => {
    _map = map;
};

let lookup = (prev, current) => {
};

let search = (key) => {
    let i = null
    for (i in _map) {
        if (_map[i].from === key) {
            let dest = _map[i].to
            console.log(dest);
            if (dest == null) {
                return key
            }
            return lookup(_map[i].to)
        }
    }
};

module.exports = {
    add: add,
    search: search,
};
