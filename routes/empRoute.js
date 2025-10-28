const express = require("express")
const { getEmp, deleteEmp, createEmp } = require("../controller/empController")

const router = express.Router()


router.get("/getall",getEmp);
router.delete('/delete/:emplId',deleteEmp)

router.post('/create',createEmp);

module.exports = router;