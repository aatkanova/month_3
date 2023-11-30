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



//CONVERTER

async function setupCurrencyConverter() {
    const som = document.querySelector('#som');
    const usd = document.querySelector('#usd');
    const eur = document.querySelector('#eur');

    try {
        const response = await fetch("../data/convertor.json");
        const data = await response.json();
        const usdExchangeRate = data.usd;
        const eurExchangeRate = data.eur;

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
    } catch (error) {
        console.log('Fetch error:', error);
    }
}

setupCurrencyConverter();




//CARD SWITCHER 

const card = document.querySelector('.card'),
    btnPrev = document.querySelector("#btn-prev"),
    btnNext = document.querySelector('#btn-next');

let count = 1;

async function loadData(count) {
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${count}`);
        const data = await response.json();
        card.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${data.completed ? "green" : "red" }">${data.completed}</p>
            <span>${data.id}</span>
        `
    }
    catch(e){
        console.log('Fetch error:', error);
    }
}

function updateCount(operation) {
    if (operation === 'next') {
        count = count < 200 ? count + 1 : 1;
    } else if (operation === 'prev') {
        count = count > 1 ? count - 1 : 200;
    }
    loadData(count);
}

btnNext.onclick = () => updateCount('next');

btnPrev.onclick = () => updateCount('prev');

loadData(count);


//hw 6 part 2

async function asyncLoadPosts() {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await response.json()
        console.log(data);
    }
    catch(e){
        console.log('Fetch error:', error);
    }
}

asyncLoadPosts()



//SEARCH WEATHER

const cityNameInput = document.querySelector('.cityName'),
    city = document.querySelector('.city'),
    temp = document.querySelector('.temp')

    const WEATHER_API = 'http://api.openweathermap.org/data/2.5/weather';
    const API_KEY = 'e417df62e04d3b1b111abeab19cea714';

    cityNameInput.oninput = async(event) => {
        try{
            const response = await fetch(`${WEATHER_API}?q=${event.target.value}&appid=${API_KEY}`)
            const data = await response.json()
            city.innerHTML = data?.name ? data?.name : "city is not found";
            temp.innerHTML = data?.main?.temp ?  Math.round(data?.main?.temp - 273) + '&deg;C' : "...";
        }
        catch(e){
            console.log('Fetch error:', error);
        } 
    }

