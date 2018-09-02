'use strict';
const uuid = require('uuid');
const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const gymutility = require('../utils/gymutility');
const memberStore = require('../models/member-store');
const _ = require('lodash');


const dashboard = {
  index(request, response) {
    logger.info('member dashboad rendering');
    const loggedInMember = accounts.getCurrentMember(request);
    var assessments = loggedInMember.assessments.sort(function(a, b){return b.date - a.date});
    var memberBmi = gymutility.calculateBMI(memberStore.getMember(loggedInMember.id));
    var memberBmiCategory = gymutility.determineBMICategory(gymutility.calculateBMI(memberStore.getMember(loggedInMember.id)));
    var memberIdealWeight = true;
    if (assessments.length > 0){
      memberIdealWeight = gymutility.isIdealBodyWeight(loggedInMember,_.head(assessments));
    }
    var trend = true;
    if (assessments.length > 0){
      trend = gymutility.madeProgress(loggedInMember, _.head(assessments));
    }
    
    var goalProgress = gymutility.goalProgress(loggedInMember);
    
    const viewData = {
      title: 'Mem - Glitch Gym Dashboard',
      member: loggedInMember,
      assessments: assessments,
      memberBmi: memberBmi,
      memberBmiCategory: memberBmiCategory,
      memberIdealWeight: memberIdealWeight,
      madeProgress: trend,
      goalProgress: goalProgress,
    };
    
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
      date: new Date(),
      comment: '',
    };
    memberStore.addAssessment(loggedInMember.id, newAssessment);
    response.redirect('/dashboard');
  },
  
  addGoal(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    const newGoal = {
      id: uuid(),
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperarm: request.body.upperarm,
      waist: request.body.waist,
      hips: request.body.hips,
      date: new Date(request.body.date),
      
    };
    memberStore.addGoal(loggedInMember.id, newGoal);
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
