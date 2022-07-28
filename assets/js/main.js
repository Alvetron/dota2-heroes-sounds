const MAIN_URL = 'https://api.opendota.com';
const HEROES_URL = 'https://api.opendota.com/api/heroStats';

const strSection = document.getElementById('str');
const agiSection = document.getElementById('agi');
const intSection = document.getElementById('int');

const soundsEl = document.getElementById('sounds');
let soundsAll;

let heroCard = undefined;
let heroTitles = undefined;

const searchEl = document.getElementById('search-hero');
let abc = 'qwertyuiopasdfghjklzxcvbnmbackspace';
let keyboardText = '';
let removeAnim = undefined;

getHeroesData(HEROES_URL);

async function getHeroesData(url) {
  const resp = await fetch(url);
  const respJson = await resp.json();

  createHeroCard(respJson);
  createSounds(respJson);
}

function createHeroCard(data) {
  let strHeroes= '';
  let agiHeroes= '';
  let intHeroes= '';

  for(let i = 0; i < data.length; i++) {
    if(data[i].primary_attr === 'str')
    {
      strHeroes += 
      `
      <div class="card">
        <div class="card__inner" data-name="${data[i].name}">
          <img class="card__image" src="${MAIN_URL + data[i].img}">
          <h5 class="card__title">${data[i].localized_name}</h5>
        </div>
      </div>
      `;
    }
    else if(data[i].primary_attr === 'agi') {
      agiHeroes += 
      `
      <div class="card">
        <div class="card__inner" data-name="${data[i].name}">
          <img class="card__image" src="${MAIN_URL + data[i].img}">
          <h5 class="card__title">${data[i].localized_name}</h5>
        </div>
      </div>
      `;
    }
    else if(data[i].primary_attr === 'int')
    {
      intHeroes += 
      `
      <div class="card">
        <div class="card__inner" data-name="${data[i].name}">
          <img class="card__image" src="${MAIN_URL + data[i].img}">
          <h5 class="card__title">${data[i].localized_name}</h5>
        </div>
      </div>
      `;
    }
  }

  strSection.innerHTML = strHeroes;
  agiSection.innerHTML = agiHeroes;
  intSection.innerHTML = intHeroes;
  
  heroCard = document.querySelectorAll('.card__inner');
  heroTitles = document.querySelectorAll('.card__title');

}

function createSounds(data) {
  let sounds = '';

  for(let i = 0; i < data.length; i++) {
    if(data[i].primary_attr === 'str' || data[i].primary_attr === 'int')
    {
      sounds += `<audio class="sound" id="${data[i].name}" src="assets/audio/${data[i].name}.mpeg" ></audio>`;
    }else if(data[i].primary_attr === 'agi') {
      sounds += `<audio class="sound" id="${data[i].name}" src="assets/audio/${data[i].name}.mp3" ></audio>`;
    }
  }
  soundsEl.innerHTML = sounds;
  soundsAll = soundsEl.querySelectorAll('.sound');
}

document.getElementById('main').addEventListener('click', (e) => {
  if(!e.target.classList.contains('card__inner')) return;

  const data = e.target.getAttribute('data-name');
  const elem = document.getElementById(`${data}`);

  stopPlaying()

  elem.play()
})

function stopPlaying() {
  soundsAll.forEach(sound => {
    sound.pause();
    sound.currentTime = 0;
  })
}

window.addEventListener('keydown', (e) => {
  let key = e.key;
  key = key.toLowerCase();

  if(!abc.includes(key)) return;

  if(key === 'backspace') {
    keyboardText = keyboardText.slice(0, keyboardText.length - 1);
    searchHero(keyboardText);
    addCardActiveClass();
    return false;
  }

  keyboardText += key;
  addCardActiveClass();
  searchHero(keyboardText);
})


function addCardActiveClass() {

  for(let i = 0; i < heroCard.length; i++) {
    let heroName = heroTitles[i].textContent;

    heroName = heroName.toLowerCase();
    firstLetters = heroName.slice(0, keyboardText.length);

    if(!firstLetters.includes(keyboardText) && keyboardText !== '') {
      heroCard[i].classList.add('deactivated');
    }
    else if(heroCard[i].classList.contains('deactivated')) {
      heroCard[i].classList.remove('deactivated');
    }
  }
}

function searchHero(text) {
  searchEl.classList.contains('index') ? searchEl.classList.remove('index') : '';

  if(removeAnim !== undefined) {
    clearTimeout(removeAnim);
    searchEl.classList.remove('anim');
  }

  searchEl.style.opacity = 1;
  searchEl.innerHTML = keyboardText;
  
  removeAnim = setTimeout(() => {
    searchEl.classList.add('anim');
    searchEl.style.opacity = 0;
  }, 1500)
}

searchEl.addEventListener('mouseenter', () => {
  searchEl.classList.add('index');
})


