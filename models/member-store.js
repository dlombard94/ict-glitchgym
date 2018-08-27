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
    member.assessments.push(assessment.hips);
    this.store.save();
  },
  
   removeAssessment(id, assessmentId) {
    const member = this.getMember(id);
    const assessments = member.assessments;
    _.remove(assessments, {id:assessmentId});
    this.store.save();
  },
  
  updateComment(assessmentId, newcomment){
    const assessment = this.getSpecificAssessment(assessmentId);
    logger.debug(`assessment = ${assessment}`);
    assessment.comment = newcomment;
    this.store.save();
  }
};



module.exports = memberStore;