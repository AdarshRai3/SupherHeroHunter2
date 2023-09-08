
const publicKey = '801ffb179c43e62422d9c6ac3f1203f0';
const privateKey = '63d44a2ff474121a6c8cce8ea9fc3cc05aac4c74';
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const resultsContainer = document.querySelector('#results');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const characterName = searchInput.value;
  searchCharacters(characterName);
});

function searchCharacters(name) {
  const timestamp = Date.now();
  const hash = md5(timestamp + privateKey + publicKey);
  const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const characters = data.data.results;
      displayCharacters(characters);
    });
}

function displayCharacters(characters) {
  resultsContainer.innerHTML = '';
  
  characters.forEach(character => {
    const characterElement = document.createElement('div');
    characterElement.classList.add('character');
    
    const characterImage = document.createElement('img');
    characterImage.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
    
    const characterName = document.createElement('h2');
    characterName.textContent = character.name;
    
    characterElement.appendChild(characterImage);
    characterElement.appendChild(characterName);
    
    resultsContainer.appendChild(characterElement);
  });
}