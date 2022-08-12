"use strict";

let addressBook = [];
let html;
let x = 0;

const addBtn = document.querySelector(".add-person");
const addModal = document.querySelector(".form-container");
const toggleOverlay = document.querySelector(".form-overlay");
const form = document.querySelector(".form");
const addEditModal = document.querySelector(".edit-form-container");
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
});

const close = function () {
  addModal.style.display = "none";
  toggleOverlay.style.display = "none";
  addEditModal.style.display = "none";
};

closeModal.forEach((el) => el.addEventListener("click", close));

toggleOverlay.addEventListener("click", close);

// Add Person

const insertHTML = function (el, i) {
  const html = `
  <tr id='${i}'>
    <td id='id-${i}'>${i + 1}</td>
    <td id='first-name-${i}'>${el.firstName}</td>
    <td id='last-name-${i}'>${el.lastName}</td>
    <td id='email-${i}'>${el.email}</td>
    <td id='phone-${i}'>${el.phoneNumber}</td>
    <td><button class='edit-del-btn edit' data-id=${i}>Edit</button> <button class='edit-del-btn delete' data-id=${i}>Del</button></td>
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

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
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
    console.log(addressBook);
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
  }
  saveEdit.addEventListener("click", function (e) {
    // e.preventDefault();
    console.log(e);
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

if (nameInput.value.length >= 3 && nameInput.value.length <= 20) {
} else {
}

if (lastNameInput.value.length >= 3 && nameInput.value.length <= 20) {
} else {
}
