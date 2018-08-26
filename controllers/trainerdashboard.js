'use strict';
const uuid = require('uuid');
const logger = require('../utils/logger');
const trainerStore = require('../models/trainer-store');
const memberStore = require('../models/member-store');


const trainerdashboard = {
  index(request, response) {
    const trainerId = request.params.id;
    logger.debug(`Trainer id = ${trainerId}`);
    const viewData = {
      title: 'Trainer',
      //define all the members for the trainer dashboard
      members: memberStore.getAllMembers(),
      trainer: trainerStore.getTrainerById(trainerId),
    };
    response.render('trainerdashboard', viewData);
  },
  
  trainerAssessment(request, response) {
    const memberId = request.params.id;
    logger.debug(`rendering Member ${memberId}`);
    const viewData = {
      title: 'Trainer Assessment',
      //define all the members for the trainer dashboard
      member: memberStore.getMemberById(memberId),
    };
    response.render('trainerdashboard', viewData);
  },
  
  deleteMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Deleting Member ${memberId}`);
    memberStore.removeMember(memberId);
    response.redirect('/trainerdashboard');
  },
  
};

module.exports = trainerdashboard;