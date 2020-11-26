var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'127.0.0.1',
	user:'jonas',
	password:'j28n8p88kdv#',
	database:'subasta'
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connected..!');
	}
});

module.exports = connection;