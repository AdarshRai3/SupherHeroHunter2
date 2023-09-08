const publicKey = '801ffb179c43e62422d9c6ac3f1203f0';
const privateKey = '63d44a2ff474121a6c8cce8ea9fc3cc05aac4c74';
const searchButton = document.querySelector('#searchButton');
const searchInput = document.querySelector('#searchInput');
const results = document.querySelector('#results');

searchButton.addEventListener('click', () => {
  const characterName = searchInput.value;
  searchCharacter(characterName);
});

function searchCharacter(name) {
  const ts = new Date().getTime();
  const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
  const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayResults(data.data.results);
    });
}

function displayResults(characters) {
  results.innerHTML = '';
  characters.forEach(character => {
    const characterElement = document.createElement('div');
    characterElement.innerHTML = `
      <h2>${character.name}</h2>
      <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
      <p>${character.description}</p>
    `;
    results.appendChild(characterElement);
  });
}
const api = new marvel.MarvelAPI();

// Use the MarvelAPI class to get a list of characters
const characters = await api.getCharacters();

// For each character, get the character's image and name
for (const character of characters) {
  const image = await character.getImage();
  const name = character.getName();

  // Display the character's image and name on the screen
  console.log(`${name}: ${image}`);
}