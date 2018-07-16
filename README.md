# X-Press Comics

A RESTful API containing all of the routing and database logic for an internal management tool for an imaginary comic book publishing company called X-Press Comics.

## Features 

The X-Press Comics internal management tool allows users to:

* Create, view, and update artists
* Create, view, update, and delete comic book series
* Create, view, update, and delete issues of a specific comic book series

## API Endpoint Documentation

/api/artists

* GET
  * Returns a 200 response containing all saved currently-employed artists (is_currently_employed is equal to 1) on the artists property of the response body
* POST
  * Creates a new artist with the information from the artist property of the request body and saves it to the database. Returns a 201 response with the newly-created artist on the artist property of the response body
  * If any required fields are missing, returns a 400 response

/api/artists/:artistId

* GET
  * Returns a 200 response containing the artist with the supplied artist ID on the artist property of the response body
  * If an artist with the supplied artist ID doesn't exist, returns a 404 response
* PUT
  * Updates the artist with the specified artist ID using the information from the artist property of the request body and saves it to the database. Returns a 200 response with the updated artist on the artist property of the response body
  * If any required fields are missing, returns a 400 response
  * If an artist with the supplied artist ID doesn't exist, returns a 404 response
* DELETE
  * Updates the artist with the specified artist ID to be unemployed (is_currently_employed equal to 0). Returns a 200 response
  * If an artist with the supplied artist ID doesn't exist, returns a 404 response

/api/series

* GET
  * Returns a 200 response containing all saved series on the series property of the response body
* POST
  * Creates a new series with the information from the series property of the request body and saves it to the database. Returns a 201 response with the newly-created series on the series property of the response body
  * If any required fields are missing, returns a 400 response

/api/series/:seriesId

* GET
  * Returns a 200 response containing the series with the supplied series ID on the series property of the response body
  * If a series with the supplied series ID doesn't exist, returns a 404 response
* PUT
  * Updates the series with the specified series ID using the information from the series property of the request body and saves it to the database. Returns a 200 response with the updated series on the series property of the response body
  * If any required fields are missing, returns a 400 response
  * If a series with the supplied series ID doesn't exist, returns a 404 response
* DELETE
  * Deletes the series with the supplied series ID from the database if that series has no related issues. Returns a 204 response
  * If the series with the supplied series ID has related issues, returns a 400 response
  * If a series with the supplied series ID doesn't exist, returns a 404 response

/api/series/:seriesId/issues

* GET
  * Returns a 200 response containing all saved issues related to the series with the supplied series ID on the issues property of the response body
  * If a series with the supplied series ID doesn't exist, returns a 404 response
* POST
  * Creates a new issue, related to the series with the supplied series ID, with the information from the issue property of the request body and saves it to the database. Returns a 201 response with the newly-created issue on the issue property of the response body
  * If any required fields are missing or an artist with the supplied artist ID doesn't exist, returns a 400 response
  * If a series with the supplied series ID doesn't exist, returns a 404 response

/api/series/:seriesId/issues/:issueId

* GET
  * Returns a 200 response containing the issue with the supplied issue ID on the issue property of the response body
  * If an issue with the supplied issue ID doesn't exist, returns a 404 response
* PUT
  * Updates the issue with the specified issue ID using the information from the issue property of the request body and saves it to the database. Returns a 200 response with the updated issue on the issue property of the response body
  * If any required fields are missing, returns a 400 response
  * If a series with the supplied series ID doesn't exist, returns a 404 response
  * If an issue with the supplied issue ID doesn't exist, returns a 404 response
* DELETE
  * Deletes the issue with the supplied issue ID from the database. Returns a 204 response
  * If a series with the supplied series ID doesn't exist, returns a 404 response
  * If an issue with the supplied issue ID doesn't exist, returns a 404 response