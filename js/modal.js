//MODAL

const modal = document.querySelector('.modal');
const modalTriggerBtn = document.getElementById('btn-get');
const modalCloseBtn = document.querySelector('.modal_close');

let isOpen = false;
let hasClickedModalTriggerBtn = false;
let hasScrolledToEnd = false;
let counter;

const  openModal = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    isOpen = true;
    window.removeEventListener('scroll', onScroll);
}


const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = ""
}

const onScrollFunction = () => {
    if (!isOpen && !hasClickedModalTriggerBtn && !hasScrolledToEnd) {
        if (window.pageYOffset > 1000) {
            setTimeout(() => {
                openModal()
            }, 1000);
        }    
    }
}

modalTriggerBtn.onclick = () => {
    hasClickedModalTriggerBtn = true;
    clearTimeout(counter);
    openModal();
}

modalCloseBtn.onclick = () => closeModal();

modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal()
    }
}

window.addEventListener('scroll', onScrollFunction);

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !hasScrolledToEnd) {
        hasScrolledToEnd = true;
        clearTimeout(counter);
        if (!hasClickedModalTriggerBtn && !isOpen) {
            counter = setTimeout(() => {
                openModal();
            }, 10000);
        }
    } else if (!hasScrolledToEnd) {
        clearTimeout(counter); 
    }
});

counter = setTimeout(() => {
    if (!hasClickedModalTriggerBtn && !hasScrolledToEnd) {
        openModal();
    }
}, 10000);



//POST DATA

const formElement = document.querySelector('form');

const postData = (form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const  request = new XMLHttpRequest();
        request.open("POST", "server.php");
        request.setRequestHeader("Content-type", "application/json");

        const formData = new FormData(form);
        const obj = {};
        formData.forEach((item, index) => {
            obj[index] = item
        })
        const json = JSON.stringify(obj);
        request.send(json)
    })
}

postData(formElement)
