"use strict";

// variables arrays
let series = [];
let favourites = [];

// create api URL from input value
const textInput = document.querySelector(".js-input");
const createApiUrl = () => {
  const inputValue = textInput.value;
  const apiUrl = `http://api.tvmaze.com/search/shows?q=${inputValue}`;
  return apiUrl;
};

// obtain data from api, reset series array and keep it in series array and paint in html.
const getDataFromApi = () => {
  fetch(createApiUrl())
    .then((response) => response.json())
    .then((data) => {
      series = [];
      const addSeriesResult = (item) => series.push(item.show);
      data.map(addSeriesResult);
    });
};

//obtain value from input and serch for series before painting
textInput.addEventListener("keyup", getDataFromApi);

// get data from api when the button is clicked and paint html
const searchSeries = (ev) => {
  ev.preventDefault();
  paintSeries();
  paintFavourites();
  addBackgroundSearch();
};

// paint data from array into html with or without image and listen seriesElements painted

const paintSeries = () => {
  let codeHTML = "";
  let titleHTML = `<h2>Resultados de la búsqueda:</h2>`;
  for (let i = 0; i < series.length; i++) {
    codeHTML += `<article class="serie serieBackground js-serie " id=${series[i].id}>`;
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
  const searchTitleContainer = document.querySelector(".js-searchTitle");

  seriesContainer.innerHTML = codeHTML;
  if (series.length !== 0) {
    searchTitleContainer.innerHTML = titleHTML;
  }

  listenSeriesElements();
};

// function to paint favourites list
const paintFavourites = () => {
  let codeHTML = "";
  if (favourites.length !== 0) {
    codeHTML += `<h2 class="favourite__title">Series favoritas</h2>`;
  }

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
    codeHTML += `<div class="favourite__btn js-btnDelete" id=${favourites[i].id}><i class="fa fa-window-close" aria-hidden="true"></i></<div>`;
    codeHTML += `</article>`;
  }

  const favContainer = document.querySelector(".js-favContainer");
  favContainer.innerHTML = codeHTML;

  listenResetBtn();
  listenSeriesElements();
};

// add serie to favourites when the button is clicked if it's not already inside, repaint favourites and add class element selected
const saveFavourites = (ev) => {
  const serieClickedId = parseInt(ev.currentTarget.id);

  const serieSelected = series.find((serie) => serie.id === serieClickedId);
  const serieFavourite = favourites.find(
    (favourite) => favourite.id === serieClickedId
  );

  if (serieFavourite === undefined) {
    favourites.push(serieSelected);
  }

  updateLocalStorage();
  paintFavourites();
  addBackgroundFavourite(ev);
};

// add background color for favourite series

const addBackgroundSearch = () => {
  for (const serie of series) {
    for (const item of favourites) {
      let getElement = document.getElementById(serie.id);
      let favouriteId = item.id;
      if (serie.id === favouriteId) {
        getElement.classList.add("serieBackgroundSelected");
        getElement.classList.remove("serieBackground");
      }
    }
  }
};

const addBackgroundFavourite = (ev) => {
  const getElement = document.getElementById(ev.currentTarget.id);
  getElement.classList.add("serieBackgroundSelected");
  getElement.classList.remove("serieBackground");
};

const addBackgroundNormal = (ev) => {
  const getElement = document.getElementById(ev.currentTarget.id);
  getElement.classList.add("serieBackground");
  getElement.classList.remove("serieBackgroundSelected");
};

// listen button search
const searchBtn = document.querySelector(".js-searchBtn");
searchBtn.addEventListener("click", searchSeries);

// listen click in series element
const listenSeriesElements = () => {
  const seriesElements = document.querySelectorAll(".js-serie");
  for (let i = 0; i < seriesElements.length; i++) {
    seriesElements[i].addEventListener("click", saveFavourites);
  }
};

//RESET ITEM OF FAVOURITES

//handler button reset

const resetFavourites = (ev) => {
  const buttonClickedId = parseInt(ev.currentTarget.id);
  const serieFavouriteIndex = favourites.findIndex(
    (favourite) => favourite.id === buttonClickedId
  );
  favourites.splice(serieFavouriteIndex, 1);

  updateLocalStorage();
  paintFavourites();
  addBackgroundNormal(ev);
};

// listen button reset

const listenResetBtn = () => {
  const resetButtons = document.querySelectorAll(".js-btnDelete");
  for (let resetButton of resetButtons) {
    resetButton.addEventListener("click", resetFavourites);
  }
};

// función para guardar en el local storage
const updateLocalStorage = () => {
  localStorage.setItem("favourites", JSON.stringify(favourites));
};

const getFromLocalStorage = () => {
  const localData = JSON.parse(localStorage.getItem("favourites"));
  if (localData !== null) {
    favourites = localData;
  }
};

getFromLocalStorage();
paintFavourites();
