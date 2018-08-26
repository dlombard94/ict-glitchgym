'use strict';
const uuid = require('uuid');
const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const memberStore = require('../models/member-store');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInMember = accounts.getCurrentMember(request);
    const viewData = {
      title: 'Mem - Glitch Gym Dashboard',
      members: memberStore.getMemberAssessmments(loggedInMember.id)
    };
    logger.info('about to render', memberStore.getAllMembers());
    response.render('dashboard', viewData);
  },
  
  
};

module.exports = dashboard;
