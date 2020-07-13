"use strict";

// add serie to favourites when the button is clicked if it's not already inside. If you clicked again delete it from favourites
const saveFavourites = (ev) => {
  const serieClickedId = parseInt(ev.currentTarget.id);

  const serieSelected = series.find((serie) => serie.id === serieClickedId);
  const serieFavourite = favourites.find(
    (favourite) => favourite.id === serieClickedId
  );
  const serieFavouriteIndex = favourites.findIndex(
    (favourite) => favourite.id === serieClickedId
  );

  if (serieFavourite === undefined) {
    favourites.push(serieSelected);
    addBackgroundFavourite(ev);
  } else {
    favourites.splice(serieFavouriteIndex, 1);
    addBackgroundNormal(ev);
  }

  updateLocalStorage();
  paintFavourites();
};

// listen click in series element
const listenSeriesElements = () => {
  const seriesElements = document.querySelectorAll(".js-serie");
  for (let i = 0; i < seriesElements.length; i++) {
    seriesElements[i].addEventListener("click", saveFavourites);
  }
};
