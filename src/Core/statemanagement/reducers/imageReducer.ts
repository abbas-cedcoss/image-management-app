import { ActionType } from '../action-types';
import Action from '../actions/index';

const initialState: any = [];

const imagereducer = (state: any = initialState, action: Action) => {
    // console.log(state, action)
    switch (action.type) {
        case ActionType.ADD_IMAGE:
            return state = action.payload
        case ActionType.DELETE_IMAGE:
            return state;
        default:
            return state;
    }
};

export default imagereducer;