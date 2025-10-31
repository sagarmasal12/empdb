
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
            console.log("pls provide id....")
        }
        const pool = await poolPromise;
        const result =await pool
        .request()
        .input("emplId",emplId)
        .query("DELETE FROM Employees where emp_id = @emplId")
        // await pool.request().query('DELETE FROM Employees where empId = ?',[emplId])

        if (result.rowsAffected[0] === 0) {
          return res.status(404).send({
            success: false,
            message: "Employee not found",
          });
        }
        res.status(200).send({
            success:true,
            message:"Emp Delete Successfully.."
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:'false',
            message:'Error while deleting api'
        })
        
    }

    
    
}

const createEmp = async (req,res)=>{
    try{
        const {emp_id ,first_name,last_name, email, salary,department} = req.body;
        if(emp_id|| !first_name || !last_name || !email || !salary || !department){

            return res.status(400).send({
                success:"false",
                message:"Pls Provide All the fields"
            })
        }
        const pool = await poolPromise;
        await pool
        .request()
        .input("first_name",sql.VarChar,first_name)
        .input("last_name", sql.VarChar,last_name)
        .input("email",sql.VarChar,email)
        .input("salary",sql.Decimal(10,2),salary)
        .input("department", sql.VarChar,department)
        .query(
            "INSERT INTO Employees(first_name,last_name, email, salary,department)VALUES (@first_name, @last_name, @email, @salary, @department)"
        )


        
       res.status(200).send({
            success:"true",
            message:'Emp Created Successfully..'
        })

    }catch(error){
        console.error(error);
        res.status(500).send({
            success:false,
            message:'Error Creating employee',
            error:error.message,
        });

    }
}

const updateEmp = async (req,res)=>{

    try{
        const {emp_id} = req.params;
        const {first_name,last_name,email, salary,department} = req.body;

        if(!emp_id){
            return res.status(400).send({
                success:'false',
                message:"Pls Provide emp_id or Emp Id not Provided"
            })
        }
        const pool = await poolPromise;
        const result = await pool
        .request()
        .input("emp_id",sql.Int,emp_id)
        .input("first_name",sql.VarChar,first_name)
        .input("last_name",sql.VarChar,last_name)
        .input("email",sql.VarChar,email)
        .input("salary",sql.Decimal(10,2),salary)
        .input("department",sql.VarChar,department)
        .query("UPDATE Employees SET first_name = @first_name, last_name = @last_name,email=@email,salary = @salary,department=@department WHERE emp_Id=@emp_Id");

        if(result.rowsAffected[0]===0){
            return res.status(404).send({
                success:'false',
                message:'Data Not Found'
            })
        }
        res.status(200).send({
            success:'true',
            message:'Employee Updated Successfully'
        })
    }catch(error){
        res.status(500).send({
            success:'false',
            message:'Error Updating Employee..',
            error:error.message,
        })
    }
}
module.exports = {getEmp,deleteEmp,createEmp,updateEmp}
