let mysql = require('mysql');
let _ = require('lodash');

let connection = mysql.createConnection({
	host: "localhost",
	user: process.env.DB_USER || "root",
    password:  process.env.DB_PASS || "password", 
    database: process.env.DB_NAME || "local"
});

const TABLE_NAME = process.env.TABLE_NAME || 'songs';

//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

connection.connect(async(err) => {
	if (err) throw err;
    console.log("Connected!");
});

function query(query, params=[]) {
    return new Promise(function(resolve, reject) {
        connection.query(query, params, function (err, rows, fields) {
            if (err) {
                console.log(err.message)
                return reject(err);
            }
            resolve(rows);
        });
    });
}

exports.topSongs = async() => {
    return await query(`SELECT * FROM ${TABLE_NAME} ORDER BY \`rank\` LIMIT 50`)
}

exports.filterSearch = async(conditions, operator='AND') => {
    let keysList = _.keys(conditions)
    let conditionString = keysList
    .map((key, i) => i == keysList.length - 1 ? `(\`${key}\` BETWEEN ? AND ?) `:`(\`${key}\` BETWEEN ? AND ?) ${operator} `)
    .join('');    

    queryString =
    "SELECT * " +
    `FROM ${TABLE_NAME} ` +
    "WHERE " + conditionString;

    let params = [];
    _.values(conditions).map(range => params = params.concat(range));
    params = params.map(p => Number(p))

    return await query(queryString, params)
}

exports.freeSearch = async(conditions, operator='AND') => {
    let queryString = '';

    if(!_.isEmpty(conditions)) {
        let keysList = _.keys(conditions)
        let conditionString = keysList
        .map((key, i) => i == keysList.length - 1 ? `(${key} LIKE ?)`:`(${key} LIKE ?) ${operator} `)
        .join('');    

        queryString =
        "SELECT * " +
        `FROM ${TABLE_NAME} ` +
        "WHERE " + conditionString;
    } else {
        queryString =
        "SELECT * " +
        `FROM ${TABLE_NAME} `;
    }

    let params = _.values(conditions).map(param => `%${param}%`);
    return await query(queryString, params)
};