import {TodoCardType} from "./TodoCard";

export interface TodoListParams {
    title: string;
}

export interface TodoListState {
    todoLists: any
}

export interface TodoListMap {
    title: string;
    status: string;
    id: string,
    cards: TodoCardType[]
}