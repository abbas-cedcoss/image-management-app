import { ActionType } from '../action-types';
import Action from '../actions/index';

const initialState: any = [];

const imagereducer = (state: any = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.ADD_IMAGE:
            return state + action.payload;
        case ActionType.DELETE_IMAGE:
            return;
        default:
            return state;
    }
};

export default imagereducer;