import {CONSTANTS} from "./index";

export const addCard = (idList: string, cardTitle: string, text: any, statusList: string) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {text: text, cardTitle: cardTitle, id: idList, statusList: statusList}
    }
}

export const deleteCard = (idCard: string, idList: string) => {
    return {
        type: CONSTANTS.DELETE_CARD,
        payload: {id: idCard, idList: idList}
    }
}

export const editCard = (idCard: string, idList: string, newText: string, cardTitle: string) => {
    return {
        type: CONSTANTS.EDIT_CARD,
        payload: {id: idCard, idList: idList, newText, cardTitle}
    }
}