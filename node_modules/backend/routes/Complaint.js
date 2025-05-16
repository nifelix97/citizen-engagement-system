const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaint');

router.post('/', complaintController.submitComplaint);
router.get('/', complaintController.getAll);
router.get('/:id', complaintController.getOne);
router.put('/:id', complaintController.updateStatusOrResponse);

module.exports = router;
