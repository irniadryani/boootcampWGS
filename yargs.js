const yargs = require("yargs");
const fs = require("fs");

const dataPath = "./data/contacts.json";
const file = fs.readFileSync(dataPath, "utf8");
const contacts = JSON.parse(file);

// command untuk menambah data contact
yargs.command({
  command: "add",
  describe: "add new contact",
  builder: {
    nama: {
      describe: "Contact Name",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "Contact Email",
      demandOption: false,
      type: "string",
    },
    notelp: {
      describe: "Contact Mobile Phone Number",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    // id didapat dari panjang objek dalam array contact + 1
    const id = contacts.length + 1;

    // memasukan data yang diinput kedalam const
    const contact = {
      id: id,
      nama: argv.nama,
      email: argv.email,
      notelp: argv.notelp,
    };

    // memasukkan / menambahkan const contact yang sudah dibuat diawal kedalam array contacts dan file json
    contacts.push(contact);
    fs.writeFileSync(dataPath, JSON.stringify(contacts, null, 2));
    console.log("Data Berhasil Ditambahkan");
  },
});

// command untuk menunjukan seluruh data contact
yargs.command({
  command: "list",
  describe: "show all contacts",
  handler(argv) {
    if (contacts.length === 0) {
      console.log("Contact List is empty.");
      return;
    }

    // menampilkan seluruh data dalam array contacts / file contacts.json
    console.log(JSON.stringify(contacts, null, 2));
  },
});

// command untuk mendapat detail data contact berdasarkan id
yargs.command({
  command: "detail",
  describe: "show detail contact",
  builder: {
    id: {
      describe: "Contact ID",
      demandOption: true,
      type: "number",
    },
  },
  handler(argv) {
    // mencari data berdasarkan id yang diinput
    const contact = contacts.find((contact) => contact.id === argv.id);

    // jika ada munculkan detail contact
    if (contact) {
      console.log(JSON.stringify(contact, null, 2));
    } else {
      console.log(`Kontak dengan ID ${argv.id} tidak ditemukan.`);
    }
  },
});

// command untuk merubah data contact berdasarkan id
yargs.command({
  command: "update",
  describe: "update contact",
  builder: {
    id: {
      describe: "Contact ID",
      demandOption: true,
      type: "number",
    },
    nama: {
      describe: "nama contact",
      demandOption: false,
      type: "string",
    },
    email: {
      describe: "Contact Email",
      demandOption: false,
      type: "string",
    },
    notelp: {
      describe: "Contact Mobile Phone Number",
      demandOption: false,
      type: "string",
    },
  },
  handler(argv) {
    // cari contact berdasarkan id yang diinput
    // menghasilakn nilai boolean
    const idsContact = contacts.some((contact) => contact.id === argv.id);

    if (idsContact === false) {
      console.log(`Kontak dengan ID ${argv.id} tidak ditemukan.`);
    }

    if (argv.id !== -1 && idsContact === true) {
      // mencari data berdasarkan id yang diinput
      const contactData = contacts.find((contact) => contact.id === argv.id);

      // simpan data lama
      const oldData = {
        id: contactData.id,
        nama: contactData.nama,
        email: contactData.email,
        noTelp: contactData.noTelp,
      };

      // masukan hasil input / data sebelumnya kedalam satu const
      const updateData = {
        id: argv.id,
        nama: argv.nama !== undefined ? argv.nama : oldData.nama,
        email: argv.email !== undefined ? argv.email : oldData.email,
        noTelp: argv.notelp !== undefined ? argv.notelp : oldData.noTelp,
      };

      // cari contact data yang memiliki id selain params id
      const contactToDelete = contacts.filter(
        (contact) => contact.id !== argv.id
      );

      // Tambah data dari hasil contactToDelete / hapus data awal dengan id yang diinput
      fs.writeFileSync(dataPath, JSON.stringify(contactToDelete, null, 2));

      // Tambah updateData kedalam array contactToDelete
      contactToDelete.push(updateData);
      fs.writeFileSync(dataPath, JSON.stringify(contactToDelete, null, 2));

      console.log(`Kontak dengan ID ${argv.id} berhasil diupdate.`);
    }

    if (argv.id <= 0) {
      console.log(`Kontak dengan ID ${argv.id} tidak ditemukan.`);
    }
  },
});

// command untuk menghapus data contact berdasarkan id
yargs.command({
  command: "delete",
  describe: "delete a contact",
  builder: {
    id: {
      describe: "Contact ID",
      demandOption: true,
      type: "number",
    },
  },
  handler(argv) {
    // mencari data selain id yang diinput
    const contact = contacts.filter((contact) => contact.id !== argv.id);

    // jika panjang object dalam array contacts lebih besar dari panjang object dalam array contact
    // Jalankan fugsi untuk menginput contact
    if (contacts.length > contact.length) {
      fs.writeFileSync(dataPath, JSON.stringify(contact, null, 2));
      console.log(`Kontak dengan ID ${argv.id} berhasil dihapus.`);
    } else {
      console.log(`Kontak dengan ID ${argv.id} tidak ditemukan.`);
    }
  },
});

module.exports = yargs;
