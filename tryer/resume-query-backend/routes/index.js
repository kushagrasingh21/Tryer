const uploadRoutes = require('./upload');
const searchRoutes = require('./search');

module.exports = (app) => {
  app.use('/api/upload', uploadRoutes);
  app.use('/api/search', searchRoutes);
};
