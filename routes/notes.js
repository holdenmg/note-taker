const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtil');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//POST route
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding Note');
  }
});

//Delete route

notes.delete('/:id', (req, res) => {

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const newData = JSON.parse(data).filter(({ id }) => id !== req.params.id);
      console.log("this is newData: " + newData);
      writeToFile('./db/db.json', newData);
      res.json(`Note deleted successfully`);
    }
  })
});






module.exports = notes;