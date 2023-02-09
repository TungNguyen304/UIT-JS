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
const bold = 'bold';
const italic = 'italic';
const reset = 'reset';

actionLeft.forEach((item) => {
  handleReStyleContent(item, inputLeft, 'left');
});

actionRight.forEach((item) => {
  handleReStyleContent(item, inputRight, 'right');
});

submitLeft.onclick = (e) => {
  e.preventDefault();
  sendMsg('left', 'right', inputLeft);
};

inputLeft.onkeydown = function(e) {
  if (e.key === 'Enter' && e.keyCode === 13) {
    e.preventDefault();
    if (this.value) {
      sendMsg('left', 'right', inputLeft);
    }
  }
};

submitRight.onclick = (e) => {
  e.preventDefault();
  sendMsg('right', 'left', inputRight);
};

inputRight.onkeydown = function(e) {
  if (e.key === 'Enter' && e.keyCode === 13) {
    e.preventDefault();
    if (this.value) {
      sendMsg('right', 'left', inputRight);
    }
  }
};

function handleReStyleContent(item, actor, side) {
  item.onclick = () => {
    if (item.value === bold) {
      handleCustomStyle(actor, 'Weight', 'bold');
    }
    if (item.value === italic) {
      handleCustomStyle(actor, 'Style', 'italic');
    }
    if (item.value === reset) {
      handleResetMsg(side);
    }
  };
}

function sendMsg(from, to, input) {
  if(input.value) {
    msgStoreLeft.push(
      `<div class='msg msg__${to}'><span style='font-style:${
        input.style.fontStyle || ''
      }; font-weight:${input.style.fontWeight || ''}'>${
        input.value
      }</span></div>`,
    );
    msgStoreRight.push(
      `<div class='msg msg__${from}'><span style='font-style:${
        input.style.fontStyle || ''
      }; font-weight:${input.style.fontWeight || ''}'>${
        input.value
      }</span></div>`,
    );
    screenLeft.innerHTML = msgStoreLeft.join(' ');
    screenRight.innerHTML = msgStoreRight.join(' ');
    input.value = '';
    input.focus();
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
