var leren = [];
var gebruiken = [...leren];
var randomNumber = 0;
var switched = false;
const woord = document.querySelector('span');
const check = document.querySelector('#text p');
const input = document.querySelector('input');
const submit = document.querySelector('button');
const form = document.querySelector('form');
const bar = document.querySelector('div#bar');
const ptotal = document.querySelector('p#total');
const ppercent = document.querySelector('p#percent');
const textarea = document.querySelector('textarea');
const model = document.querySelector('div#model');
let correct = 0;
let total = 0;

// ACTUAL PROGRAMMING NOW

function setBar(){
    if(total > leren.length){total = 0; correct = 0;};
    bar.style.background = `linear-gradient(90deg, rgba(0,255,0,1) ${correct / total * 100}%, rgba(255,0,0,1) ${correct / total * 100}%)`;
    ptotal.innerText = `${correct}/${total} (${leren.length})`;
    ppercent.innerText = `${Math.ceil(correct / total * 100) || 0}%`;
    return;
};

form.addEventListener('submit', e =>{
    checkWord(input.value);
    e.preventDefault();
    return;
});

function randomWord(){
    if(gebruiken.length < 1){
        gebruiken = [...leren];
    };
    randomNumber = Math.floor(Math.random()*gebruiken.length);
    woord.innerText = `${gebruiken[randomNumber].woord}`;
    check.innerText = `${gebruiken[randomNumber].definitie}`;
    input.value = '';
    input.focus();
    return;
};

function checkWord(word){
    let sent = word.replace(/(,m\/v)|(, m)|(, v)|\(.+?\)|\./g, '');
    let received = gebruiken[randomNumber].definitie.replace(/(,m\/v)|(, m)|(, v)|\(.+?\)|\./g, ''); 
    if(sent === received){
        input.classList.add('correct');
        submit.classList.add('correct');
        input.disabled = true;
        submit.disabled = true;
        check.classList.add('answerQuick');
        gebruiken.splice(randomNumber, 1);
        setTimeout(() => {
            randomWord();
            input.disabled = false;
            submit.disabled = false;
            check.classList.remove('answerQuick');
            correct += 1;
            total += 1;
            setBar();
        }, 1000);
        return true;
    };
    input.classList.add('wrong');
    submit.classList.add('wrong');
    input.disabled = true;
    submit.disabled = true;
    check.classList.add('answerShow');
    setTimeout(()=>{
        randomWord();
        input.disabled = false;
        submit.disabled = false;
        check.classList.remove('answerShow');
        total += 1;
        setBar();
    }, 5000);
    return false;
};

input.addEventListener('animationend', e =>{
    e.preventDefault();
    input.classList.remove('wrong');
    input.classList.remove('correct');
    submit.classList.remove('wrong');
    submit.classList.remove('correct');
    return;
});

function useInput(){
    if(textarea.value){
        model.classList.add('uppity');
        leren = JSON.parse(`[\n${textarea.value}\n]`);
        randomWord();
        setBar();
        return JSON.parse(`[\n${textarea.value}\n]`);
    };
    return JSON.parse('[]');
};
