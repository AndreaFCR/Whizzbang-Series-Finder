"use strict";

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

const addBackgroundResetAll = () => {
  for (const serie of series) {
    let getElement = document.getElementById(serie.id);
    getElement.classList.remove("serieBackgroundSelected");
    getElement.classList.add("serieBackground");
  }
};
