// PHONE CHECKER

const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneSpan = document.querySelector('#phone_result');

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

phoneButton.addEventListener('click', () => {
    if(regExp.test(phoneInput.value)){
        phoneSpan.innerHTML = 'OK';
        phoneSpan.style.color = 'green';  
        phoneInput.classList.remove('_error');
    } else{
        phoneInput.classList.add('_error');
        phoneSpan.innerHTML = 'NOT OK';
        phoneSpan.style.color = 'red';  
    }
})


//TAB SLIDER  

const tabsContentCards = document.querySelectorAll('.tab_content_block');
const tabsItems = document.querySelectorAll('.tab_content_item');
const tabsItemsParent = document.querySelector('.tab_content_items');
let intervalId;

const hideTabsContentCards = () => {
    tabsContentCards.forEach((tabContentCard) => {
        tabContentCard.style.display = 'none';
    });
    tabsItems.forEach((tabItem) => {
        tabItem.classList.remove('tab_content_item_active');
    });
};

const showTabsContentCards = (indexElement = 0) => {
    tabsContentCards[indexElement].style.display = 'block';
    tabsItems[indexElement].classList.add('tab_content_item_active');
};

hideTabsContentCards();
showTabsContentCards();

tabsItemsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabsItems.forEach((tabItem, tabItemIndex) => {
            if (event.target === tabItem) {
                clearInterval(intervalId); 
                hideTabsContentCards();
                showTabsContentCards(tabItemIndex);
                intervalId = setInterval(() => { 
                    tabItemIndex++; 
                    if (tabItemIndex > tabsItems.length - 1) {
                        tabItemIndex = 0;
                    }
                    hideTabsContentCards();
                    showTabsContentCards(tabItemIndex);
                }, 3000);
            }
        });
    }
};

let index = 0;
intervalId = setInterval(() => {
    index++;
    if (index > tabsItems.length - 1) {
        index = 0;
    }
    hideTabsContentCards();
    showTabsContentCards(index);
}, 3000);
