# CoEditForm

The purpose of this project was to implementing a collaborative editing feature using ReactJS and ActionheroJS (or WebSocket).

CoEditForm is a simple HTML form powered by ReactJS which supports co-editing from multiple users real-time powered by ActionheroJS.

## To install:
(assuming you have [node](http://nodejs.org/) and NPM installed)

`npm install`

## Database:
This project uses [Redis](https://redis.io/download), please ensure you have it installed, and properly configured in `config/redis.js` or using environment variables `REDIS_HOST`, `REDIS_PORT`, `REDIS_DB`, and `REDIS_PASSWORD`.

## To Build:
`npm run build`

## To Run:
`npm start`

## To Dev:
`npm run dev`
