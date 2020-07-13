"use strict";

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
