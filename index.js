// API configuration
const API_HOST = 'world-fun-facts-all-languages-support.p.rapidapi.com';
const API_KEY = 'ce757d623cmsh91a7607ae3ec29ap12692ejsn79c54c0caf85'; // Replace with your actual RapidAPI key

// Countries with their language codes
const countries = [
  { name: 'France', lang: 'fr' },
  { name: 'Germany', lang: 'de' },
  { name: 'Spain', lang: 'es' },
  { name: 'Italy', lang: 'it' },
  { name: 'Japan', lang: 'ja' },
  { name: 'China', lang: 'zh' },
  { name: 'Russia', lang: 'ru' },
  { name: 'Brazil', lang: 'pt' },
  { name: 'USA', lang: 'en' },
  { name: 'India', lang: 'hi' },
  { name: 'Mexico', lang: 'es' }, // Spanish
  { name: 'UK', lang: 'en' },
  { name: 'Canada', lang: 'en' },
  { name: 'Australia', lang: 'en' },
  { name: 'South Korea', lang: 'ko' },
  { name: 'Netherlands', lang: 'nl' },
  { name: 'Sweden', lang: 'sv' },
  { name: 'Norway', lang: 'no' },
  { name: 'Denmark', lang: 'da' },
  { name: 'Finland', lang: 'fi' },
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
    const data = await response.json();
    currentFact = data.fact || 'No fact available.';
    factText.textContent = currentFact;
  } catch (error) {
    console.error('Error fetching fact:', error);
    factText.textContent = 'Error loading fact. Please check your API key.';
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
