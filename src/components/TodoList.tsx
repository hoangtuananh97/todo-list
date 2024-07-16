import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {TodoListMap} from "../types/TodoList";
import TodoCard from "./TodoCard";
import AddButton from "./AddButton";
import {Droppable} from "react-beautiful-dnd"

const TodoList = ({title, id, status, cards}: TodoListMap) => {
    const classes = useStyles();

    return (
        <Droppable droppableId={String(id)} isDropDisabled={status === "all"}>
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={classes.container}
                >
                    <h3 className={classes.title}>{title}</h3>
                    {
                        cards.map((card, index) => (
                            <TodoCard
                                key={card.id}
                                id={card.id}
                                text={card.text}
                                cardTitle={card.cardTitle}
                                statusCard={card.status}
                                statusList={status}
                                idList={id}
                                index={index}/>
                        ))
                    }
                    <AddButton idList={id} statusList={status}/>
                    {provided.placeholder}
                </div>
            )}

        </Droppable>

    )
}
const useStyles = makeStyles({
    container: {
        backgroundColor: "#dfe3ed",
        borderRadius: 3,
        width: 345,
        padding: 4,
        marginRight: 10,
        paddingBottom: 10,
        height: "100%"
    },
    title: {
        marginTop: 0,
        marginBottom: 10
    }
});


export default TodoList