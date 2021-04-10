// BUILD YOUR SERVER HERE

const express = require("express");
const db = require("./users/model");

const server = express();

// When the client makes a POST request to /api/users:

// If the request body is missing the name or bio property:
// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { message: "Please provide name and bio for the user" }.

// If the information about the user is valid:
// save the new user the the database.
// respond with HTTP status code 201 (Created).
// return the newly created user document including its id.

// If there's an error while saving the user:
// respond with HTTP status code 500 (Server Error).
// return the following JSON object: { message: "There was an error while saving the user to the database" }.

server.post("/api/users", async (req, res) => {
  const newUser = req.body;

  try {
    if (!newUser.name || !newUser.bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    } else {
      const addUser = await db.insert(newUser);
      res.status(201).json(addUser);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "There was an error while saving the user to the database",
    });
  }
});

// When the client makes a GET request to /api/users:

// If there's an error in retrieving the users from the database:
// respond with HTTP status code 500.
// return the following JSON object: { message: "The users information could not be retrieved" }.

server.get("/api/users", async (req, res) => {
  try {
    const allUsers = await db.find();
    res.json(allUsers);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "The users information could not be retrieved" });
  }
});

// When the client makes a GET request to /api/users/:id:

// If the user with the specified id is not found:
// respond with HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The user with the specified ID does not exist" }.

// If there's an error in retrieving the user from the database:
// respond with HTTP status code 500.
// return the following JSON object: { message: "The user information could not be retrieved" }.

server.get("/api/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await db.findById(id);
    if (!user) {
      res
        .status(404)
        .json({ message: `The user with id ${id} does not exist` });
    } else {
      res.json(user);
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "The user information could not be retrieved" });
  }
});

// When the client makes a DELETE request to /api/users/:id:

// If the user with the specified id is not found:
// respond with HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The user with the specified ID does not exist" }.

// If there's an error in removing the user from the database:
// respond with HTTP status code 500.
// return the following JSON object: { message: "The user could not be removed" }.

server.delete("/api/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await db.remove(id);
    if (!deleted) {
      res
        .status(404)
        .json({ message: `The user with id ${id} does not exist` });
    } else {
      res.json(deleted);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "The user could not be removed" });
  }
});

// When the client makes a PUT request to /api/users/:id:

// If the user with the specified id is not found:
// respond with HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The user with the specified ID does not exist" }.

// If the request body is missing the name or bio property:
// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { message: "Please provide name and bio for the user" }.

// If there's an error when updating the user:
// respond with HTTP status code 500.
// return the following JSON object: { message: "The user information could not be modified" }.

// If the user is found and the new information is valid:
// update the user document in the database using the new information sent in the request body.
// respond with HTTP status code 200 (OK).
// return the newly updated user document.

server.put("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  console.log(changes);
  console.log(id);

  try {
    if (!changes.name || !changes.bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    } else {
      const updatedUser = await db.update(id, changes);
      if (!updatedUser) {
        res
          .status(404)
          .json({ message: `The user with id ${id} does not exist` });
      } else {
        res.status(200).json(updatedUser);
      }
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "The user information could not be modified" });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
