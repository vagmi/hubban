var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.runSql(" \
            create table users( \
              id serial primary key, \
              github_user_name varchar, \
              github_user_id varchar, \
              access_token varchar \
            ) \
            ",callback);
};

exports.down = function(db, callback) {
  db.runSql("drop table users;",callback);
};
