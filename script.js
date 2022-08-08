"use strict";

const addressBook = [];

const addBtn = document.querySelector(".add-person");
const addModal = document.querySelector(".form-container");
const closeModal = document.querySelector(".close");
const submitBtn = document.querySelector(".btn");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone-number");
const tableInput = document.querySelector(".table-body");
let html;

addBtn.addEventListener("click", function () {
  addModal.style.display = "block";
});

closeModal.addEventListener("click", function () {
  addModal.style.display = "none";
});

const insertHTML = function (el, i) {
  const html = `
  <tr>
    <td>${i + 1}</td>
    <td>${el.firstName}</td>
    <td>${el.lastName}</td>
    <td>${el.email}</td>
    <td>${el.phoneNumber}</td>
  </tr>
`;

  tableInput.insertAdjacentHTML("beforeend", html);
};

// const displayHTML = function () {
//   for (let i = 0; i < addressBook.length; i++) {
//     insertHTML(addressBook[i], i);
//   }
// };

const add = function (newPerson) {
  addressBook.push(newPerson);
  insertHTML(newPerson, addressBook.length - 1);
};

submitBtn.addEventListener("click", function () {
  addModal.style.display = "none";

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
