const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', require('./routes'));

app.listen(process.env.PORT || 3001);
