var Bookshelf=require('bookshelf');

module.exports = Bookshelf.initialize({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    port     :  5433,
    user     : 'postgres',
    password : 'pass',
    database : 'hubban_dev',
    charset  : 'utf8'
  }
});
