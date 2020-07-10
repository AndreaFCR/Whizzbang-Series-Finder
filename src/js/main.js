"use strict";

// variables arrays
let series = [];
let favourites = [];

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
    });
};

// function to paint data from array into html with or without image and function listen serieElements
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
  listenSeriesElements();
};

// function to paint favourites list
const paintFavourites = () => {
  console.log("me van a pintar", favourites);
  let codeHTML = "";
  for (let i = 0; i < favourites.length; i++) {
    codeHTML += `<article class="favourite js-favourite" id=${favourites[i].id}>`;
    if (favourites[i].image !== null) {
      codeHTML += `<img src="${favourites[i].image.medium}" 
        class="favourite__img" alt="Foto de la serie ${favourites[i].name}"/>`;
    } else {
      codeHTML += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" 
        class="favourite__img" alt="Foto de la serie ${favourites[i].name}"/>`;
    }
    codeHTML += `<h3 class="favourite__title">${favourites[i].name}</h3>`;
    codeHTML += `</article>`;
  }
  const favContainer = document.querySelector(".js-favContainer");
  favContainer.innerHTML = codeHTML;
};

// handler funtion for button Search
const handlerClickSearchButton = (ev) => {
  ev.preventDefault();
  getDataFromApi();
};

// handler fucntion for click series element
const handlerClickSeriesElements = (ev) => {
  for (let i = 0; i < series.length; i++) {
    if (parseInt(ev.currentTarget.id) === series[i].id) {
      favourites.push(series[i]);
    }
  }
  paintFavourites();
};

// listeners
const searchBtn = document.querySelector(".js-searchBtn");
searchBtn.addEventListener("click", handlerClickSearchButton);

const listenSeriesElements = () => {
  const seriesElements = document.querySelectorAll(".js-serie");
  for (let i = 0; i < seriesElements.length; i++) {
    seriesElements[i].addEventListener("click", handlerClickSeriesElements);
  }
};
