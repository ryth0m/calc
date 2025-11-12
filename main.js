const dcalc = document.querySelector('.D-Calculator');
const ncalc = document.querySelector('.N-Calculator');
const switchcalcbtn = document.querySelector('#switch');
const clear2display = document.querySelector('#Clear');
const display = document.querySelector('#display');
const disply1 = document.querySelector('#disply1');
const disply2 = document.querySelector('#disply2');
let dcalctrue =false

function switchcalc(){
    
    if (dcalctrue) {
        ncalc.style.display = 'flex';
        dcalc.style.display = 'none';
        clear2display.style.display = 'none';
        dcalctrue = false
        switchcalcbtn.innerText = 'Switch to Digital calculator'

    } else {
        ncalc.style.display = 'none';
        dcalc.style.display = 'flex';
        clear2display.style.display = 'flex';
        dcalctrue = true
        switchcalcbtn.innerText = 'Switch to Classic calculator'
    }
}

let exp = '';
let deci = false;

function updatekey(o) {

  if (exp.length === 0 && '+/0%*'.includes(o)) {
    return; 
  }


  if (o === '.') {

    const lastNumber = exp.split(/[-+*/%✓√]/).pop();
    if (lastNumber.includes('.')) {
      return; 
    }
  }


  if (exp.length > 0 && '+-*/%✓√.'.includes(exp.slice(-1)) && '+-*/%✓√.'.includes(o)) {
    exp = exp.slice(0, -1) + o;
  } else {
    exp += o;
  }


  if ('+-*/%✓√'.includes(o)) {
    deci = false;
  }

  display.value = exp;
  display.scrollLeft= display.scrollWidth;
}
function backspace(){
    exp = exp.slice(0,-1);
    display.value = exp
}
function clearr(){
    exp=''
    display.value = exp
}
function solvee(){
    tokenize(exp);
    exp = display.value;
}



disply1.addEventListener("input", () => {
  if (!(/[+\-%/*(.√✓^]$/.test(disply1.value)) && disply1.value.length) {
    tokenize(disply1.value);
  } else if (disply1.value === '0' || disply1.value === '') {
    disply2.value = 0;
  }
});
disply1.addEventListener("input", () => {
  if (!(/[+\-%/*(.√✓^]$/.test(disply1.value)) && disply1.value.length) {
    tokenize(disply1.value);
  } else if (disply1.value === '0' || disply1.value === '') {
    disply2.value = 0;
  }
});

disply1.addEventListener('keydown', (e) => {
  const val = disply1.value;
  const lastChar = val.slice(-1);

  if (val === '' && '+%/*)0^'.includes(e.key)) {
    e.preventDefault();
    return;
  }

  if ('+%/*-✓√^'.includes(lastChar) && '+%/*-✓√^'.includes(e.key)) {
    if (lastChar !== e.key) {
      disply1.value = val.slice(0, -1) + e.key;
    }
    e.preventDefault();
    return;
  }

  if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;

  if (!"1234567890+-%./*(✓)√^".includes(e.key)) {
    e.preventDefault();
    return;
  }

  if (e.key === '.') {
    const lastNumber = val.split(/[-+*/%√✓^()]/).pop();
    if (lastNumber.includes('.')) {
      e.preventDefault();
      return;
    }
    if (val === '' || '+-*/%√^('.includes(lastChar)) {
      disply1.value += '0';
    }
  }
});
function clear2(){
    disply1.value = disply2.value = '';
}

const r = /\d+(\.\d+)?|[+\-%/*()√✓^]/g;

function precedence(operator) {
  switch (operator) {
    case '✓':
    case '√': return 4;
    case '^': return 3;
    case '*':
    case '/':
    case '%': return 2;
    case '+':
    case '-': return 1;
    default: return 0;
  }
}

function rightassoc(operator) {
  return operator === '^' || operator === '√' || operator === '✓';
}

function tokenize(exp) {
  let ary = exp.match(r);
  for (let i = 0; i < ary.length; i++) {
    if (
      ary[i] === '-' &&
      (i === 0 || '+-*/%√✓(^'.includes(ary[i - 1])) &&
      !isNaN(ary[i + 1])
    ) {
      ary.splice(i, 2, '-' + ary[i + 1]);
    }
  }
  console.log("Tokens:", ary);
  postfix(ary);
}

function postfix(ary) {
  const stack = [];
  const postfixary = [];

  for (let i of ary) {
    if (!isNaN(i)) {
      postfixary.push(i);
    } else if (i === '(') {
      stack.push(i);
    } else if (i === ')') {
      while (stack.length && stack[stack.length - 1] !== '(') {
        postfixary.push(stack.pop());
      }
      stack.pop(); // remove '('
    } else {
      while (
        stack.length &&
        precedence(stack[stack.length - 1]) > 0 &&
        (
          (rightassoc(i) && precedence(i) < precedence(stack[stack.length - 1])) ||
          (!rightassoc(i) && precedence(i) <= precedence(stack[stack.length - 1]))
        )
      ) {
        postfixary.push(stack.pop());
      }
      stack.push(i);
    }
  }

  while (stack.length) {
    postfixary.push(stack.pop());
  }

  console.log("Postfix:", postfixary);
  calc(postfixary);
}

function calc(postfixary) {
  const stack = [];
  for (let i of postfixary) {
    if (!isNaN(i)) {
      stack.push(parseFloat(i));
    } else {
      if (i === '√' || i == '✓') {
        stack.push(Math.sqrt(stack.pop()));
      } else {
        let b = stack.pop();
        let a = stack.pop();
        switch (i) {
          case '+': stack.push(a + b); break;
          case '-': stack.push(a - b); break;
          case '*': stack.push(a * b); break;
          case '/': stack.push(a / b); break;
          case '%': stack.push((a /100)* b); break;
          case '^': stack.push(Math.pow(a, b)); break;
        }
      }
    }
  }
  console.log(stack[0])
   if(dcalctrue){
    if(isNaN(stack[0])){
        disply2.value= 'Error'
    }else{
  disply2.value = Math.floor(stack[0]*10000000)/10000000;}
   }else{
  if(isNaN(stack[0])){
        display.value= 'Error'
    }else{
  display.value = Math.floor(stack[0]*10000000)/10000000;}
   }
}

