
export const getMeasuresState = store => store.measures;

export const getMeasures = store =>
    getMeasuresState(store) ? getMeasuresState(store).measures : [];

