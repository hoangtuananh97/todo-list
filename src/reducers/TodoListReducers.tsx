import {ActionReducer} from "../types/ActionReducer";
import {CONSTANTS} from "../actions";
import {v4 as uuidv4} from 'uuid';

const initTodoList = [
    {
        "title": "ALL",
        "id": "list-1",
        "status": "all",
        "cards": []
    },
    {
        "title": "PENDING",
        "id": "list-2",
        "status": "pending",
        "cards": []
    },
    {
        "title": "COMPLETE",
        "id": "list-3",
        "status": "complete",
        "cards": []
    }

]

const TodoListReducers = (state = initTodoList, action: ActionReducer) => {
    // @ts-ignore
    const todoListsStorage = JSON.parse(localStorage.getItem('todoData'));
    if (todoListsStorage !== null){
        state = todoListsStorage
    }

    switch (action.type) {
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: uuidv4()
            }
            console.log([...state, newList])
            return [...state, newList]

        case CONSTANTS.ADD_CARD:
            const newCard = {
                text: action.payload.text,
                cardTitle: action.payload.cardTitle,
                status: action.payload.statusList,
                id: uuidv4()
            }
            const newStateAdd1 = state.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        cards: [...item.cards, newCard]
                    }
                }else {
                    return item
                }
            })
            console.log("add ", newStateAdd1)
            localStorage.setItem('todoData', JSON.stringify(newStateAdd1));

            return newStateAdd1

        case CONSTANTS.DELETE_CARD: {
            const { id, idList } = action.payload;
            const newState = JSON.parse(JSON.stringify(state));
            const list = newState.find(item => idList === item.id)
            const cards = list.cards
            list.cards = cards.filter(function(returnableObjects){
                return returnableObjects.id !== id
            });
            console.log("delete ", newState)
            localStorage.setItem('todoData', JSON.stringify(newState));
            return newState;
        }

        case CONSTANTS.EDIT_CARD: {
            const { id, idList, newText, cardTitle } = action.payload;
            const newState = JSON.parse(JSON.stringify(state));
            const list = newState.find(item => idList === item.id)
            const cards = list.cards
            const cardIndex = cards.findIndex(item => id === item.id)
            list.cards[cardIndex]["text"] = newText
            list.cards[cardIndex]["cardTitle"] = cardTitle
            console.log("edit ", newState)
            localStorage.setItem('todoData', JSON.stringify(newState));
            return newState
        }

        case CONSTANTS.DRAG_HAPPENED:
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
            } = action.payload;
            const newState = JSON.parse(JSON.stringify(state));

            if (droppableIdStart === droppableIdEnd) {
                const list = newState.find(item => droppableIdStart === item.id)
                const cards = list.cards.splice(droppableIndexStart, 1)
                list.cards.splice(droppableIndexEnd, 0, ...cards)
            }

            if (droppableIdStart !== droppableIdEnd) {
                const listStart = newState.find(item => droppableIdStart === item.id)
                const cards = listStart.cards.splice(droppableIndexStart, 1)
                const listEnd = newState.find(item => droppableIdEnd === item.id)
                listEnd.cards.splice(droppableIndexEnd, 0, ...cards)
            }
            console.log("drap-drop ", newState)
            localStorage.setItem('todoData', JSON.stringify(newState));
            return newState
        default:
            return state
    }
}

export default TodoListReducers