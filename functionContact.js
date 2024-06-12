
const readline = require("readline");
var validator = require("validator");
const fs = require("fs");
const saveContact = require('./saveContact')

const dirPath= './data';
if(!fs.existsSync(dirPath)){
fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
  fs.writeFileSync(dataPath,'[]','utf-8');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

const data = (async() => {
  try {
    const nama = await prompt(`Input nama: `);
    const notelp = await prompt(`Input nomor Telepon: `);
    const email = await prompt(`Input email: `);
    if (!validator.isEmail(email) || !validator.isMobilePhone(notelp)) {
      console.log("Email atau nomor telepon salah");
      rl.close();
    }else {
      const data = {nama,email,notelp};
      saveContact(data);
      console.log(`Terima kasih sudah memasukkan data!`);
      rl.close();
    }
    rl.close();
  } catch (e) {
    console.error("Unable to prompt", e);
  }
})();

const getListData=()=>{
  listContact= require('./data/contacts.json')
  return listContact;
}

module.exports = data;


// const data = (async() => {
//   try {
//     const nama = await prompt(`Input nama: `);
//     const notelp = await prompt(`Input nomor Telepon: `);
//     const email = await prompt(`Input email: `);
//     if (!validator.isEmail(email) || !validator.isMobilePhone(notelp)) {
//       console.log("Email atau nomor telepon salah");
//       rl.close();
//     }else {
//       const contact = {nama, notelp, email};
//       saveData(contact);
//       console.log(`Terima kasih sudah memasukkan data!`);
//       rl.close();
//     }
//     rl.close();
//   } catch (e) {
//     console.error("Unable to prompt", e);
//   }
// })();

// (async() => {
//   try {
//     const nama = await prompt("Input nama: ");
//     const notelp = await prompt(`Input nomor Telepom: `);
//     const email = await prompt(`Input email: `);
//     if (!validator.isEmail(email) || !validator.isMobilePhone(notelp)) {
//       console.log("Email atau nomor telepon salah");
//       rl.close();
//     }else {
//       const contact = {nama, notelp, email};
//       const file = fs.readFileSync('data/contacts.json', 'utf8');
//       const contacts = JSON.parse(file);
//       contacts.push(contact);
//       fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
//       console.log(`Terima kasih sudah memasukkan data!`);
//       rl.close();
//     }
//     rl.close();
//   } catch (e) {
//     console.error("Unable to prompt", e);
//   }
// })();

// rl.question("Input Nama Anda: ", (nama) => {
//   rl.question("Input Nomor Telepon: ", (notelp) => {
//     rl.question("Input Email: ", (email) => {
//       if (!validator.isEmail(email) || !validator.isMobilePhone(notelp)) {
//         console.log("Email atau nomor telepon salah");
//         rl.close();
//       }else {
//         const contact = {nama, notelp, email};
//         const file = fs.readFileSync('data/contacts.json', 'utf8');
//         const contacts = JSON.parse(file);
//         contacts.push(contact);
//         fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
//         console.log(`Terima kasih sudah memasukkan data!`);
//         rl.close();
//       }
//     });
//   });
// });




