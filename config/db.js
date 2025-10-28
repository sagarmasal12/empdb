const sql = require("mssql/msnodesqlv8");

const db = {
    server:'LAPTOP-C9J2BAA8\\SQLEXPRESS',
    database:'empdb',
    driver:'msnodesqlv8',
    options:{
        trustedConnection:true,
    },

}

const poolPromise = new sql.ConnectionPool(db).connect()
.then(pool =>{
    console.log("**Connected to MSSQL Database **");
    return pool;
})
.catch(err => console.log("Database Connection Failed:",err));

module.exports ={
    sql, poolPromise
}