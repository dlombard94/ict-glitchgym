'use strict';

const express = require('express');
const router = express.Router();
const member = require('./controllers/member.js');

const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');

router.get('/', dashboard.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);

router.get('/member/:id',member.index);
router.get('/dashboard/deletemember/:id',dashboard.deleteMember);


router.get('/member/:id/deleteassessment/:assessmentid',member.deleteAssessment)

module.exports = router;
