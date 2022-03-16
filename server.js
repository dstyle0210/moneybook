const express = require('express');
const app = express();
const port = 3000;

app.use(express.static("src/v1.3"));
/*
app.get('/', (req, res) => {
  res.send('Hello World!')
});
*/

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});