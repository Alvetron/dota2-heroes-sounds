const MAIN_URL = 'https://api.opendota.com';
const HEROES_URL = 'https://api.opendota.com/api/heroStats';

const strSection = document.getElementById('str');
const agiSection = document.getElementById('agi');
const intSection = document.getElementById('int');

const soundsEl = document.getElementById('sounds');
let soundsAll;

window.addEventListener('keydown', (e) => {
  document.querySelectorAll('')
  console.log(e.key)
})

getHeroesData(HEROES_URL);

async function getHeroesData(url) {
  const resp = await fetch(url);
  const respJson = await resp.json();

  console.log(respJson)
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