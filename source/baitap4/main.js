const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const upload = $(".upload input");
const uploadButton = $(".upload");
const avt = $(".upload img");
const desc = $(".upload p");
const infoList = $$(".form_item input");
const addBtn = $(".action .add");
const resetBtn = $(".action .reset");
const infoListShow = $$(".info_item span");
const avtShow = $(".screen_avt img");
const descShow = $(".screen_avt p");
const error = $("form>p");
const textError = $("form>p span");

let url = "";
const verifyEmail = /^\S+@([a-zA-Z]+\.)+[a-zA-z]{2,4}$/;
const verifyPhone = /^0[0-9]{9}$/;
const verifyBirthday = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
const verifyPass =
  /^[a-zA-Z](?=.*[a-z])(?=.[A-Z]*)(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,29}$/;
const verifyName = /^[a-zA-z\s]{3,150}$/;

uploadButton.onclick = () => {
  upload.click();
};

upload.onchange = (e) => {
  url = URL.createObjectURL(e.target.files[0]);
  uploadButton.style.border = "1px solid black";
  avt.src = url;
  desc.style.display = "none";
};

addBtn.onclick = (e) => {
  e.preventDefault();
  let warning = "Xin hãy nhập đầy đủ thông tin!";
  const Person = {
    fullname: infoList[0].value,
    email: infoList[1].value,
    phone: infoList[2].value,
    birthday: infoList[3].value,
    password: infoList[4].value,
    confirm: infoList[5].value,
  };

  const validate = Object.keys(Person).every((item) => {
    if (!Person[item]) {
      return false;
    }
    return true;
  });

  infoList.forEach((item) => {
    if (!validate && !item.value) {
      item.style.border = "1px solid red";
    } else {
      item.style.border = "1px solid black";
    }
  });

  const validate1 =
    validate &&
    Object.keys(Person).every((item) => {
      if (item === "fullname") {
        if (!verifyName.test(Person[item])) {
          warning = "Full name không hợp lệ.";
          return false;
        }
      } else {
        if (item === "email") {
          if (!verifyEmail.test(Person[item])) {
            warning = "Email không hợp lệ.";
            return false;
          }
        } else {
          if (item === "phone") {
            if (!verifyPhone.test(Person[item])) {
              warning = "Phone không hợp lệ.";
              return false;
            }
          } else {
            if (item === "birthday") {
              if (!verifyBirthday.test(Person[item])) {
                warning = "Birthday phải có dạng dd/mm/YYYY.";
                return false;
              }
            } else {
              if (item === "password") {
                if (!verifyPass.test(Person[item])) {
                  warning =
                    "Password: 8-30 kí tự, bắt đầu bằng chữ cái, có chứa kí tự đặc biệt, số, chữ viết hoa.";
                  return false;
                }
              } else {
                if (Person[item] !== Person["password"]) {
                  warning = "Confirm password không khớp.";
                  return false;
                }
              }
            }
          }
        }
      }
      return true;
    });

  const validate2 = validate1
    ? (function () {
        if (!upload.files[0]) {
          warning = "Chọn avt trước khi add.";
          uploadButton.style.border = "1px solid red";
          return false;
        }
        return true;
      })()
    : false;
0899852441
  if (validate2) {
    Object.keys(Person).forEach((item, index) => {
      if (infoListShow[index]) {
        if(item === "fullname") {
            let listName = Person[item].split(" ")
            listName = listName.map((i, index) => {
                const name = i.toLowerCase()
                return name.replace(name[0], name.charAt(0).toUpperCase())
            })
            infoListShow[index].textContent = listName.join(" "); 
        } else {
            if (item === "phone") {
                infoListShow[index].textContent = Person[item].slice(0, 3) + '-' + Person[item].slice(3, 6) + '-' + Person[item].slice(6);
            } else {
                infoListShow[index].textContent = Person[item];
            }
        }
      }
      infoList[index].value = "";
    });
    avt.src = "";
    desc.style.display = "unset";
    if (url) {
      avtShow.src = url;
    }
    upload.value = null;
    error.style.display = "none";
  } else {
    textError.textContent = warning;
    error.style.display = "block";
  }
};

resetBtn.onclick = () => {
  infoList.forEach((item, index) => {
    if (infoListShow[index]) {
      infoListShow[index].textContent = "";
    }
    item.value = "";
  });
  avt.src = "";
  desc.style.display = "unset";
  avtShow.src = "";
  descShow.style.display = "unset";
  upload.value = null;
  error.style.display = "none";
  infoList.forEach((item) => {
    item.style.border = "1px solid black";
  });
  uploadButton.style.border = "1px solid black";
};
