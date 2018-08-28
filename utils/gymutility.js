const _ = require('lodash');

const gymutility = {
calculateBMII(member,assessment){
  return Math.round((assessment.weight/(member.height* member.height))*100.0)/100.0;
},

calculateBMI(member){
  var memberBmi = 0;
  var assessment;
  
  if (member.assessments.length>1){
            //here the first index is the last entered assessment dueto Collections.reverse()
            const assessments = member.assessments;
            assessment = _.head(assessments);
            memberBmi = this.calculateBMII(member,assessment);
        }else{
            //if the member has no assessment then use their starting weight
            memberBmi = (member.startingweight / ((member.height* member.height))*10)/10;
        }
        return memberBmi;
}
}
module.exports = gymutility;