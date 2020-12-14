// index.js
const app = require('./app');

const port = process.env.PORT || 3000;
const {DB_HOST} = process.env;

app.listen(port, (err) => {
  if (err) {
    throw new Error(`An error occurred: ${err.message}`);
  }
  console.log(`Server is listening on http://${DB_HOST}:${port}`);
});

