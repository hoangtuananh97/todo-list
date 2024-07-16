import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const StyledButton = styled(Button)`
  && {
    color: white;
    background: #5aac44;
  }
`;

class TodoButton extends React.Component<any, any> {
    render() {
        const {children, onClick} = this.props
        return (
            <StyledButton variant="contained" onMouseDown={onClick}>
                {children}
            </StyledButton>
        );
    }
}

export default TodoButton;
