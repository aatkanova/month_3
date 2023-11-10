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

const moveBlock = (position) => {
    if (position <= 430) {
        childBlock.style.left = `${position}px`;
        setTimeout(() => {
            moveBlock(position + 1);
        }, 5);
    }
}

moveBlock(0)




