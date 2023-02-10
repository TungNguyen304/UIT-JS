const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const infoList = $$('.form_item input');
const addBtn = $('.action .add');
const deleteBtn = $('.action .delete');
const error = $('form>p.warning');
const table = $('table tbody');
const fullname = $('.form_item input#name');
const phone = $('.form_item input#phone');
const email = $('.form_item input#email');
let tickList = $$('.tick input');
let tickAll = $('.tick_all');

const verifyEmail = /^\S+@([a-zA-Z]+\.)+[a-zA-z]{2,4}$/;
const verifyPhone = /^0[0-9]{9}$/;
const verifyName = /^[a-zA-Z][a-zA-Z\s]{1,148}[a-zA-Z]$/;

let profileStore = [];

addBtn.onclick = (e) => {
  e.preventDefault();
  const Person = {
    name: fullname.value,
    phone: phone.value,
    email: email.value,
  };

  const validateEmpty = filterInputEmpty(Person);

  const validateValid = filterInputInvalid(Person);

  if (validateEmpty.length === 0 && validateValid.length === 0) {
    profileStore.push(Person);
    renderProfile(Person);
    infoList.forEach((item) => {
      item.value = '';
    });
    error.style.display = 'none';
    handleUpdateProfile();
  }
};

deleteBtn.onclick = (e) => {
  e.preventDefault();
  const willDelete = [];
  tickList.forEach((item, index) => {
    if (item.checked === true) {
      willDelete.push(index);
    }
  });
  profileStore = profileStore.filter((item, index) => {
    return !willDelete.includes(index);
  });
  renderAll();
  handleUpdateProfile();
};

tickAll.onchange = (e) => {
  if (e.target.checked === true) {
    tickList.forEach((item) => {
      item.checked = true;
    });
  } else {
    tickList.forEach((item) => {
      item.checked = false;
    });
  }
};

function renderProfile(Person) {
  if (Person) {
    const html = `<tr>
        <td class='tick'><input type='checkbox'></td>
        <td><div data-position='${profileStore.length - 1}-name'>${
      Person['name']
    }</div></td>
        <td><div data-position='${profileStore.length - 1}-phone'>${
      Person['phone']
    }</div></td>
        <td><div data-position='${profileStore.length - 1}-email'>${
      Person['email']
    }</div></td>
        <td class='delete'><button onClick='deleteForEachButton(${
          profileStore.length
        })'>Delete</button></td>
    </tr>`;
    table.innerHTML += html;
  }
  tickAll = $('.tick_all');
  tickList = $$('.tick input');
}

renderProfile();
handleUpdateProfile();

function renderAll() {
  const html = profileStore.map((item, index) => {
    return `<tr>
            <td class='tick'><input type='checkbox'></td>
            <td><div data-position='${index}-name'>${item['name']}</div></td>
            <td><div data-position='${index}-phone'>${item['phone']}</div></td>
            <td><div data-position='${index}-email'>${item['email']}</div></td>
            <td class='delete'><button onClick='deleteForEachButton(${
              index + 1
            })'>Delete</button></td>
        </tr>`;
  });
  table.innerHTML = html.join('');
  tickAll = $('.tick_all');
  tickList = $$('.tick input');
}

// eslint-disable-next-line no-unused-vars
function deleteForEachButton(id) {
  profileStore.splice(Number(id) - 1, 1);
  renderAll();
  handleUpdateProfile();
}

function handleUpdateProfile() {
  const listInfo = $$('table td div');
  listInfo.forEach((item) => {
    item.ondblclick = () => {
      const inputList = $('.change');
      if (inputList) {
        inputList.classList.remove('change');
      }
      item.classList.add('change');
      handleUpdateValue(item);
    };
  });
}

function handleUpdateValue(item) {
  const valueTemporary = item.textContent;
  let inputHTML = item.outerHTML.replaceAll('div', `input`);
  inputHTML = inputHTML.replace(valueTemporary, '');
  item.outerHTML = inputHTML;
  item = $('.change');
  item.value = valueTemporary;
  item.focus();
  item.style.cursor = 'text';
  item.onkeydown = (e) => {
    if (e.key === 'Enter' && e.keyCode === 13) {
      item.blur();
    }
  };

  item.onblur = (e) => {
    replaceInputToDiv(item);
  };
}

function showError(item, desc) {
  $(`form p.warning_${item}`).style.display = 'block';
  $(`form p.warning_${item} span`).textContent = desc;
  $(`.form_item input#${item}`).style.border = '1px solid red';
}

function hideError(item) {
  $(`form p.warning_${item}`).style.display = 'none';
  $(`.form_item input#${item}`).style.border = '1px solid black';
}

function validate(value, item, verify) {
  if (!verify.test(value)) {
    showError(item, `${item} không hợp lệ.`);
    return true;
  }
  hideError(item);
  return false;
}

function filterInputEmpty(Person) {
  return Object.keys(Person).filter((item) => {
    if (!Person[item]) {
      showError(item, `${item} không được bỏ trống`);
      return true;
    }
    hideError(item);
  });
}

function filterInputInvalid(Person) {
  return Object.keys(Person).filter((item) => {
    if (Person[item] && item === 'name') {
      return validate(Person[item], item, verifyName);
    }
    if (Person[item] && item === 'email') {
      return validate(Person[item], item, verifyEmail);
    }
    if (Person[item] && item === 'phone') {
      return validate(Person[item], item, verifyPhone);
    }
  });
}

function validateOnTable(value, item, verify, el) {
  if (!value) {
    alert(`${item} không được để trống.`);
    return false;
  }
  if (value && !verify.test(value)) {
    alert(`${item} không hợp lệ.`);
    return false;
  }
  return true;
}

function replaceInputToDiv(item) {
  const type = item.dataset.position.split('-')[1];
  let check = false;
  if (item.value && type === 'name') {
    check = validateOnTable(item.value, type, verifyName, item);
  }
  if (item.value && type === 'email') {
    check = validateOnTable(item.value, type, verifyEmail, item);
  }
  if (item.value && type === 'phone') {
    check = validateOnTable(item.value, type, verifyPhone, item);
  }
  if (check === true) {
    inputHTML = item.value;
    item.outerHTML = item.outerHTML.replaceAll('input', `div`);
    item = $('.change');
    item.textContent = inputHTML;
    item.ondblclick = () => {
      handleUpdateValue(item);
    };
  } else {
    setTimeout(() => {
      item.focus();
    }, 1000);
  }
}
