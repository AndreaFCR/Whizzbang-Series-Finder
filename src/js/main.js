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
      paintSeries();
      paintFavourites();
    });
};

// get data from api when the button is clicked and paint html
const handlerClickSearchButton = (ev) => {
  ev.preventDefault();
  getDataFromApi();
};

// paint data from array into html with or without image and listen seriesElements painted

const paintSeries = () => {
  let codeHTML = "";
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
  seriesContainer.innerHTML = codeHTML;
  addbackground();
  listenSeriesElements();
  listenResetBtn();
};

// add classes to articles if they are favourites or not
const addbackground = () => {
  for (let i = 0; i < series.length; i++) {
    const getElement = document.getElementById(`${series[i].id}`);

    if (favourites[i] !== undefined) {
      if (series[i].id === favourites[i].id) {
        getElement.classList.remove("serieBackground");
        getElement.classList.add("serieBackgroundSelected");
      }
    }

    // Nota: funciona solamente si eliminas desde el último al primero. creo que hay un error con los i... no es el mismo elemento [i] en series que en favourites. tengo que hacerlo con identificadores... o buscar una serie concreta en favoritos...pero cómo??
  }
};

// function to paint favourites list
const paintFavourites = () => {
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
    codeHTML += `<button class="favourite__btn js-btnDelete" id=${favourites[i].id}><i class="fa fa-window-close" aria-hidden="true"></i></<button>`;
    codeHTML += `</article>`;
  }
  const favContainer = document.querySelector(".js-favContainer");
  favContainer.innerHTML = codeHTML;

  listenResetBtn();
  listenSeriesElements();
};

// add serie to favourites when the button is clicked if it's not already inside, repaint favourites and add class element selected
const handlerClickSeriesElements = (ev) => {
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
  paintSeries();
};

// listen button search
const searchBtn = document.querySelector(".js-searchBtn");
searchBtn.addEventListener("click", handlerClickSearchButton);

// listen click in series element
const listenSeriesElements = () => {
  const seriesElements = document.querySelectorAll(".js-serie");
  for (let i = 0; i < seriesElements.length; i++) {
    seriesElements[i].addEventListener("click", handlerClickSeriesElements);
  }
};

//RESET ITEM OF FAVOURITES

//handler button reset

const handlerClickResetFavs = (ev) => {
  const buttonClickedId = parseInt(ev.currentTarget.id);
  const serieFavouriteIndex = favourites.findIndex(
    (favourite) => favourite.id === buttonClickedId
  );
  favourites.splice(serieFavouriteIndex, 1);

  updateLocalStorage();
  paintFavourites();
  paintSeries();
};

// listen button reset

const listenResetBtn = () => {
  const resetButtons = document.querySelectorAll(".js-btnDelete");
  for (let resetButton of resetButtons) {
    resetButton.addEventListener("click", handlerClickResetFavs);
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
