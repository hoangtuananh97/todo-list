import React from "react";
import TodoList from "./TodoList";
import {connect} from "react-redux";
import {TodoListMap, TodoListState} from "../types/TodoList";
import AddButton from "./AddButton";
import {DragDropContext} from "react-beautiful-dnd";
import {sort} from "../actions";

let useStyles = {
    TodoListContainer: {
        display: "flex",
        flexDirection: "row"
    }
};

class App extends React.Component<any, any> {
    onDragEnd = (result) => {
        const {destination, source, draggableId} = result

        if (!destination) {
            return;
        }
        this.props.dispatch(
            sort(
                source.droppableId,
                destination.droppableId,
                source.index,
                destination.index,
                draggableId
            )
        )
    };

    getAllCards = () => {
        const {todoLists} = this.props
        const newTodoLists = JSON.parse(JSON.stringify(todoLists));
        let allCards = []
        // eslint-disable-next-line array-callback-return
        newTodoLists.map((item) => {
            if (item.status !== "all") {
                allCards = allCards.concat(item.cards)
            }
        })
        const cardIndexAll = newTodoLists.findIndex(item => item.status === "all")
        newTodoLists[cardIndexAll]["cards"] = allCards
        return newTodoLists
    }

    render() {
        const newTodoLists = this.getAllCards()
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="App">
                    TODO LIST APP
                    <div style={useStyles.TodoListContainer as React.CSSProperties}>
                        {
                            newTodoLists.map((item: TodoListMap) => (
                                <TodoList
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    cards={item.cards}
                                    status={item.status}
                                />
                            ))
                        }
                        <AddButton isList/>
                    </div>
                </div>
            </DragDropContext>
        );
    }
}

const mapStatesToProps = (state: TodoListState) => ({
    todoLists: state.todoLists
});

export default connect(mapStatesToProps)(App);
