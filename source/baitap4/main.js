const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const upload = $('.upload input');
const uploadButton = $('.upload');
const avt = $('.upload img');
const desc = $('.upload p');
const infoList = $$('.form_item input');
const addBtn = $('.action .add');
const resetBtn = $('.action .reset');
const infoListShow = $$('.info_item span');
const avtShow = $('.screen_avt img');
const descShow = $('.screen_avt p');
const errorList = $$('form>p');
const fullname = $('.form_item input#fullname');
const email = $('.form_item input#email');
const phone = $('.form_item input#phone');
const birthday = $('.form_item input#birthday');
const password = $('.form_item input#password');
const confirmPassword = $('.form_item input#confirm');

let url = '';
const verifyEmail = /^\S+@([a-zA-Z]+\.)+[a-zA-z]{2,4}$/;
const verifyPhone = /^0[0-9]{9}$/;
const verifyBirthday = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
const verifyPass =
  /^[a-zA-Z](?=.*[a-z])(?=.[A-Z]*)(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,29}$/;

uploadButton.onclick = () => {
  upload.click();
};

upload.onchange = (e) => {
  url = URL.createObjectURL(e.target.files[0]);
  uploadButton.style.border = '1px solid black';
  avt.src = url;
  desc.style.display = 'none';
};

addBtn.onclick = (e) => {
  addProfile(e);
};

resetBtn.onclick = () => {
  resetProfile();
};

window.onkeydown = (e) => {
  if (e.key === 'Shift') {
    addProfile(e);
  }
  if (e.key === 'Delete') {
    resetProfile();
  }
};

function addProfile(e) {
  e.preventDefault();
  let warning = {
    desc: 'Xin hãy nhập đầy đủ thông tin!',
    type: 'name',
  };
  const Person = {
    fullname: fullname.value,
    email: email.value,
    phone: phone.value,
    birthday: birthday.value,
    password: password.value,
    confirm: confirmPassword.value,
  };

  const validateEmpty = Object.keys(Person).filter((item) => {
    if (!Person[item]) {
      showError(item, `${item} không được để trống.`);
      return true;
    }
  });

  const validateValid = Object.keys(Person).filter((item) => {
    if (Person[item] && item === 'fullname') {
      return validateName(Person[item], item);
    }
    if (Person[item] && item === 'email') {
      return validateEmail(Person[item], item);
    }
    if (Person[item] && item === 'phone') {
      return validatePhone(Person[item], item);
    }
    if (Person[item] && item === 'birthday') {
      return validateBirthday(Person[item], item);
    }
    if (Person[item] && item === 'password') {
      return validatePassword(Person[item], item);
    }
    if (Person[item] && item === 'confirm') {
      return validateComfirm(Person[item], Person['password'], item);
    }
  });

  const validateAvt = (function () {
    if (!upload.files[0]) {
      showError('img', 'Chọn avt trước khi add.');
      uploadButton.style.border = '1px solid red';
      return false;
    }
    hideError('img');
    uploadButton.style.border = '1px solid black';
    return true;
  })();

  if (validateEmpty.length === 0 && validateValid.length === 0 && validateAvt) {
    Object.keys(Person).forEach((item, index) => {
      if (infoListShow[index]) {
        if (item === 'fullname') {
          renderFullName(Person[item], index);
        }
        if (item === 'phone') {
          renderPhone(Person[item], index);
        }
        if (item === 'birthday') {
          infoListShow[index].textContent = Person[item].split('-').reverse().join('/');
        }
        if (item !== 'fullname' && item !== 'phone' && item !== 'birthday') {
          infoListShow[index].textContent = Person[item];
        }
      }
      infoList[index].value = '';
    });
    avt.src = '';
    desc.style.display = 'unset';
    if (url) {
      avtShow.src = url;
    }
    upload.value = null;
    errorList.forEach((item) => {
      item.style.display = 'none';
    });
  }
}

function resetProfile() {
  infoList.forEach((item, index) => {
    if (infoListShow[index]) {
      infoListShow[index].textContent = '';
    }
    item.value = '';
  });
  avt.src = '';
  desc.style.display = 'unset';
  avtShow.src = '';
  descShow.style.display = 'unset';
  upload.value = null;
  infoList.forEach((item) => {
    item.style.border = '1px solid black';
  });
  errorList.forEach((item) => {
    item.style.display = 'none';
  });
  uploadButton.style.border = '1px solid black';
}

function showError(type, desc) {
  $(
    `form .warning_${type}`
  ).innerHTML = `<i class='fa-solid fa-triangle-exclamation'></i><span>${desc}</span>`;
  $(`form .warning_${type}`).style.display = 'block';
  $(`.form_item input#${type}`).style.border = '1px solid red';
}

function hideError(type) {
  $(`form .warning_${type}`).style.display = 'none';
  $(`.form_item input#${type}`).style.border = '1px solid black';
}

function renderFullName(name, index) {
  let listName = name.split(' ');
  listName = listName.map((i) => {
    const name = i.toLowerCase();
    return name.replace(name[0], name.charAt(0).toUpperCase());
  });
  infoListShow[index].textContent = listName.join(' ');
}

function renderPhone(phone, index) {
  infoListShow[index].textContent =
    phone.slice(0, 3) + '-' + phone.slice(3, 6) + '-' + phone.slice(6);
}

function validateName(name, item) {
  if (name.length > 150) {
    showError(item, 'Full name không hợp lệ.');
    return true;
  }
  hideError(item);
  return false;
}

function validateEmail(email, item) {
  if (!verifyEmail.test(email)) {
    showError(item, 'Email không hợp lệ.');
    return true;
  }
  hideError(item);
  return false;
}

function validatePhone(phone, item) {
  if (!verifyPhone.test(phone)) {
    showError(item, 'Phone number không hợp lệ.');
    return true;
  }
  hideError(item);
  return false;
}

function validateBirthday(birthday, item) {
  if (!verifyBirthday.test(birthday.split('-').reverse().join('/'))) {
    showError(item, 'Birthday phải có dạng dd/mm/YYYY.');
    return true;
  }
  hideError(item);
  return false;
}

function validatePassword(password, item) {
  if (!verifyPass.test(password)) {
    showError(
      item,
      'Password: 8-30 kí tự, bắt đầu bằng chữ cái, có chứa kí tự đặc biệt, số, chữ viết hoa.'
    );
    return true;
  }
  hideError(item);
  return false;
}

function validateComfirm(password, oldPass, item) {
  if (password !== oldPass) {
    showError(item, 'Confirm password không khớp.');
    return true;
  } else {
    if (!verifyPass.test(password)) {
      showError(
        item,
        'Password: 8-30 kí tự, bắt đầu bằng chữ cái, có chứa kí tự đặc biệt, số, chữ viết hoa.'
      );
      return true;
    }
    hideError(item);
    return false;
  }
}
