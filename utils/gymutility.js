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
},
  
  determineBMICategory(bmivalue){
    if (bmivalue < 16) {
            return "SEVERELY UNDERWEIGHT";
        } else if (bmivalue >= 16 && bmivalue < 18.5) {
            return "UNDERWEIGHT";
        } else if (bmivalue >= 18.5 && bmivalue < 25) {
            return "NORMAL";
        } else if (bmivalue >= 25 && bmivalue < 30) {
            return "OVERWEIGHT";
        } else if (bmivalue >= 30 && bmivalue < 35) {
            return "MODERATELY OBESE";
        } else {
            return "SEVERELY OBESE";
        }
  }
}
module.exports = gymutility;