const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

const imagesDir = path.join(__dirname, 'angular-dietCooking', 'src', 'assets', 'images', 'cookingMeal');
console.log(`Images directory: ${imagesDir}`);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/images', (req, res) => {
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      console.error('Unable to scan directory:', err);
      return res.status(500).json({ error: 'Unable to scan directory' });
    }
    console.log('Files in directory:', files);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
    console.log('Filtered image files:', imageFiles);
    res.json(imageFiles);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
