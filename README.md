# BingeBox
BingeBox is a web application designed to simplify planning your movie by providing streamlined access to movie information and personalized suggestions.

### Features
- Movie details fetched from The Movie Database (TMDb).
- Clean and intuitive interface powered by dynamic JavaScript functionality.
- Customizable and scalable for future enhancements.

## Key Code Snippets
The project uses the following utility functions and constants to interact with the TMDb API:
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

