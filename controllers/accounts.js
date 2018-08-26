'use strict';

const memberstore = require('../models/member-store');
const trainerstore = require('../models/trainer-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('member', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const member = request.body;
    member.assessments = [];
    member.id = uuid();
    memberstore.addMember(member);
    logger.info(`registering ${member.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {
    const member = memberstore.getMemberByEmail(request.body.email);
    const trainer = trainerstore.getTrainerByEmail(request.body.email);
    if (member) {
      response.cookie('member', member.email);
      logger.info(`logging in ${member.email}`);
      response.redirect('/dashboard');
    } else if (trainer){
      response.cookie('playlist', trainer.email);
      logger.info(`logging in ${trainer.email}`);
      response.redirect('/trainerdashboard');
    }
    else {
      response.redirect('/login');
    }
  },

  getCurrentMember(request) {
    const memberEmail = request.cookies.member;
    return memberstore.getMemberByEmail(memberEmail);
  },
};

module.exports = accounts;