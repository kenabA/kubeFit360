const express = require('express');

const app = express();

app.use(express.json());

const port = 3000;

const getAllMaintainers = (req, res) => {
  res.json({ data: 'Ok', status: 'OK' });
};

const addMaintainer = (req, res) => {
  res.json({ data: 'Ok', status: 'OK' });
};

const getMaintainer = (req, res) => {
  res.json({ data: 'Ok', status: 'OK' });
};

const updateMaintainer = (req, res) => {
  res.json({ data: 'Ok', status: 'OK' });
};

const deleteMaintainer = (req, res) => {
  res.json({ data: 'Ok', status: 'OK' });
};

app.route('/api/v1/maintainers').get(getAllMaintainers).post(addMaintainer);
app
  .route('/api/v1/maintainers/:id')
  .get(getMaintainer)
  .patch(updateMaintainer)
  .delete(deleteMaintainer);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
