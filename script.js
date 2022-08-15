"use strict";

let addressBook = [];
let html;
let x = 0;

const addBtn = document.querySelector(".add-person");
const addModal = document.querySelector(".form-container");
const toggleOverlay = document.querySelector(".form-overlay");
const form = document.querySelector(".form");
const addEditModal = document.querySelector(".edit-form-container");
const editForm = document.querySelector(".form-edit");
const closeModal = document.querySelectorAll(".close");
const submitBtn = document.querySelector(".btn-submit");
const tableEl = document.querySelector(".table");
const tableInput = document.querySelector(".table-body");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone-number");
const deleteAll = document.querySelector(".delete-all");

addBtn.addEventListener("click", function () {
  addModal.style.display = "block";
  toggleOverlay.style.display = "block";
  document.body.style.overflow = "hidden";
});

const close = function () {
  addModal.style.display = "none";
  toggleOverlay.style.display = "none";
  addEditModal.style.display = "none";
  document.body.style.overflow = "auto";
};

closeModal.forEach((el) => el.addEventListener("click", close));

toggleOverlay.addEventListener("click", close);

const isEmail = function (email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

const isPhoneNumber = function (phone) {
  return /^(\+\d{1,3}\s)?\(?\d{2,3}\)?[\s-]\d{3}[\s-]\d{3,4}$/.test(phone);
};

// Add Person

const insertHTML = function (el, i) {
  const html = `
  <tr id='${i}'>
    <td data-label='ID' id='id-${i}'>${i + 1}</td>
    <td data-label='Name' id='first-name-${i}'>${el.firstName}</td>
    <td data-label='Last Name' id='last-name-${i}'>${el.lastName}</td>
    <td data-label='Email' id='email-${i}'>${el.email}</td>
    <td data-label='Phone' id='phone-${i}'>${el.phoneNumber}</td>
    <td data-label='Edit/Delete'><button class='edit-del-btn edit' data-id=${i}>Edit</button> <button class='edit-del-btn delete' data-id=${i}>Del</button></td>
  </tr>
`;
  tableInput.insertAdjacentHTML("beforeend", html);
};

const add = function (newPerson) {
  addressBook.push(newPerson);
  insertHTML(newPerson, addressBook.length - 1);
};

const displayHTML = function () {
  for (let i = 0; i < addressBook.length; i++) {
    insertHTML(addressBook[i], i);
  }
};

// Submit changes

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkInputs();
  document.body.style.overflow = "auto";
});

// Local Storage

function setLocalStorage() {
  localStorage.addressBook = JSON.stringify(addressBook);
}

window.addEventListener("beforeunload", setLocalStorage);

window.addEventListener("load", function () {
  if (localStorage.addressBook) {
    addressBook = JSON.parse(localStorage.addressBook);
    displayHTML();
  }
});

// Delete table row

tableEl.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("delete")) {
    const id = e.target.getAttribute("data-id");
    addressBook.splice(id, 1);
    tableInput.innerHTML = "";
    displayHTML();
  }
});

// Delete table body

deleteAll.addEventListener("click", function () {
  tableInput.innerHTML = "";
  addressBook.splice(0, addressBook.length);
});

// Edit table

const nameEdit = document.getElementById("edit-name");
const lastNameEdit = document.getElementById("edit-last-name");
const emailEdit = document.getElementById("edit-email");
const phoneEdit = document.getElementById("edit-phone-number");
const saveEdit = document.querySelector(".btn-edit");

tableEl.addEventListener("click", function (e) {
  e.preventDefault();
  let id;
  if (e.target.classList.contains("edit")) {
    id = e.target.getAttribute("data-id");

    addEditModal.style.display = "block";
    toggleOverlay.style.display = "block";
    nameEdit.value = document.getElementById("first-name-" + id).textContent;
    lastNameEdit.value = document.getElementById("last-name-" + id).textContent;
    emailEdit.value = document.getElementById("email-" + id).textContent;
    phoneEdit.value = document.getElementById("phone-" + id).textContent;
    document.body.style.overflow = "hidden";
  }
  editForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // checkEditInputs();
    addressBook[id].firstName = document.getElementById(
      "first-name-" + id
    ).textContent = nameEdit.value;
    addressBook[id].lastName = document.getElementById(
      "last-name-" + id
    ).textContent = lastNameEdit.value;
    addressBook[id].email = document.getElementById("email-" + id).textContent =
      emailEdit.value;
    addressBook[id].phoneNumber = document.getElementById(
      "phone-" + id
    ).textContent = phoneEdit.value;
    close();
    window.location.reload();
  });
});

// FORM VALIDATION

const checkInputs = function () {
  const nameValue = nameInput.value.trim();
  const lastNameValue = lastNameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const phoneNumberValue = phoneInput.value.trim();
  const nameErrorMessage = document.getElementById("name-error");
  const lastNameErrorMessage = document.getElementById("last-name-error");
  const emailErrorMessage = document.getElementById("email-error");
  const phoneErrorMessage = document.getElementById("phone-error");

  if (nameValue.length < 3 || nameValue.length > 20) {
    nameErrorMessage.textContent =
      "Name needs to have between 3 and 20 characters";
    nameInput.classList.add("error-input");
  } else {
    nameErrorMessage.textContent = "";
  }

  if (lastNameValue.length < 3 || lastNameValue.length > 20) {
    lastNameErrorMessage.textContent =
      "Last name needs to have between 3 and 20 characters";
  } else {
    lastNameErrorMessage.textContent = "";
  }

  if (emailValue === "") {
    emailErrorMessage.textContent = "Email cannot be empty";
  } else if (!isEmail(emailValue)) {
    emailErrorMessage.textContent = "Email is not valid";
  } else {
    emailErrorMessage.textContent = "";
  }

  if (phoneNumberValue === "") {
    phoneErrorMessage.textContent = "Phone number cannot be empty";
  } else if (!isPhoneNumber(phoneNumberValue)) {
    phoneErrorMessage.textContent =
      "Phone number is not valid. Try: +### ## ### ### or ### ### ### ";
  } else {
    phoneErrorMessage.textContent = "";
  }

  if (
    nameErrorMessage.textContent === "" &&
    lastNameErrorMessage.textContent === "" &&
    emailErrorMessage.textContent === "" &&
    phoneErrorMessage.textContent === ""
  ) {
    addModal.style.display = "none";
    toggleOverlay.style.display = "none";

    const newPerson = {
      firstName: nameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
      phoneNumber: phoneInput.value,
    };

    add(newPerson);

    nameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
  }
};

// const checkEditInputs = function () {
//   const nameValue = nameEdit.value.trim();
//   const lastNameValue = lastNameEdit.value.trim();
//   const emailValue = emailEdit.value.trim();
//   const phoneNumberValue = phoneEdit.value.trim();
//   const nameErrorMessage = document.getElementById("name-error-edit");
//   const lastNameErrorMessage = document.getElementById("last-name-error-edit");
//   const emailErrorMessage = document.getElementById("email-error-edit");
//   const phoneErrorMessage = document.getElementById("phone-error-edit");

//   if (nameValue.length < 3 || nameValue.length > 20) {
//     nameErrorMessage.textContent =
//       "Name needs to have between 3 and 20 characters";
//     nameInput.classList.add("error-input");
//   } else {
//     nameErrorMessage.textContent = "";
//   }

//   if (lastNameValue.length < 3 || lastNameValue.length > 20) {
//     lastNameErrorMessage.textContent =
//       "Last name needs to have between 3 and 20 characters";
//   } else {
//     lastNameErrorMessage.textContent = "";
//   }

//   if (emailValue === "") {
//     emailErrorMessage.textContent = "Email cannot be empty";
//   } else if (!isEmail(emailValue)) {
//     emailErrorMessage.textContent = "Email is not valid";
//   } else {
//     emailErrorMessage.textContent = "";
//   }

//   if (phoneNumberValue === "") {
//     phoneErrorMessage.textContent = "Phone number cannot be empty";
//   } else if (!isPhoneNumber(phoneNumberValue)) {
//     phoneErrorMessage.textContent =
//       "Phone number is not valid. Try: +### ## ### ### or ### ### ### ";
//   } else {
//     phoneErrorMessage.textContent = "";
//   }

//   if (
//     nameErrorMessage.textContent === "" &&
//     lastNameErrorMessage.textContent === "" &&
//     emailErrorMessage.textContent === "" &&
//     phoneErrorMessage.textContent === ""
//   ) {
//     addressBook[id].firstName = document.getElementById(
//       "first-name-" + id
//     ).textContent = nameEdit.value;
//     addressBook[id].lastName = document.getElementById(
//       "last-name-" + id
//     ).textContent = lastNameEdit.value;
//     addressBook[id].email = document.getElementById("email-" + id).textContent =
//       emailEdit.value;
//     addressBook[id].phoneNumber = document.getElementById(
//       "phone-" + id
//     ).textContent = phoneEdit.value;
//     close();
//     window.location.reload();
//   }
// };
