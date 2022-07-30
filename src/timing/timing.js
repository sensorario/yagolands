function risorse (action, tree) {
    let myBuilding = action.replace('build_', '');
    let allBuildings = tree.buildings;
    for(let i = 0; i < allBuildings.length; i++) {
        let currentBuilding = allBuildings[i];
        if (currentBuilding.name == myBuilding) {
            return currentBuilding.building.res;
        }
    }

    return 0;
}

function funzione(action, level, tree) {
    let iSecondi = risorse(action, tree);
    let somma = 0;
    for(let s in iSecondi) {
        somma += risorsa(iSecondi[s].amount, level);
    }
    return somma;
}

function risorsa(start, level, somma = 0) {
    return level === 1
        ? start
        : parseInt(risorsa(start, level - 1, somma) * 1.3);
}

module.exports = {
    getTimeToBuild: funzione,
    risorsa,
};
