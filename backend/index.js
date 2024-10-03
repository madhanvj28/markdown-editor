const express = require('express');
const cors = require('cors');
const marked = require('marked'); 

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());


app.post('/convert', (req, res) => {
  const { markdown } = req.body;
  if (!markdown) {
    return res.status(400).json({ error: 'No markdown text provided' });
  }

  
  const html = marked.parse(markdown);
  res.json({ html });
});


app.listen(port, () => {
  console.log(`Markdown conversion server running on port ${port}`);
});
