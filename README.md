# Social-Network-API

## Description

I have created an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.

## Table of Contents

  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)

## Installation

This application uses node.js to run. Please make sure you have it installed before trying to run the application. You can find a link to node.js [here](https://nodejs.org/en).

This application uses npm packages Express.js for running the server, and mongoose to structure the database. These packages have already been loaded into the dependencies of the package.json file.

To run the application:
1. Right click the server.js file and click 'open in integrated terminal' or if you code editor does not have this function then you can use your terminal and make sure you are giving it the right file path.
2. Type `npm install` into the terminal to load in the npm packages.
3. Type `npm start` to start the server.

As this application is run purely on the backend you will need to use a program like Insomnia to run the queries.

## Usage

Once you start the server, `npm start`, you can use a program like Insomnia to run the various queries. 

* /api/users
    * GET all users
    * GET a single user by its _id and populated thought and friend data (/:userId)
    * POST a new user
    * PUT to update a user by its _id (/:userId)
    * DELETE to remove user by its _id, and their associated thoughts (/:userId)

* /api/users/:userId/friends/:friendId
    * POST to add a new friend to a user's friend list
    * DELETE to remove a friend from a user's friend list

    ![GET all users, showing frind count](./images/GET%20all%20users.png)

* /api/thoughts
    * GET to get all thoughts
    * GET to get a single thought by its _id (/:thoughtId)
    * POST to create a new thought
    * PUT to update a thought by its _id (/:thoughtId)
    * DELETE to remove a thought by its _id (/:thoughtId)

* /api/thoughts/:thoughtId/reactions
    * POST to create a reaction stored in a single thought's reactions array field
    * DELETE to remove a reaction by the reaction's reactionId (/:reactionId)

    ![GET all thoguhts, showing reactions](./images/GET%20all%20thoughts.png)

A video of the usage of this application can be found [here](https://drive.google.com/file/d/1i0tmF6V8hb5FtRMUAzaG7LYfEgPwOiZQ/view).

## Credits

Siddhartha Baral - TA: help with understanding how schema only works in terms of queries.

AskBcS: help with populating data


