# A learning project from freeCodeCamp

The goal of this project is to make a URL shortening service.
It uses a mongoDB cluster to store the URLs with a number ID assigned to it.
To assure that each number is unique I used Date().valueOf() to generate a unique number assigned to each url.

Once you enter your url, the server will respond with a json file displaying the original url and its corresponding number id. If you navigate to /api/<number> you will be redirected to the proper web page.


# URL Shortener Microservice

This is the boilerplate code for the URL Shortener Microservice project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice.
