"use strict";

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
    codeHTML += `<h2 class="title">Series favoritas `;
    codeHTML += `<span class="btnAll js-btnDeleteAll"}><i class="fa fa-window-close" aria-hidden="true"></i></<span></h2>`;
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

  addBackgroundSearch();
  listenResetBtn();
  listenResetAllBtn();
  listenSeriesElements();
};
