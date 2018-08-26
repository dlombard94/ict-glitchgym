'use strict';

const express = require('express');
const accounts = require('./controllers/accounts.js');
const router = express.Router();
const trainerdashboard = require('./controllers/trainerdashboard.js');
const member = require('./controllers/member.js');

const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');


router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/', dashboard.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);

router.get('/member/:id',member.index);
router.post('/member/:id/addassessment', member.addAssessment);
router.get('/member/:id/deleteassessment/:assessmentid',member.deleteAssessment)

router.get('/trainerdashboard',trainerdashboard.index);
router.get('/trainerassessment/:id',trainerdashboard.trainerAssessment);
router.get('/trainerdashboard/deletemember/:id',trainerdashboard.deleteMember);



module.exports = router;
