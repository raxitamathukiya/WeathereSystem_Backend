const logger = require('../middlewere/logger');

function errorLogger(err, req, res, next) {
  logger.error(err.message, { error: err });
  res.status(err.status || 500).json({ error: err.message });
}

module.exports = {errorLogger};
