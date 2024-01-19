const mysql = require('mysql2');

const connection = mysql.createConnection('mysql://x3zegc9y8c2wgv5dmrl8:pscale_pw_eKTHzjP86FVrb4luPwpQ9LtYCKhl0LollVZ1MUlVZe8@aws.connect.psdb.cloud/shorten-url?ssl={"rejectUnauthorized":true}');

module.exports = connection;