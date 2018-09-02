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
  },
  
isIdealBodyWeight(member, assessment) {

        if (member.gender==="M") {
            if (member.height*39.3701 < 60) {
                const idealWeight = 50;
                if (assessment.weight > (idealWeight - 0.5) && assessment.weight < (idealWeight + 0.5)) {
                    return true;
                }
                return false;
            } else {
                const idealWeight = 50 + (((member.height * 39.3701) - 60) * 2.3);
                if (assessment.weight > (idealWeight - 0.5) && assessment.weight < (idealWeight + 0.5)) {
                    return true;
                }
                return false;
            }
        } else

        if (member.height*39.3701 < 60) {
            const idealWeight = 45.5;
            if (assessment.weight > (idealWeight - 0.5) && assessment.weight < (idealWeight + 0.5)) {
                return true;
            }
            return false;
        } else {
            const idealWeight = 45.5 +(((member.height * 39.3701) - 60) * 2.3);
            if (assessment.weight > (idealWeight - 0.5) && assessment.weight < (idealWeight + 0.5)) {
                return true;
            }
            return false;
        }


    },
  
madeProgress(member,assessment){
        var trend = false;
        const assessments = member.assessments;
        //if only 1 assessment done it checks that against the startingweight
        if (assessments.length == 1 ){
            if (member.startingweight <=_.head(assessments).weight){
                trend = false;
            }else{
                trend = true;
            }
        }

        var lastIndex = assessments.length-1;
        if (assessments.length > 1) {
            //checks the very first assessment(last in the list due to reverse()) against the startingweight
            if (_.indexOf(assessments, assessment)===lastIndex){
                if (member.startingweight<=assessment.weight){
                    trend = false;
                }else{
                    trend = true;
                }
            }else if (_.indexOf(assessments, assessment)!=lastIndex) {
                //for every remaining assessment - it checks it against the previous one
                if (assessment.weight < assessments[(_.indexOf(assessments, assessment) + 1)].weight) {
                    trend = true;
                } else {
                    trend = false;
                }
            }
        }

        return trend;
  },
  
goalProgress(member){
    var progress = {
      weight: '',
      chest: '',
      thigh: '',
      upperarm: '',
      waist: '',
      hips: '',
    }
    if(member.assessments.length >0){
      
    var latestAssessment = _.head(member.assessments)
    if(Date.parse(latestAssessment.date) >= Date.parse(member.goal.date)){
      
      if(latestAssessment.weight > member.goal.weight){
        progress.weight = "GOAL MISSED";
      }else{
          progress.weight = "GOAL ACHIEVED";
      }
      
      if(latestAssessment.chest > member.goal.chest){
        progress.chest = "GOAL MISSED";
      }else{
          progress.chest = "GOAL ACHIEVED";
      }
      
      if(latestAssessment.thigh > member.goal.thigh){
        progress.thigh = "GOAL MISSED";
      }else{
          progress.thigh = "GOAL ACHIEVED";
      }
      
      if(latestAssessment.upperarm > member.goal.upperarm){
        progress.upperarm = "GOAL MISSED";
      }else{
          progress.upperarm = "GOAL ACHIEVED";
      }
      
      if(latestAssessment.waist > member.goal.waist){
        progress.waist = "GOAL MISSED";
      }else{
          progress.waist = "GOAL ACHIEVED";
      }
      
      if(latestAssessment.hips > member.goal.hips){
        progress.hips = "GOAL MISSED";
      }else{
          progress.hips = "GOAL ACHIEVED";
      }    
      return progress;
    }
  
    
    if(Date.parse(latestAssessment.date) < Date.parse(member.goal.date))
    {
      if(latestAssessment.weight <= member.goal.weight){
        progress.weight = "GOAL ACHIEVED";
      }else{
        progress.weight = "GOAL OPEN";
      }
      
      if(latestAssessment.chest <= member.goal.chest){
        progress.chest = "GOAL ACHIEVED";
      }else{
        progress.chest = "GOAL OPEN";
      }
      
      if(latestAssessment.thigh <= member.goal.thigh){
        progress.thigh = "GOAL ACHIEVED";
      }else{
        progress.thigh = "GOAL OPEN";
      }
      
      if(latestAssessment.upperarm <= member.goal.upperarm){
        progress.upperarm = "GOAL ACHIEVED";
      }else{
        progress.upperarm = "GOAL OPEN";
      }
      
      if(latestAssessment.waist <= member.goal.waist){
        progress.waist = "GOAL ACHIEVED";
      }else{
        progress.waist = "GOAL OPEN";
      }
      
      if(latestAssessment.hips <= member.goal.hips){
        progress.hips = "GOAL ACHIEVED";
      }else{
        progress.hips = "GOAL OPEN";
      }
      
      return progress;
      
    }
    }
    return progress;
  },
  
  
}
module.exports = gymutility;