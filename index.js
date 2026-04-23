// API configuration
const API_HOST = 'world-fun-facts-all-languages-support.p.rapidapi.com';
const API_KEY = 'ce757d623cmsh91a7607ae3ec29ap12692ejsn79c54c0caf85'; // Replace with your actual RapidAPI key

// Countries with their language codes, latitude, and longitude
const countries = [
  { name: 'USA', lang: 'en', lat: 40, lon: -100 },
  { name: 'Brazil', lang: 'pt', lat: -15, lon: -55 },
  { name: 'Egypt', lang: 'ar', lat: 26, lon: 30 },
  { name: 'India', lang: 'hi', lat: 20, lon: 78 },
  { name: 'China', lang: 'zh', lat: 35, lon: 105 },
  { name: 'Japan', lang: 'ja', lat: 36, lon: 138 },
  { name: 'Australia', lang: 'en', lat: -25, lon: 135 },
  { name: 'Mexico', lang: 'es', lat: 23, lon: -102 },
  { name: 'South Africa', lang: 'en', lat: -30, lon: 25 },
];

// DOM elements
const mapDiv = document.getElementById('map');
const factText = document.getElementById('fact-text');
const translateBtn = document.getElementById('translate-btn');
const saveBtn = document.getElementById('save-btn');
const factsUl = document.getElementById('facts-ul');

// Current fact
let currentFact = '';

// Load saved facts from localStorage
let savedFacts = JSON.parse(localStorage.getItem('savedFacts')) || [];
displaySavedFacts();

// Create country buttons
countries.forEach(country => {
  const btn = document.createElement('button');
  btn.className = 'country-btn';
  btn.textContent = country.name;
  btn.addEventListener('click', () => getFact(country.lang));

  // Position the button on the map
  const mapWidth = 1000;
  const mapHeight = 500;
  const left = ((country.lon + 180) / 360) * mapWidth;
  const top = ((90 - country.lat) / 180) * mapHeight;
  btn.style.position = 'absolute';
  btn.style.left = left + 'px';
  btn.style.top = top + 'px';

  mapDiv.appendChild(btn);
});

// Fetch fact from API
async function getFact(lang) {
  try {
    const response = await fetch(`https://${API_HOST}/fact.php?lang=${lang}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST
      }
    });
    if (!response.ok) {
      throw new Error(`API error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    if (!data.ok) {
      throw new Error(data.error || 'API returned no fact');
    }
    currentFact = data.text || data.fact || 'No fact available.';
    factText.textContent = currentFact;
  } catch (error) {
    console.error('Error fetching fact:', error);
    factText.textContent = `Error loading fact: ${error.message}`;
  }
}

// Translate button
translateBtn.addEventListener('click', () => {
  if (currentFact) {
    const encodedFact = encodeURIComponent(currentFact);
    window.open(`https://translate.google.com/?sl=auto&tl=en&text=${encodedFact}&op=translate`, '_blank');
  }
});

// Save fact
saveBtn.addEventListener('click', () => {
  if (currentFact && !savedFacts.includes(currentFact)) {
    savedFacts.push(currentFact);
    localStorage.setItem('savedFacts', JSON.stringify(savedFacts));
    displaySavedFacts();
  }
});

// Display saved facts
function displaySavedFacts() {
  factsUl.innerHTML = '';
  savedFacts.forEach(fact => {
    const li = document.createElement('li');
    li.textContent = fact;
    factsUl.appendChild(li);
  });
}
