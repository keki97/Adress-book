"use strict";

let addressBook = [];

const addBtn = document.querySelector(".add-person");
const addModal = document.querySelector(".form-container");
const toggleOverlay = document.querySelector(".form-overlay");
const closeModal = document.querySelector(".close");
const submitBtn = document.querySelector(".btn");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone-number");
const tableInput = document.querySelector(".table-body");
const tableEl = document.querySelector(".table");
const deleteAll = document.querySelector(".delete-all");
let html;
let x = 0;
// let deleteEl;

addBtn.addEventListener("click", function () {
  addModal.style.display = "block";
  toggleOverlay.style.display = "block";
});

closeModal.addEventListener("click", function () {
  addModal.style.display = "none";
  toggleOverlay.style.display = "none";
});

const insertHTML = function (el, i) {
  const html = `
  <tr id='${i}'>
    <td>${i + 1}</td>
    <td>${el.firstName}</td>
    <td>${el.lastName}</td>
    <td>${el.email}</td>
    <td>${el.phoneNumber}</td>
    <td><button class='edit-del-btn edit' data-id=${i}>Edit</button> <button class='edit-del-btn delete' data-id=${i}>Del</button></td>
  </tr>
`;

  tableInput.insertAdjacentHTML("beforeend", html);
};

const displayHTML = function () {
  for (let i = 0; i < addressBook.length; i++) {
    insertHTML(addressBook[i], i);
  }
};

const add = function (newPerson) {
  addressBook.push(newPerson);
  insertHTML(newPerson, addressBook.length - 1);
};

submitBtn.addEventListener("click", function () {
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

deleteAll.addEventListener("click", function () {
  tableInput.innerHTML = "";
  addressBook.splice(0, addressBook.length);
});
