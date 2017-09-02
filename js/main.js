$(document).ready(function(){
	exp.init();
});

var exp = {};

var trainingTools = ["hammer", "amboss"];
var trainingObjects = ["weele", "woose"];
var trainingFocus = ["contrastive", "background"];
var trainingCompetitors = ["laale", "schraube"];

var experimentTools = ["amboss", "hammer", "amboss", "hammer", "amboss", "hammer", "amboss", "hammer"];
var experimentObjects = ["naane", "neene", "naane", "neene", "naane", "neene", "naane", "neene"];
var experimentFocus = ["background", "narrow", "broad", "contrastive", "narrow", "broad", "contrastive", "background"]
var experimentCompetitors = ["hammer", "na", "na", "naane", "na", "na", "neene", "amboss"];

// randomise the experiment items lists
var counter = experimentObjects.length-1;
while (counter > -1) {

  // draw random number
  let randomIndex = Math.floor(Math.random() * counter);
  
  // swap item at counter with item at random index
  let tempTool = experimentTools[counter];
  let tempObject = experimentObjects[counter];
  let tempFocus = experimentFocus[counter];
  let tempCompetitor = experimentCompetitors[counter];
  	
  experimentTools[counter] = experimentTools[randomIndex];
  experimentTools[randomIndex] = tempTool;
  experimentObjects[counter] = experimentObjects[randomIndex];
  experimentObjects[randomIndex] = tempObject;
  experimentFocus[counter] = experimentFocus[randomIndex];
  experimentFocus[randomIndex] = tempFocus;
  experimentCompetitors[counter] = experimentCompetitors[randomIndex];
  experimentCompetitors[randomIndex] = tempCompetitor;
	
  counter--;
}


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



