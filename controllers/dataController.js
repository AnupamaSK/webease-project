// backend/controllers/dataController.js
// ✅ Add at the top
const fs = require('fs');
const path = require('path');
// In-memory store (simulate DB)
const userDataStore = [];

exports.saveIntro = (req, res) => {
  const { writerName, intro, writerPhoto } = req.body;

  let user = userDataStore.find(user => user.writerName === writerName);
  if (!user) {
    user = { writerName, intro, writerPhoto, books: [], awards: [] };
    userDataStore.push(user);
  } else {
    user.intro = intro;
    user.writerPhoto = writerPhoto;
  }

  console.log("✅ Intro saved for:", writerName);
  res.json({ message: 'Intro saved successfully' });
};

exports.saveBooks = (req, res) => {
  const { writerName, books } = req.body;

  const user = userDataStore.find(user => user.writerName === writerName);
  if (user) {
    user.books = books;
    console.log(`📚 Books saved for: ${writerName}`);
    console.log(books); // Log the book data
    res.json({ message: 'Books saved successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

exports.saveAwards = (req, res) => {
  const { writerName, awards } = req.body;

  const user = userDataStore.find(user => user.writerName === writerName);
  if (user) {
    user.awards = awards;
    console.log(`🏆 Awards saved for: ${writerName}`);
    console.log(awards); // Log the award data
    res.json({ message: 'Awards saved successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

exports.getFinalData = (req, res) => {
  const writerName = req.query.writerName;
  const user = userDataStore.find(user => user.writerName === writerName);
  if (user) {
    console.log(`📦 Fetching final data for: ${writerName}`);
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// ➡️ Get all users' data
exports.getAllUsers = (req, res) => {
  console.log("📋 Returning all users");
  res.json(userDataStore);
};


// ✅ New route: Generate HTML and save
exports.generateWebsite = (req, res) => {
  const { writerName } = req.body;
  const user = userDataStore.find(u => u.writerName === writerName);
  
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${user.writerName}'s Website</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; color: #333; }
    h1 { color: #2c3e50; }
    .section { margin-bottom: 30px; }
    .books, .awards { padding-left: 20px; }
    img { max-width: 200px; border-radius: 10px; }
  </style>
</head>
<body>
  <h1>${user.writerName}</h1>
  ${user.writerPhoto ? `<img src="${user.writerPhoto}" alt="Photo" />` : ''}
  <div class="section">
    <h2>Introduction</h2>
    <p>${user.intro}</p>
  </div>
  <div class="section">
    <h2>Books</h2>
    <ul class="books">
      ${user.books.map(book => `<li>${book.name} - <a href="${book.links[0]}" target="_blank">Buy</a></li>`).join('')}
    </ul>
  </div>
  <div class="section">
    <h2>Awards</h2>
    <ul class="awards">
      ${user.awards.map(a => `<li>${a}</li>`).join('')}
    </ul>
  </div>
</body>
</html>
  `;

  const filename = `${writerName.toLowerCase().replace(/\s+/g, '-')}.html`;
  const filePath = path.join(__dirname, '../generated-sites', filename);

  // Ensure directory exists
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  fs.writeFile(filePath, htmlContent, err => {
    if (err) {
      console.error('❌ Error saving file:', err);
      return res.status(500).json({ message: 'Error generating website' });
    }
    const link = `http://localhost:5000/generated-sites/${filename}`;
    res.json({ message: 'Website generated successfully', link });
  });
};
