const express = require("express")
const { getEmp, deleteEmp, createEmp,updateEmp } = require("../controller/empController")

const router = express.Router()


router.get("/getall",getEmp);
router.delete('/delete/:emplId',deleteEmp)

router.post('/create',createEmp);
router.put('/update/:emp_id',updateEmp)

module.exports = router;