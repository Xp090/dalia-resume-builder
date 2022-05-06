const authMiddleware = require("../middleware/auth.middleware");
const express = require("express");
const router = express.Router()
const resumeBuildController = require("../controllers/resumeBuilder.controller")


router.get('/', authMiddleware.requireJWT(true), resumeBuildController.getStatus)

router.post('/:step', authMiddleware.requireJWT(), resumeBuildController.updateResume)

module.exports = router
