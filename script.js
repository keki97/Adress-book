"use strict";

const addBtn = document.querySelector(".add-person");
const addModal = document.querySelector(".form-container");

addBtn.addEventListener("click", function () {
  addModal.style.display = "block";
});
