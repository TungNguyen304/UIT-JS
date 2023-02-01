const $ = document.querySelector.bind(document);

const showIcon = $('.pass>i');
const password = $('.pass input');
const submitBtn = $('.submit_btn');
const email = $('.email input');
const verifyEmail = /^\S+@([a-zA-Z]+\.)+[a-zA-z]{2,4}$/;
const errEmail = $('.email p');
const errPassword = $('.pass p');

let limit = 3;
const limit2 = 3;
let time = 10;
const time2 = 10;
let waiting = null;

showIcon.onclick = () => {
  if (password.type === 'text') {
    password.type = 'password';
    showIcon.classList.add('fa-eye');
    showIcon.classList.remove('fa-eye-slash');
  } else {
    password.type = 'text';
    showIcon.classList.remove('fa-eye');
    showIcon.classList.add('fa-eye-slash');
  }
};

function checkEmail(e) {
  e.preventDefault();
  if (!email.value) {
    errEmail.style.display = 'block';
    errEmail.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>Email không được để trống';
  } else {
    if (verifyEmail.test(email.value)) {
      errEmail.style.display = 'none';
      return true;
    } else {
      errEmail.style.display = 'block';
      errEmail.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>Email không hợp lệ';
    }
  }
  return false;
}

function checkPassword(e) {
  e.preventDefault();
  if (!password.value) {
    errPassword.style.display = 'block';
    return false;
  } else {
    errPassword.style.display = 'none';
  }
  return true;
}

email.onblur = (e) => {
  checkEmail(e);
};

email.onfocus = () => {
  errEmail.style.display = 'none';
};

password.onblur = (e) => {
  checkPassword(e);
};

password.onfocus = () => {
  errPassword.style.display = 'none';
};

submitBtn.onclick = (e) => {
  checkEmail(e) === true &&
    checkPassword(e) === true &&
    alert('Login Thành công');
  if (checkEmail(e) && checkPassword(e)) {
    alert('Login Thành Công');
  } else {
    limit--;
    if (limit === 0) {
      submitBtn.textContent = time + ' s';
      submitBtn.style.backgroundColor = '#929fbb';
      submitBtn.style.pointerEvents = 'none';
      waiting = setInterval(waitingMethod, 1000);
    }
  }
};

window.onunload = () => {
  if (limit === 0) {
    localStorage.setItem('wait', time);
  }
};

window.onload = () => {
  if (localStorage.getItem('wait')) {
    time = JSON.parse(localStorage.getItem('wait'));
    localStorage.removeItem('wait');
    waiting = setInterval(waitingMethod, 1000);
  }
};

function waitingMethod() {
  time--;
  if (time === -1) {
    submitBtn.textContent = 'Sign in';
    submitBtn.style.backgroundColor = '#377BFF';
    submitBtn.style.pointerEvents = 'unset';
    limit = limit2;
    time = time2;
    clearInterval(waiting);
  } else {
    submitBtn.textContent = time + ' s';
    submitBtn.style.backgroundColor = '#929fbb';
    submitBtn.style.pointerEvents = 'none';
  }
}
