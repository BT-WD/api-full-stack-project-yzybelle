# World Fun Facts App

## Proposal

**Target Audience:** PG and fun. World fun facts about culture or geographic location.

**Data Sources/APIs:**
- https://rapidapi.com/vintarok-vintarok-default/api/world-fun-facts-all-languages-support

**API Endpoints:**
- GET /fact.php?lang={language_code}
- Example: curl "/fact.php?lang=fr"

**App Display:**
- Interactive buttons for different countries.
- Displays fun facts in the country's language when clicked.
- Translate button to open Google Translate for the fact.
- Save button to store facts in a list.

**Data Storage:**
- Fun facts are stored in the browser's localStorage.
- Displayed in a list on the bottom left.

## Setup Instructions

1. Get a RapidAPI key from https://rapidapi.com/vintarok-vintarok-default/api/world-fun-facts-all-languages-support
2. Replace `YOUR_RAPIDAPI_KEY_HERE` in `index.js` with your actual API key.
3. Open `index.html` in a web browser.

## Resources Used

- API: https://rapidapi.com/vintarok-vintarok-default/api/world-fun-facts-all-languages-support
- No AI prompts used for coding; implemented based on proposal.