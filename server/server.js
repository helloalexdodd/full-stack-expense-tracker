const express = require('express');
const cors = require('cors');
const { logger } = require('logger');
const config = require('config');

const app = express();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

require('express-async-errors');
require('./config/db')();

require('routes')(app);

const PORT = config.get('port');

app.listen(PORT, () => logger.info(`App listening on port ${PORT}.....`));
