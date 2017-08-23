$(document).ready(function(){
	exp.init();
});

var exp = {};
var training = false;
var trainingTools = ['hammer', 'amboss'];
var trainingObjects = ["beele", "meele"];

/* view handler */
exp.getNextView = function() {
  if (this.view.name === 'intro') {
    this.view = initPresentationView();
  }
  else if (this.view.name === 'presentation') {
    this.view = initTrialView(trainingTools, trainingObjects);
    training = true;
  } else if (this.view.name === 'trial' && training == true) {
    this.view = initReadyToTakeOffView();
    training = false;
  }
}

exp.init = function() {
	this.view = initIntroductionView();
};