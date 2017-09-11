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
  "broad", "contrastive",
  "background", "narrow", 
  "broad", "background", 
  "narrow", "contrastive"
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

var experimentTools = [
  "amboss", "amboss", "amboss", "amboss",
  "besen", "besen", "besen", "besen",
  "bohrer", "bohrer", "bohrer", "bohrer",
  "bürste", "bürste", "bürste", "bürste",
  "feile", "feile", "feile", "feile",
  "hammer", "hammer", "hammer", "hammer",
  "nagel", "nagel", "nagel", "nagel",
  "pinsel", "pinsel", "pinsel", "pinsel",
  "rolle", "rolle", "rolle", "rolle",
  "säge", "säge", "säge", "säge",
  "schaufel", "schaufel", "schaufel", "schaufel",
  "schere", "schere", "schere", "schere",
  "schraube", "schraube", "schraube", "schraube",
  "zange", "zange", "zange", "zange",
  "zirkel", "zirkel", "zirkel", "zirkel",
  "amboss", "amboss", "amboss", "amboss",
  "besen", "besen", "besen", "besen",
  "bohrer", "bohrer", "bohrer", "bohrer",
  "bürste", "bürste", "bürste", "bürste",
  "feile", "feile", "feile", "feile",
  "hammer", "hammer", "hammer", "hammer",
  "nagel", "nagel", "nagel", "nagel",
  "pinsel", "pinsel", "pinsel", "pinsel",
  "rolle", "rolle", "rolle", "rolle",
  "säge", "säge", "säge", "säge",
  "schaufel", "schaufel", "schaufel", "schaufel",
  "schere", "schere", "schere", "schere",
  "schraube", "schraube", "schraube", "schraube",
  "zange", "zange", "zange", "zange",
  "zirkel", "zirkel", "zirkel", "zirkel"
];

var experimentObjects = [
  "neene", "neene", "neene", "neene",
  "naane", "naane", "naane", "naane",
  "maane", "maane", "maane", "maane",
  "loone", "loone", "loone", "loone",
  "laane", "laane", "laane", "laane",
  "waane", "waane", "waane", "waane",
  "noome", "noome", "noome", "noome",
  "meeme", "meeme", "meeme", "meeme",
  "moome", "meeme", "meeme", "meeme",
  "seeme", "seeme", "seeme", "seeme",
  "soome", "soome", "soome", "soome",
  "woome", "woome", "woome", "woome",
  "neese", "neese", "neese", "neese",
  "meese", "meese", "meese", "meese",
  "maase", "maase", "maase", "maase",
  "seese", "seese", "seese", "seese",
  "saase", "saase", "saase", "saase",
  "woose", "woose", "woose", "woose",
  "noole", "noole", "noole", "noole",
  "naale", "naale", "naale", "naale",
  "leele", "leele", "leele", "leele",
  "loole", "loole", "loole", "loole",
  "laale", "laale", "laale", "laale",
  "weele", "weele", "weele", "weele",
  "moowe", "moowe", "moowe", "moowe",
  "soowe", "soowe", "soowe", "soowe",
  "saawe", "saawe", "saawe", "saawe",
  "leewe", "leewe", "leewe", "leewe",
  "weewe", "weewe", "weewe", "weewe",
  "waawe", "waawe", "waawe", "waawe"
];

var experimentFocus = [
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective"
];

var experimentCompetitors = [
  "zange", "na", "na", "woose",
  "amboss", "na", "na", "seeme",
  "schaufel", "na", "na", "soowe",
  "schere", "na", "na", "waawe",
  "bürste", "na", "na", "seese",
  "feile", "na", "na", "noole",
  "hammer", "na", "na", "weele",
  "nagel", "na", "na", "saase",
  "pinsel", "na", "na", "saawe",
  "rolle", "na", "na", "naane",
  "säge", "na", "na", "leele",
  "besen", "na", "na", "leewe",
  "bohrer", "na", "na", "loole",
  "schraube", "na", "na", "naale",
  "besen", "na", "na", "weewe",
  "zirkel", "na", "na", "laane",
  "zirkel", "na", "na", "meeme",
  "amboss", "na", "na", "neene",
  "zange", "na", "na", "waane",
  "bohrer", "na", "na", "meese",
  "bürste", "na", "na", "soome",
  "feile", "na", "na", "neese",
  "hammer", "na", "na", "moowe",
  "schaufel", "na", "na", "noome",
  "pinsel", "na", "na", "laale",
  "rolle", "na", "na", "maane",
  "säge", "na", "na", "moome",
  "nagel", "na", "na", "woome",
  "schere", "na", "na", "maase",
  "schraube", "na", "na", "loone"
];

// randomise the experiment items lists
counter = experimentObjects.length-1;
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

var trainingSequences = 8;

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



