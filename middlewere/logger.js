const { createLogger, transports, format } = require('winston');
const { MongoDB } = require('winston-mongodb');
const mongoose = require('mongoose');

const errorLogger = createLogger({
  level: 'error',
  transports: [
    new transports.MongoDB({
      level: 'error',
      db: mongoose.connection,
      options: { useUnifiedTopology: true },
      collection: 'error_logs',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = {errorLogger};
