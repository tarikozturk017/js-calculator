import React from "react"

const DigitButton = (props) => {
    


    return (
        <button id={props.id} onClick={() => props.handleClick(props.button, props.id)}>
            {props.button}
        </button>
    )
}

export default DigitButton