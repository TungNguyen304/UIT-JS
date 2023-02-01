const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const content = $('.form__content textarea');
const screen = $('.screen');
const color = document.getElementById('text');
const background = document.getElementById('background');
const btnList = $$('.form_item .style input');

content.onkeyup = (e) => {
  screen.textContent = e.target.value;
};

color.oninput = (e) => {
  screen.style.color = e.target.value;
};

background.oninput = (e) => {
  screen.style.backgroundColor = e.target.value;
};

btnList.forEach((item) => {
  item.onclick = (e) => {
    if (e.target.value === 'Italic') {
      if (screen.style.fontStyle === 'italic') {
        screen.style.fontStyle = 'normal';
      } else {
        screen.style.fontStyle = 'italic';
      }
    }
    if (e.target.value === 'Bold') {
      if (screen.style.fontWeight === 'bold') {
        screen.style.fontWeight = 'normal';
      } else {
        screen.style.fontWeight = 'bold';
      }
    }
    if (e.target.value === 'Underline') {
      if (screen.style.textDecoration === 'underline') {
        screen.style.textDecoration = 'none';
      } else {
        screen.style.textDecoration = 'underline';
      }
    }
  };
});
