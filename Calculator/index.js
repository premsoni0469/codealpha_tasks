document.addEventListener('DOMContentLoaded', function () {
    const result = document.querySelector('.result span');
    const buttons = document.querySelectorAll('.item');
    let currentOperand = '0';
    let previousOperand = '';
    let operation = null;
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        if (button.classList.contains('numbers') || button.classList.contains('dot')) {
          appendNumber(button.innerText);
        } else if (button.classList.contains('sign')) {
          chooseOperation(button.innerText);
        } else if (button.classList.contains('equals')) {
          calculate();
        } else if (button.classList.contains('clear')) {
          clear();
        } else if (button.classList.contains('negative')) {
          toggleSign();
        } else if (button.classList.contains('percent')) {
          percentage();
        }
        updateDisplay();
      });
    });
  
    function appendNumber(number) {
      if (number === '.' && currentOperand.includes('.')) return;
      if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
      } else {
        currentOperand = currentOperand.toString() + number.toString();
      }
    }
  
    function chooseOperation(op) {
      if (currentOperand === '') return;
      if (previousOperand !== '') {
        calculate();
      }
      operation = op;
      previousOperand = currentOperand;
      currentOperand = '';
    }
  
    function calculate() {
      let computation;
      const prev = parseFloat(previousOperand);
      const current = parseFloat(currentOperand);
      
      // Handle division by zero
      if (operation === '÷' && current === 0) {
        currentOperand = 'Error';
        operation = undefined;
        previousOperand = '';
        return;
      }
  
      if (isNaN(prev) || isNaN(current)) return;
      
      switch (operation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '×':
          computation = prev * current;
          break;
        case '÷':
          computation = prev / current;
          break;
        default:
          return;
      }
      
      currentOperand = computation.toString();
      operation = undefined;
      previousOperand = '';
    }
  
    function clear() {
      currentOperand = '0';
      previousOperand = '';
      operation = undefined;
    }
  
    function toggleSign() {
      if (currentOperand === '') return;
      currentOperand = (parseFloat(currentOperand) * -1).toString();
    }
  
    function percentage() {
      if (currentOperand === '') return;
      currentOperand = (parseFloat(currentOperand) / 100).toString();
    }
  
    function updateDisplay() {
      result.innerText = currentOperand;
      if (operation != null && currentOperand !== 'Error') {
        result.innerText = `${previousOperand} ${operation} ${currentOperand}`;
      }
    }
  });
  