const express = require("express")
const { getEmp, deleteEmp } = require("../controller/empController")

const router = express.Router()


router.get("/getall",getEmp);
router.delete('/delete/:emplId',deleteEmp)

module.exports = router;