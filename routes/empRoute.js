const express = require("express")
const { getEmp, deleteEmp, createEmp,updateEmp } = require("../controller/empController")

const router = express.Router()


router.get("/getall",getEmp);
router.delete('/deleteEmp/:emplId',deleteEmp)

router.post('/addEmp',createEmp);
router.put('/update/:emp_id',updateEmp)

module.exports = router;