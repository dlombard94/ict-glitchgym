'use strict';
const uuid = require('uuid');
const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const memberStore = require('../models/member-store');

const dashboard = {
  index(request, response) {
    logger.info('dashboagrfrrfrfrd rendering');
    const loggedInMember = accounts.getCurrentMember(request);
    
    const viewData = {
      title: 'Mem - Glitch Gym Dashboard',
      member: memberStore.getMember(loggedInMember.id),
      assessments: loggedInMember.assessments
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
    };
    memberStore.addAssessment(loggedInMember.id, newAssessment);
    response.redirect('/dashboard');
  },
  
  
};

module.exports = dashboard;
