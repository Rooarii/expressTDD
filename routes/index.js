const express = require('express');
const connection = require('../connection');
const router = express.Router()


router.get('/',(req, res)=>{
  res.status(200).json({ message: "Hello World!"})
})

// create bookmarks
router.post("/bookmarks", (req, res)=>{
  const {url, title} = req.body;

  connection.query(
    "INSERT INTO bookmark (url, title) VALUES (?, ?)",
    [url, title],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error saving a user");
      } else {
        res.status(200).send("Successfully saved");
      }
    }
  );
})

// get all bookmarks
router.get('/bookmarks', (req, res)=>{
  connection.query(
    'SELECT * from bookmark', (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
    });
})

router.get('/bookmarks/:id', (req, res) => {
  connection.query(
    'SELECT * from bookmark WHERE id=?',
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving data');
      } else {
        if (results.length === 0) {
          return res.status(404).json({ error: 'Bookmark not found' });
        }
        return res.status(200).json(results[0]);
      }
    }
  );
});

module.exports =router;
