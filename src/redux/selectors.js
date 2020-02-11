
export const getMeasuresState = store => store.measures;

export const getMeasures = store =>
    getMeasuresState(store) ? getMeasuresState(store).measures : [];

export const getSpeciesState = store => store.species;

export const getSpecies = store =>
    getSpeciesState(store) ? getSpeciesState(store).species : [];
    
    