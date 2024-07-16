import React from "react";
import {Draggable} from "react-beautiful-dnd"
import {deleteCard, editCard} from "../actions";
import {Icon} from "@material-ui/core";
import {connect} from "react-redux";
import {styled} from "styled-components";
import Typography from "@material-ui/core/Typography";
import TodoForm from "./TodoForm";
import TodoButton from "./TodoButton";


const CardContainer = styled.div`
  margin: 0 0 8px 0;
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
`;

const EditButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  top: 5px;
  opacity: 0.5;

  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const DeleteButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  bottom: 5px;
  opacity: 0.5;

  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }

  &:hover {
    opacity: 0.8;
  }
`;

class TodoCard extends React.Component<any, any> {

    state = {
        isFormOpen: false,
        text: "",
        cardTitle: "",
        isEditing: false
    }

    closeForm = () => {
        console.log(2222)
        this.setState({
            isFormOpen: false
        })
    }

    setIsEditing = (status) => {
        this.setState({
            isEditing: status
        })
    }

    handleInputChange = (event: { target: { value: any; }; }) => {
        this.setState({
            cardTitle: event.target.value
        })
    }

    handleTextAreaChange = (event: { target: { value: any; }; }) => {
        this.setState({
            text: event.target.value
        })
    }

    handleDeleteCard = () => {
        const {dispatch, idList, id} = this.props
        dispatch(deleteCard(id, idList));
    };

    saveCard = (event) => {
        const {dispatch, idList, id} = this.props
        const {text, cardTitle} = this.state
        if (text && cardTitle) {
            dispatch(editCard(id, idList, text, cardTitle));
            this.setIsEditing(false);
        } else {
            alert("Title or description is required.");
        }
        this.setIsEditing(false);
        console.log("this.state ", this.state)
        event.preventDefault();

    };

    renderEditForm = () => {
        return (
            <TodoForm
                text={this.state.text}
                cardTitle={this.state.cardTitle}
                onChangeTextArea={this.handleTextAreaChange}
                onChangeInput={this.handleInputChange}
                closeForm={this.closeForm}>
                <TodoButton onClick={this.saveCard}>Save</TodoButton>
            </TodoForm>
        );
    };

    renderForm() {
        const {id, text, index, cardTitle, statusList} = this.props
        return (
            <Draggable draggableId={String(id)} index={index} isDragDisabled={statusList === "all"}>

                {provided => (
                    <CardContainer
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {
                            (statusList === "all") ? <></> : <><EditButton
                                onMouseDown={() => this.setIsEditing(true)}
                                fontSize="small"
                            >
                                edit
                            </EditButton><DeleteButton fontSize="small" onMouseDown={this.handleDeleteCard}>
                                delete
                            </DeleteButton></>
                        }
                        <div style={{
                            backgroundColor: "aliceblue"
                        }}>
                            <Typography>Title:{cardTitle}</Typography>
                            <Typography>Description: {text}</Typography>
                        </div>
                    </CardContainer>
                )}
            </Draggable>
        )
    }

    render() {
        return this.state.isEditing ? this.renderEditForm() : this.renderForm();
    }
}


export default connect()(TodoCard)
