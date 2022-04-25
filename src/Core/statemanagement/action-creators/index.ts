import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import Action from "../actions";

export const addImage = (payload: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ADD_IMAGE,
            payload: payload
        })
    }
}

export const deleteImage = (payload: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.DELETE_IMAGE,
            payload: payload
        })
    }
}