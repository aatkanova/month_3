const charactersBlock = document.querySelector('.characters');

async function fetchCharactersData() {
    try {
        const response = await fetch('../data/data.json');
        const data = await response.json();

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
            `;
            charactersBlock.append(characterBlock);
        });
    } catch (error) {
        console.log('Fetch error:', error);
    }
}

fetchCharactersData();

