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
    const fontStyle = e.target.dataset.style;
    if (screen.style[fontStyle] === e.target.value.toLowerCase()) {
      screen.style[fontStyle] = 'unset';
    } else {
      screen.style[fontStyle] = e.target.value;
    }
  };
});
