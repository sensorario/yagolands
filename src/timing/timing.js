function funzione(action, level, tree) {

    // @todo extract from the tree
    let mappa = [];
    mappa['build_castle'] = 0;
    mappa['build_windmill'] = 1;
    mappa['build_warehouse'] = 2;
    mappa['build_barracks'] = 3;

    let secs = 0;

    if (typeof mappa[action] !== 'undefined') {
        let index = mappa[action];
        for(let i = 0; i < tree.buildings[index].building.res.length; i++) {
            // @todo moltiplicare per 1.3 volte ad ogni livello
            secs += (level * tree.buildings[index].building.res[i].amount);
        }
    }

    return secs;
}

module.exports.getTimeToBuild = funzione;
