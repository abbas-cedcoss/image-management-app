import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import Action from "../actions";

export const addImage = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ADD_IMAGE
        })
    }
}

export const deleteImage = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ADD_IMAGE
        })
    }
}