const charactersBlock = document.querySelector('.characters');

const request = new XMLHttpRequest();
request.open('GET', '../data.json');
request.setRequestHeader('Content-type', 'application/json');
request.send();

request.addEventListener('load', () => {
    const data = JSON.parse(request.response);
    
    data.forEach((character) => {
        const characterBlock = document.createElement('div');
        characterBlock.setAttribute('class', 'characterCard');
        characterBlock.innerHTML = `
            <h2 class="name">${character.name}</h2>
            <span class="age">День Рождения: ${character.birthDate}</span>
            <div class="characterPhoto">
                <img src="${character.photo}">
            </div>
            <p class="bio">${character.bio}</p>
        `
        charactersBlock.append(characterBlock)
    });
})
