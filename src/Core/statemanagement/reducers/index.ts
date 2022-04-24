import { combineReducers } from "redux";
import imagereducer from './imageReducer';

const reducers = combineReducers({
    imagereducer
});

export default reducers;
export type State = ReturnType<typeof reducers>