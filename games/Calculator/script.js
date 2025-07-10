let numbers = document.querySelectorAll(".number")
let operators = document.querySelectorAll(".operators")
let equal = document.querySelector("#trigger")
let posneg = document.querySelector("#posneg")
let cl = document.querySelector("#clear")
let decimal = document.querySelector("#decimal")
let input = document.querySelector("#target")

//operatios
const logic = {
    "+":function(x,y) {return x + y},
    "-":function(x,y) {return x - y},
    "*":function(x,y) {return x * y} ,
    "/":function(x,y) {return x/y},
    "^":function(x,y) {return Math.pow(x,y)},
    "%":function(x,y) {return x * (y/100)}
}

let operator = "";
let num1 = 0;
let num2 = 0;
let answered = false;
//decimal place
let num1P = 0;
let num2P = 0;
//isdecimal
let num1D = false;
let num2D = false;

//show on answer input
function display(val){
    input.style.color = "black";
    input.value = Number(val).toLocaleString("en-US");
}

//precision (stackoverflowed)
function precisionRound(number, precision) { 
    var factor = Math.pow(10, precision); 
    return Math.round(number * factor) / factor; 
}


// number buttons clicked
for(let i = 0; i < numbers.length; i++){
    numbers[i].onclick = function(){
        if(operator == ""){
            // if no operator is pressed, num1 is reset to 0
            if(answered){   
                num1 = 0;
                num1P = 0;
                answered = false;
            }
            // if decimal
            if(num1D){
                num1P++;
                num1 = precisionRound(num1 + (Number(numbers[i].textContent)/Math.pow(10,num1P)),num1P)
            }else{ //if whole
                num1 = (num1 * 10) + Number(numbers[i].textContent)
            }
            display(num1.toFixed(num1P))
        }else{
            if(num2D){
                display(num2 + Number(numbers[i].textContent))
                num2P++;
                num2 = precisionRound(num2 + (Number(numbers[i].textContent)/Math.pow(10,num2P)),num2P)
            }else{
                num2 = (num2 * 10) + Number(numbers[i].textContent)
            }
            display(num2.toFixed(num2P)) 
        }
    };
}

for(let i = 0; i < operators.length; i++){
    operators[i].onclick = function(){
        operator = String(operators[i].textContent)
        display(0);
    }
}

cl.onclick = function(){
    //clear all
    operator = "";
    num1 = 0;
    num2 = 0
    num1P = 0;
    num2P = 0;
    num1D = false;
    num2D = false;
    display(0);
}

// turn number to negative and vice versa
posneg.onclick = function(){
    if(operator == ""){
        num1 *=-1;
        display(num1.toFixed(num1P))
    }else{
        num2 *=-1;
        display(num2.toFixed(num2P))
    }
}
    
equal.onclick = function(){
    if(operator !== ""){
        input.style.color = "#0DDA00";
        let answer;
        // if no decimal no rounding is required
        if(num1P > 0 || num2P > 0){
            // to keep precision, round with the sum of num1 and num2 decimal place
            answer = precisionRound(logic[operator](num1, num2),num1P + num2P)
        }else{
            answer = logic[operator](num1, num2)
        }
        // hold answer for num1
        // clear operator and num2
        input.value = Number(answer).toLocaleString();
        num1 = answer;
        operator = "";
        num2 = 0;
        num2P = 0;
        num1D = false;
        num2D = false;
        answered = true;
    }
}

// switch to decimal mode
decimal.onclick = function(){
    if(operator == ""){
        if(answered){   
            num1 = 0;
            num1P = 0;
            answered = false;
        }
        if(!num1D){
            input.value = num1.toLocaleString() + ".";
        }
        num1D = true;
    }else{
        if(!num2D){
            input.value = num2.toLocaleString() + ".";
        }
        num2D = true;
    }
}