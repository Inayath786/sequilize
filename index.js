const express = require('express');
const { resolve } = require('path');
const { track } = require('./models/track.model');
const { sequelize } = require('./lib/index');
// const { FORCE } = require('sequelize/types/index-hints');

const app = express();
const port = 3010;
const users = [
  {
    id: 1,
    name: 'inayath',
    age: 20,
    gender: 'male',
  },
  {
    id: 2,
    name: 'akhil',
    age: 21,
    gender: 'male',
  },
  {
    id: 3,
    name: 'sabiha',
    age: 19,
    gender: 'female',
  },
  {
    id: 4,
    name: 'althaf',
    age: 22,
    gender: 'male',
  },
  {
    id: 5,
    name: 'kazeem',
    age: 23,
    gender: 'male',
  },
];

app.use(express.static('static'));

app.get('/data', async (req, res) => {
  try {
    await sequelize.sync({ force: true }); //to create table and remove duplicate values
    await track.bulkCreate(users); //seed data into database
    res.status(200).json({ message: 'Database seeding completed' });
  } catch (error) {
    res.status(500).json({ message: 'error' });
  }
});

async function fetchalldata() {
  let tracks = await track.findAll();
  return { tracks };
}

app.get('/tracks', async (req, res) => {
  try {
    let response = await fetchalldata();

    if (response.tracks.length === 0) {
      res.status(500).json({ message: 'no data present' });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//find by id
async function fetchbyId(id) {
  let tracks = await track.findOne({ where: { id } });
  return { tracks };
}
app.get('/track/details/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let response = await fetchbyId(id);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('server started');
});
