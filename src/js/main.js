"use strict";

// variables
const searchBtn = document.querySelector(".js-searchBtn");
const textInput = document.querySelector(".js-input");

// obtain URL
const createApiUrl = () => {
  const inputValue = textInput.value;
  const magicWord = inputValue.split(" ").join("+");
  const apiUrl = `http://api.tvmaze.com/search/shows?q=${magicWord}`;
  return apiUrl;
};

// evento cuando se pulsa el botón Buscar
const handlerClickSearchButton = (ev) => {
  ev.preventDefault();
  createApiUrl();

  // cuando obtenemos el valor del input es cuando se debe hacer el fetch

  //   console.log("me han clickado");
};

searchBtn.addEventListener("click", handlerClickSearchButton);
