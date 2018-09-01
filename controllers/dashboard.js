'use strict';
const uuid = require('uuid');
const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const gymutility = require('../utils/gymutility');
const memberStore = require('../models/member-store');
const _ = require('lodash');


const dashboard = {
  index(request, response) {
    logger.info('dashboagrfrrfrfrd rendering');
    const loggedInMember = accounts.getCurrentMember(request);
    
    const viewData = {
      title: 'Mem - Glitch Gym Dashboard',
      member: memberStore.getMember(loggedInMember.id),
      assessments: _.reverse(loggedInMember.assessments),
      memberBmi: gymutility.calculateBMI(memberStore.getMember(loggedInMember.id)),
      memberBmiCategory: gymutility.determineBMICategory(gymutility.calculateBMI(memberStore.getMember(loggedInMember.id))),
//       madeProgress(assessment){
//         var trend = false;
//         const assessments = this.member.assessments;
//         //if only 1 assessment done it checks that against the startingweight
//         if (assessments.length == 1 ){
//             if (this.startingweight<=assessments.shift().weight){
//                 trend = false;
//             }else{
//                 trend = true;
//             }
//         }

//         var lastIndex = assessments.length-1;
//         if (assessments.length > 1) {
//             //checks the very first assessment(last in the list due to reverse()) against the startingweight
//             if (_.indexOf(assessments, assessment)==lastIndex){
//                 if (this.startingweight<=assessment.weight){
//                     trend = false;
//                 }else{
//                     trend = true;
//                 }
//             }else if (_.indexOf(assessments, assessment)!=lastIndex) {
//                 //for every remaining assessment - it checks it against the previous one
//                 if (assessment.weight < (_.pullAt(assessments,(_.indexOf(assessments, assessment) + 1)).weight)) {
//                     trend = true;
//                 } else {
//                     trend = false;
//                 }
//             }
//         }

//         return trend;
//     },
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
      date: new Date(),
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
