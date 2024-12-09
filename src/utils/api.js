"use strict";

const api_key = "35c1d5d110f7f8753fcda624065e7631";
const imageBaseURL = "https://image.tmdb.org/t/p/";

/**
 * Fetch data from a server using the `url` and passes
 * the result in JSON data to a `callback` function,
 * along with an optional parameter if present.
 */
const fetchDataFromServer = function (url, callback, optionalParam) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data, optionalParam))
    .catch((error) => {
      console.error("Error fetching data from server:", error);
    });
};

export { imageBaseURL, api_key, fetchDataFromServer };
