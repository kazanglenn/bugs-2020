import { createStore } from "redux";
import rootReducer from "./reducers";

export default createStore(
    rootReducer,
    // this allows use of chrome redux devtool, if available
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);