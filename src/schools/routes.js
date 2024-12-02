// this file we handle the routing
const {Router} = require('express');
const router = Router();
const controller = require("./controller");

// home endpoint
router.get("/", controller.getSchools);

// add schol endpoint
router.post("/", controller.addSchool);

// get school endpoint
router.get("/:natemis", controller.getSchoolbyEmis);

// update the number of teacher and learners endpoint
router.put("/teachers/:natemis", controller.updateTeachersNumber);
router.put("/learners/:natemis", controller.updateLeanersNumber);


module.exports = router;