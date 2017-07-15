# Tweeter Project by Denny @ LightHouse Labs

Tweeter is a simple, single-page Twitter clone.

This is a full-stack web application built on Node, Express and MongoDB. 

It allows users to compose tweets and have them saved to a database.

## Final Project

!["Tweeter"](https://github.com/dennyhollick/tweetr/blob/master/docs/TweeterApp.png)

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above
- MongoDB
- Body-parser
- Chance
- MD5

## Features

- Allows users to compose a new tweet and save it
- Shows and hides compose tweet area
- Allows users to like a tweet only 1x per session.

## Known Issues

- Users can like a tweet more than once if they refresh their page or submit a new tweet. This will be fixed when session cookies are set up.
