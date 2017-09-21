$(document).ready(function(){
  exp.init();
});

var exp = {};

var trainingTools = [
  "lineal", "lineal",
  "stift", "stift",
  "schraubenschlüssel", "schraubenschlüssel",
  "leiter", "leiter"
];

var trainingObjects = [
  "stuhl", "stuhl",
  "hocker", "hocker",
  "tisch", "tisch",
  "kommode", "kommode"
];

var trainingFocus = [
  "broad", "corrective",
  "background", "narrow", 
  "broad", "background", 
  "narrow", "corrective"
];

var trainingCompetitors = [
  "na", "kommode",
  "schraubenschlüssel", "na",
  "na", "stift",
  "na", "hocker"
];

// randomise the training items lists
var counter = trainingObjects.length-1;
while (counter > -1) {

  // draw random number
  let randomIndex = Math.floor(Math.random() * counter);

  // swap item at counter with item at random index
  let tempTool = trainingTools[counter];
  let tempObject = trainingObjects[counter];
  let tempFocus = trainingFocus[counter];
  let tempCompetitor = trainingCompetitors[counter];

  trainingTools[counter] = trainingTools[randomIndex];
  trainingTools[randomIndex] = tempTool;
  trainingObjects[counter] = trainingObjects[randomIndex];
  trainingObjects[randomIndex] = tempObject;
  trainingFocus[counter] = trainingFocus[randomIndex];
  trainingFocus[randomIndex] = tempFocus;
  trainingCompetitors[counter] = trainingCompetitors[randomIndex];
  trainingCompetitors[randomIndex] = tempCompetitor;

  counter--;
}

var experimentTools = [];

var experimentObjects = [];

var experimentFocus = [];

var experimentCompetitors = [];

var allTools = trainingTools.concat(experimentTools);
var allObjects = trainingObjects.concat(experimentObjects);
var allFocus = trainingFocus.concat(experimentFocus);
var allCompetitors = trainingCompetitors.concat(experimentCompetitors);

var trainingSequences = 8;

var introductionItems = [
  // test objects
  "neene", "naane", "maane", "loone", "laane", "waane", "noome", "meeme", "moome", "seeme",
  "soome", "woome", "neese", "meese", "maase", "seese", "saase", "woose", "noole", "naale",
  "leele", "loole", "laale", "weele", "moowe", "soowe", "saawe", "leewe", "weewe", "waawe",
  // training objects
  "stuhl", "hocker", "tisch", "kommode",
  // test tools
  "amboss", "besen", "bohrer", "bürste", "feile", "hammer", "nagel", "pinsel", "rolle", "säge",
  "schaufel", "schere", "schraube", "zange", "zirkel",
  // training tools
  "lineal", "stift", "schraubenschlüssel", "leiter"
];

/* view handler */
exp.getNextView = function() {
  if (this.view.name === 'config') {
    if (skipIntro === "off") {
      this.view = initIntroductionView();
    } else if (skipIntro === "on") {
      this.view = initTrialView(allTools, allObjects, allFocus, allCompetitors, trainingSequences);
    }
  } else if (this.view.name === 'intro') {
    this.view = initPresentationView(introductionItems);
  } else if (this.view.name === 'presentation') {
    this.view = initTrialView(allTools, allObjects, allFocus, allCompetitors, trainingSequences);
  } else if (this.view.name === 'trial') {
    this.view = initEndView();
  }
}

exp.init = function() {
  this.view = initConfigView();
};