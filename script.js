"use strict";

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

submitBtn.addEventListener("click", function () {
  const html = `
          <tr>  
            <td>${nameInput.value}</td>
            <td>${lastNameInput.value}</td>
            <td>${emailInput.value}</td>
            <td>${phoneInput.value}</td>
          </tr>
  `;

  tableInput.insertAdjacentHTML("beforeend", html);

  addModal.style.display = "none";

  nameInput.value = "";
  lastNameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
});
