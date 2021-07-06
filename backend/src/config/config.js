module.exports = {
  port: Number(process.env.port) || 3001,
  secret: 'inlovewithexpress',
  dbConnectString:
    process.env.dbConnectString || "mongodb://localhost:27017/permatechit",
  itemsPerPage: process.env.itemsPerPage || 20,
  apiEndPoint: process.env.apiEndPoint || "http://localhost:3001/",
};
