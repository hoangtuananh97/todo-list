import {CONSTANTS} from "./index";

export const addList = (title: string) => {
    return {
        type: CONSTANTS.ADD_LIST,
        payload: title
    }
}

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    droppableId,
) => {
    return {
        type: CONSTANTS.DRAG_HAPPENED,
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            droppableId,
        }
    }
}