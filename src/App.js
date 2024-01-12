import {Container, Content, Row} from './styles';
import Button from './components/Button';
import Input from './components/Input';
import { useState } from 'react';
import History from './components/History';

const App = () =>{
// TODO: Add state variable to make multiple calculations.

  // Initialize state variables.
  const [currentNumber, setCurrentNumber] = useState('');
  const [firstNumber, setFirstNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  
  // Load history from local storage.
  const loadHistory = () => {
    const savedHistory = localStorage.getItem('calcHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  };

  // Clear history from local storage.
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('calcHistory');
  };

  // Initialize history state.
  const [history, setHistory] = useState(loadHistory);

  // Clear the current number, first number, and operation.
  const handleClear = () => {
    setCurrentNumber('');
    setFirstNumber(null);
    setOperation(null);
  }
  
  // Add a number to the current number.
  const handleAddNumber = (num) => {
    setCurrentNumber(currentNumber + num);
  };
  
  // 
  const handleOperation = (op) => {
    setFirstNumber(currentNumber);
    setOperation(op);
    setCurrentNumber("");
  };
  
  // Calculate the result of the operation. 
  const handleEquals = () => {
    if (!firstNumber || !operation) return;
  
    let result;
    switch (operation) {
      case '+':
        result = Number(firstNumber) + Number(currentNumber);
        break;
      case '-':
        result = Number(firstNumber) - Number(currentNumber);
        break;
      case '/':
        result = Number(firstNumber) / Number(currentNumber);
        break;
      case '*':
        result = Number(firstNumber) * Number(currentNumber);
        break;
      default:
        return;
    }
    
    // Set the result as the current number, and clear the operation and first number.
    setCurrentNumber(String(result));
    const newHistory = [...history, `${firstNumber} ${operation} ${currentNumber} = ${result}`];
    // Set the history state variable and save to local storage.
  setHistory(newHistory);
  localStorage.setItem('calcHistory', JSON.stringify(newHistory));
    setFirstNumber(null);
    setOperation(null);
  };

  return (
    <Container>
  <Content>
    <Input value={currentNumber}/>
    <Row>
      <Button label="7" onClick={() => handleAddNumber('7')}/>
      <Button label="8" onClick={() => handleAddNumber('8')}/>
      <Button label="9" onClick={() => handleAddNumber('9')}/>
      <Button label="/" onClick={() => handleOperation('/')}/>
    </Row>
    <Row>
      <Button label="4" onClick={() => handleAddNumber('4')}/>
      <Button label="5" onClick={() => handleAddNumber('5')}/>
      <Button label="6" onClick={() => handleAddNumber('6')}/>
      <Button label="*" onClick={() => handleOperation('*')}/>
    </Row>
    <Row>
      <Button label="1" onClick={() => handleAddNumber('1')}/>
      <Button label="2" onClick={() => handleAddNumber('2')}/>
      <Button label="3" onClick={() => handleAddNumber('3')}/>
      <Button label="-" onClick={() => handleOperation('-')}/>
    </Row>
    <Row>
      <Button label="0" onClick={() => handleAddNumber('0')}/>
      <Button label="C" onClick={handleClear} />
      <Button label="=" onClick={handleEquals}/>
      <Button label="+" onClick={() => handleOperation('+')}/>
    </Row>
  </Content>
  <Content>
    <History history={history} clearHistory={clearHistory}/>
  </Content>
</Container>
  );
}

export default App;
