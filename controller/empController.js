const { sql, poolPromise } = require("../config/db.js");
const{db} = require("../config/db.js")


const getEmp = async (req,res)=>{
    try{
    const pool = await poolPromise; // ✅ Wait for DB connection
    const data = await pool.request().query('SELECT * FROM Employees');
        if(!data){
            return res.status(401).send({
                success:'false',
                message:'data not found in db',
                error
            })
        }
        res.status(200).send({
            success:true,
            message:"Student Data Found Successfully...",
            data:data
            
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:"false",
            message:'Emp Data Not Found'
        })
    }
}

const deleteEmp = async (req,res)=>{
    try{
        const emplId = req.params.emplId;
        if(!emplId){
            return res.status(404).send({
                success:"false",
                message:"Pls provide id"
            })
        }
        await db.query('DELETE FROM Employees where empId = ?',[emplId])
        res.status(200).send({
            success:true,
            message:"Emp Delete Successfully.."
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:'false',
            message:'Data Not found for deleted'
        })
        
    }

    
    
}

module.exports = {getEmp,deleteEmp}