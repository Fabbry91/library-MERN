const { Router } = require("express");
const router = Router();

const {
    getFeedback
} = require('../controllers/feedbackRoute');

router.get("/", getFeedback);

module.exports = router;