const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const{sql,poolPromise} = require("./config/db.js");
dotenv.config();
const myRoute = require("./routes/empRoute.js")

const app = express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:4209"
}));

app.get('/',(req,res)=>{
    console.log(req);
    res.send("Working Fine")
    
});
app.use(myRoute);

const PORT = process.env.PORT
app.listen(PORT,()=> console.log(`✅ server running on port http://localhost:${PORT}`)
);
