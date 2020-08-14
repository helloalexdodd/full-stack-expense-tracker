const express = require('express');
const { logger } = require('logger');

const app = express();
app.use(express.json());

require('express-async-errors');
require('./config/db')();
require('routes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => logger.info(`App listening on port ${PORT}.....`));
