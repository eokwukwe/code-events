## code-events

## Description

**code-events** is a web application for developers to create events for others developers to attend.

## Table of Contents

- [Features](#features)
- [Setup](#setup)
- [Contribute](#contribute)
- [Deployment](#deployment)
- [License](#license)

## Setup

### Dependencies

- [NodeJS](https://github.com/nodejs/node) - A JavaScript runtime environment
- [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Firebase](https://firebase.google.com/) - A Google's mobile platform that helps you quickly develop high-quality apps and grow your business.
- [Google Cloud Functions](https://cloud.google.com/functions) - Google Cloud's event-driven serverless compute platform.

### Getting Started

Follow these steps to set up the project in development mode

- Install [Nodejs](https://nodejs.org/en/download/)
- Install the Firebase CLI by running `npm install -g firebase-tools` or `yarn install -g firebase-tools` in the terminal
- Login to the firebase SDK by running `firebase login` in the terminal
- Clone the repository by running the command

  ```[bash]
  git clone https://github.com/eokwukwe/code-events.git
  ```

- Run `cd code-events` to enter the application's directory
- Install the application's dependencies by running the command `npm install` or `yarn install`
- Go to `https://console.firebase.google.com` and create an app with name `code-events` or chose your preferred name
- Replace the configuration details in the `src/app/config/firebase.js` file with your configuration details
- Start the application by running `npm install` or `yarn install`
  The application should now be running at `http://localhost:3000`

## Deployment

App is deployed on firebase

## License
**MIT**
