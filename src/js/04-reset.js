//reset favourites when button reset is clicked in every card

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

//reset all favourite when the button reset all is clicked

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

// listen button reset all

const listenResetAllBtn = () => {
  const resetAllBtn = document.querySelector(".js-btnDeleteAll");
  if (resetAllBtn !== null) {
    resetAllBtn.addEventListener("click", resetAllFavourites);
  }
};
