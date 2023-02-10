const $ = document.querySelector.bind(document);

const showIcon = $('.pass>i');
const password = $('.pass input');
const submitBtn = $('.submit_btn');
const email = $('.email input');
const verifyEmail = /^\S+@([a-zA-Z]+\.)+[a-zA-z]{2,4}$/;
const errEmail = $('.email p');
const errPassword = $('.pass p');

let limit = 3;
const limitFixed = 3;
let time = 60;
const timeFixed = 60;
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

function checkEmail() {
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

function checkPassword() {
  if (!password.value) {
    errPassword.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>Password không hợp lệ';
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
  e.preventDefault();
  if (checkEmail() && checkPassword()) {
    reset();
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
    localStorage.setItem('limitStore', limit);
  }
};

window.onload = () => {
  if (localStorage.getItem('wait')) {
    time = JSON.parse(localStorage.getItem('wait'));
    limit = JSON.parse(localStorage.getItem('limitStore'));
    waitingMethod();
    waiting = setInterval(waitingMethod, 1000);
  }
};

function waitingMethod() {
  time--;
  if (time === -1) {
    reset();
  } else {
    submitBtn.textContent = time + ' s';
    submitBtn.style.backgroundColor = '#929fbb';
    submitBtn.style.pointerEvents = 'none';
  }
}

function reset() {
  submitBtn.textContent = 'Sign in';
  submitBtn.style.backgroundColor = '#377BFF';
  submitBtn.style.pointerEvents = 'unset';
  limit = limitFixed;
  time = timeFixed;
  clearInterval(waiting);
  localStorage.removeItem('wait');
}
