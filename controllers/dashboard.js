'use strict';
const uuid = require('uuid');
const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const gymutility = require('../utils/gymutility');
const memberStore = require('../models/member-store');

const dashboard = {
  index(request, response) {
    logger.info('dashboagrfrrfrfrd rendering');
    const loggedInMember = accounts.getCurrentMember(request);
    
    const viewData = {
      title: 'Mem - Glitch Gym Dashboard',
      member: memberStore.getMember(loggedInMember.id),
      assessments: loggedInMember.assessments,
      memberBmi: gymutility.calculateBMI(memberStore.getMember(loggedInMember.id)),
      memberBmiCategory: gymutility.determineBMICategory(gymutility.calculateBMI(memberStore.getMember(loggedInMember.id)))
    };
    logger.info('about to render', memberStore.getAllMembers());
    response.render('dashboard', viewData);
  },
  
  addAssessment(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    const newAssessment = {
      id: uuid(),
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperarm: request.body.upperarm,
      waist: request.body.waist,
      hips: request.body.hips,
      comment: '',
    };
    memberStore.addAssessment(loggedInMember.id, newAssessment);
    response.redirect('/dashboard');
  },
  
  deleteAssessment(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug(`Deleting Assessment ${assessmentId} from Member ${memberId}`);
    memberStore.removeAssessment(memberId, assessmentId);
    response.redirect('/dashboard');
  },
  
  
};

module.exports = dashboard;
