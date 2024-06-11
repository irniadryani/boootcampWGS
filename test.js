const fs = require("fs");
const nama = "irin";
const noTelp = "+628798118678";

fs.writeFileSync('test.txt',"Hello World secara synchronus")   //menuliskan string ke file
fs.readFile('test.txt', 'utf-8', (err, data) => {
    if(err) throw err;
    console.log(data);
})

console.log(`Halo nama saya ${nama} nomor telepon saya ${noTelp}`)
console.log("Halo nama saya " + nama + " nomor telepon saya " + noTelp)