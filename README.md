# DartMap
[![Build Status](https://travis-ci.com/dartmouth-cs98/project-dartmap.svg?token=MfvWRyTukvTZt4fDnPCv&branch=master)](https://travis-ci.com/dartmouth-cs98/project-dartmap)

## High-level project description

Dartmap is a web service that displays campus events visually on a map. Our vision is for this web service to be the go-to destination for finding events, including filtering by time, location, and group. We hope to take advantage of the unique characteristics of a map, for example, by incorporating a visual display of where people are.

You can use Dartmap at: dartmouth-cs98.github.io/project-dartmap

Note: this is only the front-end code. For the back-end code, go to https://github.com/dartmouth-cs98/project-dartmap-api

## Mocks

![](./images/dartmap_mock.png?raw=true)

## Architecture

We use the React framework for the frontend. The primary frontend components are the Google Map, the filter (e.g., for time filtering), the event list sidebar, and a dialogue for adding events.

We use google-map-react for the Google Maps API, drawing from an example found here: http://istarkov.github.io/google-map-react/map/balderdash/.

## Setup

We recommend using homebrew to install npm. Steps to setup up a local repository:
1) Fork the dartmap github repository
2) Clone the forked repository locally
3) Run: `npm install`

## Deployment

Run `npm start` and open a browser window to localhost:8080.

## Deployment

Run `npm run lint` before committing or submitting any code, to catch style errors. Run `npm install` if any new packages are added in another branch.

## Authors

### Front-end Developers:
* Eric Chen
* Danielle Midulla
* Sean Cann

### Back-end Developers:
* Edrei Chua
* Junmo (Caleb) Kim
* Chi Pham

## Acknowledgments
