let runningTotal = 0;
let buffer = "0";
let previousoperator;

const screen = document.querySelector('.screen');

function buttonclick(value){
    if(isNaN(value)){
        hanbleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function hanbleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousoperator === null){
                return
            }
            flushOperation(parseInt(buffer));
            previousoperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length ===1){
                buffer = '0';
            }else{
                // Usa-se a função substring para tirar o ultimo caracter
                buffer = buffer.substring(0, buffer.length-1);
            }
            break;
        case '+':
            case '×':
        case '÷':
            handleMath(symbol);
            break;
        //  usar o Unicode aqui no JS para identificar o simbolo
        case '\u2212': handleMath('-'); break;
        
    }
}

function handleMath(symbol){
    if (buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runningTotal === 0 ){
        runningTotal = intBuffer;   
    }else{
        flushOperation(intBuffer);
    }
    previousoperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer){
    if(previousoperator === '+'){
        runningTotal += intBuffer;
    }else if(previousoperator === '-'){
        runningTotal -= intBuffer;
    }else if(previousoperator === '×'){
        runningTotal *= intBuffer;
    }else if(previousoperator === '÷'){
        runningTotal /= intBuffer;  
    }
}

function handleNumber(numberString){
    if(buffer === "0"){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.botões-calculadora').
    addEventListener('click', function(event){
        buttonclick(event.target.innerText);
    })
}

init();