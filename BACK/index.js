require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

const router = require('./app/router');

app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`server launched on http://localhost:${PORT}`))