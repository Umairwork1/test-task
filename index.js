const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/validation')();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`));

module.exports = server;