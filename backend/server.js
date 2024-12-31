const dotenv = require('dotenv');

// Converts the config.env file to environmental variables
dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
