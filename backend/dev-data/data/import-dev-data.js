const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../../models/userModal');
const Equipment = require('../../models/equipmentModal');

// Converts the config.env file to environmental variables
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

async function main() {
  await mongoose.connect(DB);
}

main().catch((err) => console.log(err));

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const equipments = JSON.parse(
  fs.readFileSync(`${__dirname}/equipments.json`, 'utf-8'),
);

const importUserData = async () => {
  try {
    await User.create(users, { validateBeforeSave: false });
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
};

const deleteUserData = async () => {
  try {
    await User.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
};

const deleteEquipmentData = async () => {
  try {
    await Equipment.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
};

const importEquipmentData = async () => {
  try {
    await Equipment.create(equipments, { validateBeforeSave: false });
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--importUser') {
  importUserData();
}

if (process.argv[2] === '--importEquipment') {
  importEquipmentData();
}

if (process.argv[2] === '--deleteUser') {
  deleteUserData();
}

if (process.argv[2] === '--deleteEquipment') {
  deleteEquipmentData();
}
