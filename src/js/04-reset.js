"use strict";
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

const resetAllFavourites = () => {
  favourites.splice(0, favourites.length);

  updateLocalStorage();
  paintFavourites();
  addBackgroundResetAll();
};

// listen button reset

const listenResetBtn = () => {
  const resetButtons = document.querySelectorAll(".js-btnDelete");
  for (let resetButton of resetButtons) {
    resetButton.addEventListener("click", resetFavourites);
  }
};

const listenResetAllBtn = () => {
  const resetAllBtn = document.querySelector(".js-btnDeleteAll");
  if (resetAllBtn !== null) {
    resetAllBtn.addEventListener("click", resetAllFavourites);
  }
};
