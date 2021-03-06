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
    response.render('trainerassessment', viewData);
  },
  
  deleteMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Deleting Member ${memberId}`);
    memberStore.removeMember(memberId);
    response.redirect('/trainerdashboard');
  },
  
  updateComment(request, response){
    const assessmentId = request.params.assessmentid;
    const memberId = request.params.id;
    const newcomment =  request.body.comment;
    logger.debug(`memberid = ${memberId}`);
    logger.debug(`assessment id = ${assessmentId}`);
    logger.debug(`New comment = ${newcomment}`);
    memberStore.updateComment(memberId,assessmentId, newcomment);
    
    response.redirect('/trainerdashboard');
  },
  
};

module.exports = trainerdashboard;