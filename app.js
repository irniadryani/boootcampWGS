
const readline = require("readline");
var validator = require("validator");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Input Nama: ", (nama) => {
  rl.question("Input Nomor Telepon: ", (notelp) => {
    rl.question("Input Email: ", (email) => {
      if (!validator.isEmail(email) || !validator.isMobilePhone(notelp)) {
        console.log("Email atau nomor telepon salah");
        rl.close();
      }
      return false;
    });
  });
});




