$(document).ready(function(){
	exp.init();
});

var exp = {};
var training = false;
var trainingTools = ["hammer", "amboss"];
var trainingObjects = ["beele", "meele"];
var experimentTools = ["amboss", "hammer"];
var experimentObjects = ["beele", "meele"];

/* view handler */
exp.getNextView = function() {
  if (this.view.name === 'intro') {
    this.view = initPresentationView();
  } else if (this.view.name === 'presentation') {
    this.view = initTrialView(trainingTools, trainingObjects);
    training = true;
  } else if (this.view.name === 'trial' && training == true) {
    this.view = initReadyToTakeOffView();
  } else if (this.view.name === 'ready-to-take-off') {
    training = false;
    this.view = initTrialView(experimentTools, experimentObjects);
  } else if (this.view.name === 'trial' && training == false) {
    this.view = initEndView();
  }
}

exp.init = function() {
	this.view = initIntroductionView();
};