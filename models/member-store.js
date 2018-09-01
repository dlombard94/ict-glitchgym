'use strict';
const logger = require('../utils/logger');
const _ = require('lodash');
const JsonStore = require('./json-store');

const memberStore = {

  store: new JsonStore('./models/member-store.json', { memberCollection: [] }),
  collection: 'memberCollection',

  getSpecificAssessment(assessmentid) {
    return this.store.findBy(this.collection.assessments, { assessmentid: assessmentid });
  },
  
  getAllMembers() {
     return this.store.findAll(this.collection);
  },

  getMember(id) {
     return this.store.findOneBy(this.collection, { id: id });
  },
  
  getMemberById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getMemberByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  
  addMember(member) {
    this.store.add(this.collection, member);
    this.store.save();
  },
  
   removeMember(id) {
    const member = this.getMember(id);
    this.store.remove(this.collection, member);
    this.store.save();
  },
  
  addAssessment(id, assessment) {
    const member = this.getMember(id);
    member.assessments.push(assessment);
    this.store.save();
  },
  
   removeAssessment(id, assessmentId) {
    const member = this.getMember(id);
    const assessments = member.assessments;
    _.remove(assessments, {id:assessmentId});
    this.store.save();
  },
  
  madeProgress(member,assessment){
        var trend = false;
        const assessments = this.assessments;
        //if only 1 assessment done it checks that against the startingweight
        if (assessments.length == 1 ){
            if (this.startingweight<=assessments.shift().weight){
                trend = false;
            }else{
                trend = true;
            }
        }

        var lastIndex = assessments.length-1;
        if (assessments.length > 1) {
            //checks the very first assessment(last in the list due to reverse()) against the startingweight
            if (_.indexOf(assessments, assessment)==lastIndex){
                if (this.startingweight<=assessment.weight){
                    trend = false;
                }else{
                    trend = true;
                }
            }else if (_.indexOf(assessments, assessment)!=lastIndex) {
                //for every remaining assessment - it checks it against the previous one
                if (assessment.weight < (_.pullAt(assessments,(_.indexOf(assessments, assessment) + 1)).weight)) {
                    trend = true;
                } else {
                    trend = false;
                }
            }
        }

        return trend;
    },
  
  
  updateComment(memberId, assessmentId, newcomment){
    const member = this.getMember(memberId);
    logger.debug(`member = ${member}`);
    const assessments = member.assessments;
    const assessment = _.pull(assessments, {id: assessmentId});
    
    function isAssessment(assessment) { 
    return assessment.id === assessmentId;
    }
    
    logger.debug(`assessment to update = ${assessment}`);
    assessment.find(isAssessment).comment = newcomment;
    this.store.save();
  }
};



module.exports = memberStore;