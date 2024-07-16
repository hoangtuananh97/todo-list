import React from "react"
import {Icon, TextareaAutosize} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button"
import {connect} from "react-redux";
import {addList, addCard} from "../actions";

class AddButton extends React.Component<any, any> {

    state = {
        isFormOpen: false,
        text: "",
        cardTitle: "",
        idCard: "",
        setIsEditing: false
    }

    openForm = () => {
        this.setState({
            isFormOpen: true
        })
    }
    closeForm = () => {
        this.setState({
            isFormOpen: false
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
    handleAddList = (event) => {
        const {dispatch} = this.props
        const {text} = this.state
        if (text) {
            this.setState({
                text: "",
                cardTitle: "",
            })
            dispatch(addList(text));
        } else {
            alert("Title is required.");
            event.preventDefault();
        }
        return;
    }

    handleAddCard = (event) => {
        const {dispatch, idList, statusList} = this.props
        const {text, cardTitle} = this.state
        if (text && cardTitle) {
            this.setState({
                text: "",
                cardTitle: "",
            })
            dispatch(addCard(idList, text, cardTitle, statusList));
        } else {
            alert("Title or description is required.");
            event.preventDefault();
        }
        return;
    }

    renderAddButton = (statusList) => {
        const {isList} = this.props;
        const buttonText = isList ? "Add another list" : "Add another card"
        const buttonTextOpacity = isList ? 1 : 0.5
        const buttonTextColor = isList ? "while" : "inherit"
        const buttonTextBackground = isList ? "rgba(0,0,0,.15)" : "inherit"
        return (
            <div>
                {(statusList === "all") ? <></> :
                    <div
                    onClick={this.openForm}
                    style={{
                    ...styles.openForButtonGroup,
                    opacity: buttonTextOpacity,
                    color: buttonTextColor,
                    backgroundColor: buttonTextBackground
                }}>
                    <Icon>add</Icon>
                    <p>{buttonText}</p>
                    </div>
                }
            </div>
        )
    }

    renderForm() {
        const {isList, statusList} = this.props

        const buttonTitle = isList ? "Add List " : "Add card";
        const placeHolder = isList ? "Enter title list..." : "Add description card...";

        return (
            <div>
                <Card style={{
                    minHeight: 85,
                    minWidth: 272,
                    padding: "6px 8px 2px"
                }}>
                    {
                        isList ? <></> : <input
                            type="text"
                            placeholder="Add title card...."
                            value={this.state.cardTitle}
                            onChange={this.handleInputChange}/>
                    }
                    <TextareaAutosize
                        placeholder={placeHolder}
                        autoFocus
                        value={this.state.text}
                        onChange={this.handleTextAreaChange}
                        style={{
                            resize: "none",
                            width: "100%",
                            overflow: "hidden",
                            outline: "none",
                            border: "none"
                        }}
                    ></TextareaAutosize>
                </Card>
                {
                    (statusList === "all") ? <></> : <div style={styles.formButtonGroup}>
                        <Button
                            onMouseDown={isList ? this.handleAddList : this.handleAddCard}
                            style={{
                                color: "while",
                                backgroundColor: "#5aac44"
                            }}
                            variant="contained"
                        >
                            {buttonTitle}
                        </Button>
                        <div onClick={this.closeForm}><Icon style={{marginLeft: 8, cursor: "pointer"}}>close</Icon>
                        </div>
                    </div>
                }
            </div>
        )
    }

    render() {
        const {statusList} = this.props
        return this.state.isFormOpen ? this.renderForm() : this.renderAddButton(statusList)
    }
}

const styles = {
    openForButtonGroup: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 3,
        height: 36,
        width: 272,
        paddingLeft: 10
    },
    formButtonGroup: {
        marginTop: 8,
        display: "flex",
        alignItems: "center"
    }
}
export default connect()(AddButton)