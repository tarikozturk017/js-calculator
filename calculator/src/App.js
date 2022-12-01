
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";

function App() {

  const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

  const nums = numbers.map((number, i) => {
    return (
      <DigitButton key={i} id={number} button={i} handleClick={handleClick} />
    )
  })

  function handleClick(number, id) {
    console.log(`${number} ${id} `)
  }

  return (
    <div className="App">
      {nums}
      <OperationButton sign={"="} id={"equals"} handleClick={handleClick}/>
      <OperationButton sign={"+"} id={"add"} handleClick={handleClick}/>
      <OperationButton sign={"-"} id={"subtract"} handleClick={handleClick}/>
      <OperationButton sign={"*"} id={"multiply"} handleClick={handleClick}/>
      <OperationButton sign={"/"} id={"divide"} handleClick={handleClick}/>
    </div>
  );
}

export default App;
