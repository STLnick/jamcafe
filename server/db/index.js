const express = require('express');

const app = express();
const port = 3000;

app.get('/', (_, res) => {
  res.send('<h1>Hello from Express</h1>');
});

app.listen(port, () => {
  console.log(`Wistening at: http://localhost:${port}`);
});
