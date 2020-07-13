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

// obtain data from api, reset series array and keep it in series array.
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

// get data from api when the button is clicked, paint and add background
const searchSeries = (ev) => {
  ev.preventDefault();
  paintSeries();
  paintFavourites();
};

// listen button search
const searchBtn = document.querySelector(".js-searchBtn");
searchBtn.addEventListener("click", searchSeries);
