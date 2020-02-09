const measures = (state = [], action) => {
    switch (action.type) {
      case 'ADD_MEASURE':
        return state.concat(action.measure);
        // return [
        //   ...state,
        //   {
        //     measure: action.measure
        //   }
        // ]
      default:
        return state
    }
  }

  export default measures;