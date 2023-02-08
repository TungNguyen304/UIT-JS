const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const infoList = $$('.form_item input');
const addBtn = $('.action .add');
const deleteBtn = $('.action .delete');
const error = $('form>p');
const textError = $('form>p span');
const table = $('table');
const fullname = $('.form_item input#name');
const phone = $('.form_item input#phone');
const email = $('.form_item input#email');

const verifyEmail = /^\S+@([a-zA-Z]+\.)+[a-zA-z]{2,4}$/;
const verifyPhone = /^0[0-9]{9}$/;

let profileStore = [];
const headTable = `<tr>
<th><input type='checkbox'></th>
<th>Name</th>
<th>Phone</th>
<th>Email</th>
<th>Action</th>
</tr>`;

addBtn.onclick = (e) => {
  e.preventDefault();
  const Person = {
    name: fullname.value,
    phone: phone.value,
    email: email.value,
  };

  const validateEmpty = Object.keys(Person).filter((item) => {
    if (!Person[item]) {
      showError(item, `${item} không được bỏ trống`);
      return true;
    }
    hideError(item);
  });

  const validateValid = Object.keys(Person).filter((item) => {
    if (Person[item] && item === 'name') {
      return validate(Person[item], item);
    }
    if (Person[item] && item === 'email') {
      return validate(Person[item], item, verifyEmail);
    }
    if (Person[item] && item === 'phone') {
      return validate(Person[item], item, verifyPhone);
    }
  });
  if (validateEmpty.length === 0 && validateValid.length === 0) {
    profileStore.push(Person);
    renderProfile();
    infoList.forEach((item) => {
      item.value = '';
    });
    error.style.display = 'none';
    handleUpdateProfile();
  }
};

function renderProfile() {
  const html = profileStore.map((item, index) => {
    return `<tr>
            <td class='tick'><input type='checkbox'></td>
            <td><div data-position='${index}-name'>${item['name']}</div></td>
            <td><div data-position='${index}-phone'>${item['phone']}</div></td>
            <td><div data-position='${index}-email'>${item['email']}</div></td>
            <td class='delete'><button id=${index + 1}>Delete</button></td>
        </tr>`;
  });
  table.innerHTML = headTable + html.join('');
  const tickAll = $('tr th input');
  const tickList = $$('tr td input');
  const deleteList = $$('tr td button');
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
  deleteList.forEach((item) => {
    item.onclick = () => {
      profileStore.splice(Number(item.id) - 1, 1);
      renderProfile();
      handleUpdateProfile();
    };
  });

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
    renderProfile();
    handleUpdateProfile();
  };
}

renderProfile();
handleUpdateProfile();

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
  const b = item.textContent;
  let a = item.outerHTML.replaceAll('div', `input`);
  a = a.replace(b, '');
  item.outerHTML = a;
  item = $('.change');
  item.value = b;
  item.focus();
  item.style.cursor = 'text';
  item.onkeydown = (e) => {
    if (e.key === 'Enter' && e.keyCode === 13) {
      a = item.value;
      item.outerHTML = item.outerHTML.replaceAll('input', `div`);
      item = $('.change');
      item.textContent = a;
      item.ondblclick = () => {
        handleUpdateValue(item);
      };
    }
  };
  item.onblur = () => {
    a = item.value;
    item.outerHTML = item.outerHTML.replaceAll('input', `div`);
    item = $('.change');
    item.textContent = a;
    profileStore[Number(item.dataset.position.split('-')[0])][
      item.dataset.position.split('-')[1]
    ] = a;
    item.ondblclick = () => {
      handleUpdateValue(item);
    };
    handleUpdateProfile();
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

function validate(name, item, verify) {
  if ((!verify && name.length > 150) || (verify && !verify.test(name))) {
    showError(item, `${item} không hợp lệ.`);
    return true;
  }
  hideError(item);
  return false;
}
