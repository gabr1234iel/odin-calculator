const calculator = document.querySelector(".calculator");
const display = document.querySelector(".calculator-display");
const keys = document.querySelector(".calculator-keys")

keys.addEventListener('click', e => {
    if(e.target.matches('button')){
        const key = e.target;
        const action = key.dataset.action;
        const previousKeyType = calculator.dataset.previousKeyType;
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = calculator.dataset.secondValue;

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));


        if(!action){
            if (display.textContent === '0' || 
            previousKeyType === 'operator' ||
            previousKeyType === 'equal'
            ) {
                display.textContent = key.textContent;
                calculator.dataset.previousKeyType = 'number';
            } else {
                display.textContent = display.textContent + key.textContent;
                calculator.dataset.previousKeyType = 'number';
            }
            
        }

        if(action == 'decimal'){
            if(!display.textContent.includes('.')){
                display.textContent = display.textContent + '.';
            }
            calculator.dataset.previousKeyType = 'decimal';
        }

        if(action === 'add' || action === 'minus' || action === 'multiply' || action === 'divide'){
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = display.textContent;

            if(firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'equal'){

                const calcValue = calculate(firstValue,operator,secondValue);
                display.textContent = calcValue;

                calculator.dataset.firstValue = calcValue;
            } else {
                calculator.dataset.firstValue = display.textContent;
            }

            key.classList.add('is-depressed');

            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.operator=action;

        }

        if(action === 'calculate'){         //calculate

            if(previousKeyType !== 'equal'){
                calculator.dataset.secondValue = display.textContent;
                if(firstValue && operator){
                    let ans = calculate(firstValue,operator,calculator.dataset.secondValue);
                    display.textContent = ans;
                }
            }
            if(previousKeyType === 'equal'){
                if(operator){
                    let ans = calculate(display.textContent,operator,secondValue);
                    display.textContent = ans;
                }
            }
            document.querySelectorAll(".key-operator").forEach(k => k.classList.remove('is-depressed'));
            calculator.dataset.previousKeyType = 'equal';
        }

        if(action === 'delete'){

            if(display.textContent.length > 1){
                display.textContent = display.textContent.slice(0,-1);
            }
            else if(display.textContent.length == 1){
                display.textContent = "0";
            }

            calculator.dataset.previousKeyType = 'delete';
        }
        
        if(action !== 'clear-all'){
            const clearButton = calculator.querySelector('[data-action=clear-all]');
            clearButton.textContent = 'CE';
        }
    
        if(action === 'clear-all'){
            if(key.textContent === 'AC'){
                calculator.dataset.firstValue = '';
                calculator.dataset.modValue = '';
                calculator.dataset.operator = '';
                calculator.dataset.previousKeyType = ''
            } else{
                key.textContent = 'AC'
            }
            
            display.textContent = 0;
            calculator.dataset.previousKeyType = 'clear-all';
            Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
        }

    }
    
});


const calculate = function(n1, operator , n2){
    let ans;
    if (operator === 'add'){
        ans = parseFloat(n1) + parseFloat(n2);
        console.log(n1 + "+" + n2 + "=" + ans);
    } else if (operator === 'minus'){
        ans = parseFloat(n1) - parseFloat(n2);
        console.log(n1 + "-" + n2 + "=" + ans);
    } else if (operator === 'multiply'){
        ans = parseFloat(n1) * parseFloat(n2);
        console.log(n1 + "x" + n2 + "=" + ans);
    } else if (operator === 'divide'){
        ans = parseFloat(n1) / parseFloat(n2);
        console.log(n1 + "÷" + n2 + "=" + ans);
    }
    if(ans > 9999999999){
        ans = "too large";
    }
    let stringAns = String(ans);
    console.log(stringAns.length);
    if(stringAns.length >10){
        stringAns = stringAns.substring(0,10);
    }
    
    return stringAns;
}