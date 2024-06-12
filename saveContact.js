const fs = require("fs");

function saveData(data) {
    const file = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts = JSON.parse(file);
    contacts.push(data);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts), 'utf8');
  }

  module.exports = saveData
