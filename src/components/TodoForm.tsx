import React from "react";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import Textarea from "react-textarea-autosize";
import Card from "@material-ui/core/Card";

const Container = styled.div`
  width: 284px;
  margin-bottom: 8px;
`;

const StyledCard = styled(Card)`
  min-height: 85px;
  padding: 6px 8px 2px;
`;

const StyledTextArea = styled(Textarea)`
  resize: none;
  width: 100%;
  overflow: hidden;
  outline: none;
  border: none;
`;

const ButtonContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

const StyledIcon = styled(Icon)`
  margin-left: 8px;
  cursor: pointer;
`;

class TodoForm extends React.Component<any, any> {

    handleFocus = e => {
        e.target.select();
    };

    render() {
        const {isList=false, text = "", cardTitle="", onChangeTextArea, onChangeInput, closeForm, children} = this.props

        return (
            <Container>
                <StyledCard>
                    {
                        isList ? <></> : <input
                        type="text"
                        placeholder="Add title card...."
                        value={cardTitle}
                        onChange={e => onChangeInput(e)} />
                    }
                    <StyledTextArea
                        placeholder="Enter a title for this card..."
                        autoFocus
                        onFocus={this.handleFocus}
                        value={text}
                        onChange={e => onChangeTextArea(e)}
                        onBlur={closeForm}
                    />
                </StyledCard>
                <ButtonContainer>
                    {children}
                    <div onClick={closeForm}><StyledIcon>close</StyledIcon></div>
                </ButtonContainer>
            </Container>
        );
    }
}

export default TodoForm;
