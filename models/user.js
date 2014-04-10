var DB = require('./connection');

module.exports = DB.Model.extend({
  tableName: "users"
});
