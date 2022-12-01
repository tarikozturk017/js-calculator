import React from "react"

const OperationButton = (props) => {
    return (
        <button id={props.id} onClick={() => props.handleClick(props.sign, props.id)}>
            {props.sign}
        </button>
    )
}

export default OperationButton