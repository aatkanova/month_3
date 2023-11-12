//HW 1 part 1

//CHECK GMAIL

const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

gmailButton.addEventListener('click', () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = 'OK';
        gmailResult.style.color = 'green';  
    }else{
        gmailResult.innerHTML = 'NOT OK';
        gmailResult.style.color = 'red'; 
    }
});


//HW 1 part 2

//MOVE BLOCK

const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');

let positionX = 0;
let positionY = 0;

const moveBlock = () => {
    if (positionX < 430 && positionY === 0){
        positionX++;
        childBlock.style.left = `${positionX}px`;
        setTimeout(moveBlock, 1);
    }else if (positionX >= 430 && positionY < 430) {
        positionY++;
        childBlock.style.top = `${positionY}px`;
        setTimeout(moveBlock, 1);
    }else if (positionX >= 0 && positionY >= 430){
        positionX--;
        childBlock.style.left = `${positionX}px`;
        setTimeout(moveBlock, 1);
    }else if (positionX <= 0 && positionY > 0){
        positionY--;
        childBlock.style.top = `${positionY}px`;
        setTimeout(moveBlock, 1);
    }
}

moveBlock();

//TIMER hw2

let time = document.querySelector('#minutesS');
const startTimerButton = document.querySelector('#start');
const stopTimerButton = document.querySelector('#stop');
const resetTimerButton = document.querySelector('#reset');

let timerInterval;
let isTimerRunning = false;

startTimerButton.addEventListener('click', () => {
    if (!isTimerRunning){
        timerInterval = setInterval(() => {
            time.innerText++
        }, 1000);
        isTimerRunning = true;
    }
})

stopTimerButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    isTimerRunning = false;
});

resetTimerButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    time.innerText = 0;
    isTimerRunning = false;
});


