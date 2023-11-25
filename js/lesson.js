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



//CONVERTOR

function setupCurrencyConverter() {
    const som = document.querySelector('#som');
    const usd = document.querySelector('#usd');
    const eur = document.querySelector('#eur');

    const request = new XMLHttpRequest();
    request.open("GET", "../data/convertor.json");
    request.setRequestHeader("Content-type", "application/json");
    request.send();

    request.onload = () => {
        const response = JSON.parse(request.response);
        const usdExchangeRate = response.usd;
        const eurExchangeRate = response.eur;

        function updateSomValue(inputValue) {
            if (!isNaN(inputValue)) {
                usd.value = (inputValue / usdExchangeRate).toFixed(2);
                eur.value = (inputValue / eurExchangeRate).toFixed(2);
            } else {
                usd.value = "";
                eur.value = "";
            }
        }

        function updateUsdValue(inputValue) {
            if (!isNaN(inputValue)) {
                som.value = (inputValue * usdExchangeRate).toFixed(2);
                eur.value = (inputValue * (usdExchangeRate / eurExchangeRate)).toFixed(2);
            } else {
                som.value = "";
                eur.value = "";
            }
        }

        function updateEurValue(inputValue) {
            if (!isNaN(inputValue)) {
                som.value = (inputValue * eurExchangeRate).toFixed(2);
                usd.value = (inputValue * (eurExchangeRate / usdExchangeRate)).toFixed(2);
            } else {
                som.value = "";
                usd.value = "";
            }
        }

        som.oninput = () => {
            const inputValue = parseFloat(som.value);
            updateSomValue(inputValue);
        };

        usd.oninput = () => {
            const inputValue = parseFloat(usd.value);
            updateUsdValue(inputValue);
        };

        eur.oninput = () => {
            const inputValue = parseFloat(eur.value);
            updateEurValue(inputValue);
        };
    };
}

setupCurrencyConverter();


//CARD SWITCHER не доделан

const card = document.querySelector('.card'),
    btnPrev = document.querySelector("#btn-prev"),
    btnNext = document.querySelector('#btn-next')

let count = 0;

btnNext.onclick = () => {
    count++;
    fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
        .then((response) => response.json())
        .then(data => {
            card.innerHTML = `
                <p>${data.title}</p>
                <p style = "color: ${data.completed ? "green" : "red" }">${data.completed}</p>
                <span>${data.id}</span>
            `
        })
}
