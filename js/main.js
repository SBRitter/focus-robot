$(document).ready(function(){
	exp.init();
});

var exp = {};

var trainingTools = ["hammer", "amboss"];
var trainingObjects = ["beele", "meele"];
var trainingFocus = ["contrastive", "background"];
var trainingCompetitors = ["meele", "hammer"];

var experimentTools = ["amboss", "hammer", "amboss", "hammer", "amboss", "hammer", "amboss", "hammer"];
var experimentObjects = ["beele", "meele", "beele", "meele", "beele", "meele", "beele", "meele"];
var experimentFocus = ["background", "narrow", "broad", "contrastive", "narrow", "broad", "contrastive", "background"]
var experimentCompetitors = ["hammer", "na", "na", "beele", "na", "na", "meele", "amboss"];

var tools = trainingTools.concat(experimentTools);
var objects = trainingObjects.concat(experimentObjects);
var focus = trainingFocus.concat(experimentFocus);
var competitors = trainingCompetitors.concat(experimentCompetitors);

var trainingSequences = 2;

/* view handler */
exp.getNextView = function() {
  if (this.view.name === 'intro') {
    this.view = initPresentationView();
  } else if (this.view.name === 'presentation') {
    this.view = initTrialView(tools, objects, focus, competitors, trainingSequences);
  } else if (this.view.name === 'trial') {
    this.view = initEndView();
  }
}

exp.init = function() {
	this.view = initIntroductionView();
};