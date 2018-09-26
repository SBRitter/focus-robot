$(document).ready(function(){
  exp.init();
});

var exp = {};

var trainingObjects = [
  "stuhl",
  "tisch",
  "hocker",
  "stuhl",
  "hocker",
  "kommode",
  "tisch",
  "kommode",

  "lehwe",
  "sohme",
  "lahne",
  "sohme",
  "lehwe",
  "sohme",
  "sehse",
  "lahne"
];

var trainingTools = [
  "lineal",
  "schraubenschlüssel",
  "stift",
  "lineal",
  "stift",
  "leiter",
  "schraubenschlüssel",
  "leiter",

  "schraube",
  "schaufel",
  "feile",
  "schaufel",
  "schraube",
  "schaufel",
  "nagel",
  "feile"
];

var trainingFocus = [
  "broad",
  "background",
  "background",
  "corrective",
  "narrow",
  "corrective",
  "broad",
  "narrow",

  "background",
  "broad",
  "narrow",
  "corrective",
  "broad",
  "narrow",
  "background",
  "corrective"
];

var trainingCompetitors = [
  "na",
  "stift",
  "schraubenschlüssel",
  "kommode",
  "na",
  "hocker",
  "na",
  "na",

  "nagel",
  "na",
  "na",
  "lehle",
  "na",
  "na",
  "zirkel",
  "sehse"
];

var experimentTools = [];

var experimentObjects = [];

var experimentFocus = [];

var experimentCompetitors = [];

var allTools = trainingTools.concat(experimentTools);
var allObjects = trainingObjects.concat(experimentObjects);
var allFocus = trainingFocus.concat(experimentFocus);
var allCompetitors = trainingCompetitors.concat(experimentCompetitors);

var trainingSequences = 16;

var introductionItems = [
  // test objects
  "nahne", "mahne", "lohne", "wahne", "nohme", "mohme", "bohme", "wohme", "nohse", "lahse",
  "mahse", "wohse", "nahle", "bahle", "lohle", "lahle", "mohwe", "bohwe", "bahwe", "wahwe",
  // training objects
  "lehwe", "lahne", "sohme", "sehse", "lehle",
  "stuhl", "hocker", "tisch", "kommode",
  // test tools
  "amboss", "besen", "bohrer", "bürste", "hammer",
  "pinsel", "rolle", "säge", "schere", "zange",
  // training tools
  "lineal", "stift", "schraubenschlüssel", "leiter",
  "schaufel", "feile", "zirkel", "schraube", "nagel"
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
