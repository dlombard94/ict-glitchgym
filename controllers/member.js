'use strict';

const logger = require('../utils/logger');
const memberCollection = require('../models/member-store.js');

const member = {
  index(request, response) {
    const viewData = {
      title: 'Member',
    };
    response.render('member', viewData);
  },
};

module.exports = member;