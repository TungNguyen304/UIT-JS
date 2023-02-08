const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const inputLeft = $('.left .content textarea');
const submitLeft = $('.left .content button');
const actionLeft = $$('.left .action button');
const inputRight = $('.right .content textarea');
const submitRight = $('.right .content button');
const actionRight = $$('.right .action button');
const screenLeft = $('.left .screen');
const screenRight = $('.right .screen');

let msgStoreLeft = [];
let msgStoreRight = [];

actionLeft.forEach((item) => {
  handleReStyleContent(item, inputLeft, 'left');
});

actionRight.forEach((item) => {
  handleReStyleContent(item, inputRight, 'right');
});

submitLeft.onclick = sendMsgForLeft;
inputLeft.onkeydown = function(e) {
  if (e.key === 'Enter' && e.keyCode === 13) {
    e.preventDefault();
    if (this.value) {
      sendMsgForLeft();
    }
  }
};

submitRight.onclick = sendMsgForRight;
inputRight.onkeydown = function(e) {
  if (e.key === 'Enter' && e.keyCode === 13) {
    e.preventDefault();
    if (this.value) {
      sendMsgForRight();
    }
  }
};

function handleReStyleContent(item, actor, side) {
  item.onclick = () => {
    if (item.textContent === 'Đậm') {
      handleCustomStyle(actor, 'Weight', 'bold');
    }
    if (item.textContent === 'Nghiêng') {
      handleCustomStyle(actor, 'Style', 'italic');
    }
    if (item.textContent === 'Reset') {
      handleResetMsg(side);
    }
  };
}

function sendMsgForLeft() {
  if (inputLeft.value) {
    msgStoreLeft.push(
      `<div class='msg msg__right'><span style='font-style:${
        inputLeft.style.fontStyle || ''
      }; font-weight:${inputLeft.style.fontWeight || ''}'>${
        inputLeft.value
      }</span></div>`,
    );
    msgStoreRight.push(
      `<div class='msg msg__left'><span style='font-style:${
        inputLeft.style.fontStyle || ''
      }; font-weight:${inputLeft.style.fontWeight || ''}'>${
        inputLeft.value
      }</span></div>`,
    );
    screenLeft.innerHTML = msgStoreLeft.join(' ');
    screenRight.innerHTML = msgStoreRight.join(' ');
    inputLeft.value = '';
    inputLeft.focus();
    handleScrollToBot();
  }
}

function sendMsgForRight() {
  if (inputRight.value) {
    msgStoreLeft.push(
      `<div class='msg msg__left'><span style='font-style:${
        inputRight.style.fontStyle || ''
      }; font-weight:${inputRight.style.fontWeight || ''}'>${
        inputRight.value
      }</span></div>`,
    );
    msgStoreRight.push(
      `<div class='msg msg__right'><span style='font-style:${
        inputRight.style.fontStyle || ''
      }; font-weight:${inputRight.style.fontWeight || ''}'>${
        inputRight.value
      }</span></div>`,
    );
    screenLeft.innerHTML = msgStoreLeft.join(' ');
    screenRight.innerHTML = msgStoreRight.join(' ');
    inputRight.value = '';
    inputRight.focus();
    handleScrollToBot();
  }
}

function handleCustomStyle(actor, style, value) {
  if (actor.style[`font${style}`] === value) {
    actor.style[`font${style}`] = 'unset';
  } else {
    actor.style[`font${style}`] = value;
  }
}

function handleResetMsg(side) {
  if (side === 'left') {
    msgStoreLeft = [];
    screenLeft.innerHTML = '';
  } else {
    msgStoreRight = [];
    screenRight.innerHTML = '';
  }
}

function handleScrollToBot() {
  screenRight.scrollTo(0, this.innerHeight);
  screenLeft.scrollTo(0, this.innerHeight);
}
