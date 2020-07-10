"use strict";

// variables arrays
let series = [];
let favorites = [];

// create api URL from input value
const textInput = document.querySelector(".js-input");
const createApiUrl = () => {
  const inputValue = textInput.value;
  const magicWord = inputValue.split(" ").join("+"); //no se puede usar trim(), necesitamos +
  const apiUrl = `http://api.tvmaze.com/search/shows?q=${magicWord}`;
  return apiUrl;
};

// obtain data from api, reset array series and paint in HTML
const getDataFromApi = () => {
  createApiUrl();
  fetch(createApiUrl())
    .then((response) => response.json())
    .then((data) => {
      series = [];
      for (let i = 0; i < data.length; i++) {
        series.push(data[i].show);
      }
      paintSeries();
      listenSerieElement();
    });
};

// function to paint data from array into html with or without image
const paintSeries = () => {
  let codeHTML = "";
  for (let i = 0; i < series.length; i++) {
    codeHTML += `<article class="serie serieBackground js-serie" id=${series[i].id}>`;
    if (series[i].image !== null) {
      codeHTML += `<img src="${series[i].image.medium}" 
        class="serie__img" alt="Foto de la serie ${series[i].name}"/>`;
    } else {
      codeHTML += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" 
        class="serie__img" alt="Foto de la serie ${series[i].name}"/>`;
    }
    codeHTML += `<h3 class="serie__title">${series[i].name}</h3>`;
    codeHTML += `</article>`;
  }

  const seriesContainer = document.querySelector(".js-searchContainer");
  seriesContainer.innerHTML = codeHTML;
};

// handler funtion for button Search
const handlerClickSearchButton = (ev) => {
  ev.preventDefault();
  getDataFromApi();
};

const handlerClickSerieElement = (ev) => {
  // console.log("me han clickado");
  console.log(ev.currentTarget);
};

// listeners
const searchBtn = document.querySelector(".js-searchBtn");
searchBtn.addEventListener("click", handlerClickSearchButton);

const listenSerieElement = () => {
  const serieElement = document.querySelectorAll(".js-serie");
  for (let i = 0; i < serieElement.length; i++) {
    serieElement[i].addEventListener("click", handlerClickSerieElement);
  }
};
