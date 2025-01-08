const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../../models/userModal');

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

const maintainers = JSON.parse(
  fs.readFileSync(`${__dirname}/maintainers.json`, 'utf-8'),
);

const importMaintainerData = async () => {
  try {
    await User.create(maintainers, { validateBeforeSave: false });
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
};

const deleteMaintainerData = async () => {
  try {
    await User.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--importMaintainer') {
  importMaintainerData();
}

if (process.argv[2] === '--deleteMaintainer') {
  deleteMaintainerData();
}
