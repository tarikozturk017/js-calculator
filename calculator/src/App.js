/* eslint-disable default-case */
import React, { useReducer } from "react"
import DigitButton from "./components/DigitButton"
import OperationButton from "./components/OperationButton"
import "./style.css"

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") 
        return state //don't make any changes
      if (payload.digit === "." && state.currentOperand.includes(".")) 
        return state //don't make any changes
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) { // if we have no state
        return state
      }

      if (state.currentOperand == null) { // to overwrite operation if it was clicked
        return {
          ...state,
          lastOperation: state.operation,
          operation: payload.operation
        }
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }
    case ACTIONS.CLEAR:
      return {
        ...state,
        currentOperand: "0",
      }
      // return {}
    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite) return {
        ...state,
        overwrite: false,
        currentOperand: null
      }
      if (state.currentOperand === null) return state
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
    case ACTIONS.EVALUATE:
      if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        lastOperation: null,
        currentOperand: evaluate(state)
      }
  }
}

function evaluate(state) {
  const operation = state.lastOperation !== null && state.operation === '-' ? state.lastOperation : state.operation
  const current = state.lastOperation !== null && state.operation === '-' ? (-1 * parseFloat(state.currentOperand)) : parseFloat(state.currentOperand)

  const prev = parseFloat(state.previousOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "/":
      computation = prev / current
      break
  }

  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {lastOperation: null})

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{formatOperand(previousOperand)}{operation}</div>
        <div className="current-operand" id="display">{formatOperand(currentOperand)}</div>
      </div>
      <button 
        id={'clear'} className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR})}
      >
        AC
      </button>
      <DigitButton id={"zero"} digit="0" dispatch={dispatch}/>
      <OperationButton id={'divide'} operation="/" dispatch={dispatch}/>
      <DigitButton id={"one"} digit="1" dispatch={dispatch}/>
      <DigitButton id={"two"} digit="2" dispatch={dispatch}/>
      <DigitButton id={"three"} digit="3" dispatch={dispatch}/>
      <OperationButton id={'multiply'} operation="*" dispatch={dispatch}/>
      <DigitButton id={"four"} digit="4" dispatch={dispatch}/>
      <DigitButton id={"five"} digit="5" dispatch={dispatch}/>
      <DigitButton id={"six"} digit="6" dispatch={dispatch}/>
      <OperationButton id={'add'} operation="+" dispatch={dispatch}/>
      <DigitButton id={"seven"} digit="7" dispatch={dispatch}/>
      <DigitButton id={"eight"} digit="8" dispatch={dispatch}/>
      <DigitButton id={"nine"} digit="9" dispatch={dispatch}/>
      <OperationButton id={'subtract'} operation="-" dispatch={dispatch}/>
      <DigitButton id={"decimal"} digit="." dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <button 
        id={'equals'} className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE})}
      >
        =
        </button>
    </div>
  );
}

export default App;