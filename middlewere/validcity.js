function validateCity(req, res, next) {
    const { city } = req.params;
  
    if (/[^a-zA-Z]/.test(city)) {
      res.status(400).json({ error: 'Invalid city name' });
    } else {
      next();
    }
  }
  
  module.exports = { validateCity}
  