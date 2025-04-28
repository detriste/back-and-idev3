const { rejects } = require('assert');
const mysql = require('mysql');
const { resolve } = require('path');
const pool = mysql.createPool({

"user":"root",
"password":"thor",
"database": "idev3",
"host":"localhost",
"port":"3306"  
});

exports.execute = (query,param = [],varpool = pool) =>{
     return new Promise(resolve,reject) => {
        varpool.query(query,param)
     }


}

