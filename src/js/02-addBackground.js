"use strict";

// add background color for favourite series when the button search is clicked

const addBackgroundSearch = () => {
  for (const serie of series) {
    for (const item of favourites) {
      let getElement = document.getElementById(serie.id);
      let favouriteId = item.id;
      if (serie.id === favouriteId) {
        getElement.classList.add("serieBackgroundSelected");
      }
    }
  }
};

// add background color for favourite series when serie element is clicked
const addBackgroundFavourite = (ev) => {
  const getElement = document.getElementById(ev.currentTarget.id);
  getElement.classList.add("serieBackgroundSelected");
};

// add background color for favourite series when reset button is clicked
const addBackgroundNormal = (ev) => {
  const getElement = document.getElementById(ev.currentTarget.id);

  getElement.classList.remove("serieBackgroundSelected");
};

// add background color for favourite series when reset button all is clicked
const addBackgroundResetAll = () => {
  for (const serie of series) {
    let getElement = document.getElementById(serie.id);
    getElement.classList.remove("serieBackgroundSelected");
  }
};
