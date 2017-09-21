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
  "moome", "moome", "moome", "moome",
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
var randomize = function(tools, objects, focus, competitors) {

  console.log("compiling new list");
  counter = experimentObjects.length-1;
  while (counter > -1) {

    // draw random number
    let randomIndex = Math.floor(Math.random() * counter);

    // swap item at counter with item at random index
    let tempTool = tools[counter];
    let tempObject = objects[counter];
    let tempFocus = focus[counter];
    let tempCompetitor = competitors[counter];

    tools[counter] = tools[randomIndex];
    tools[randomIndex] = tempTool;
    objects[counter] = objects[randomIndex];
    objects[randomIndex] = tempObject;
    focus[counter] = focus[randomIndex];
    focus[randomIndex] = tempFocus;
    competitors[counter] = competitors[randomIndex];
    competitors[randomIndex] = tempCompetitor;

    counter--;
  }

  // check for valid randomisation
  // if randomisation is not valid, get a new one!
  for (var k = 0; k < tools.length; k++) {
    if (tools[k] == tools[k+1] // Adjacent tools must not be the same
      || objects[k] == objects[k+1] ) {// Adjacent objects must not be the same
      randomize(experimentTools, experimentObjects, experimentFocus, experimentCompetitors);
      break;
    }
    // if list is through and you're still in the loop
    // you can choose this list write this to a file
    if (k == tools.length-1) {
      experimentTools = tools;
      experimentObjects = objects;
      experimentFocus = focus;
      experimentCompetitors = competitors;

      // save the data to a file
      var dt = new Date($.now());
      var fileName = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate() + "_" 
        + dt.getHours() + "-" + dt.getMinutes() + "-" + dt.getSeconds() + ".txt";
      itemsList = "";

      console.log(experimentTools.length);

      for (var m = 0; m < experimentTools.length; m++) {
        itemsList = itemsList + experimentObjects[m] + "," + experimentTools[m] + "," + experimentCompetitors[m] + "," + experimentFocus[m];
        if (m < experimentTools.length-1) {
          itemsList = itemsList + "\n";
        }
      }
      var blob = new Blob([itemsList], {type: "text/plain;charset=utf-8"});
      saveAs(blob, fileName);
    }
  }
}

randomize(experimentTools, experimentObjects, experimentFocus, experimentCompetitors);

console.log(experimentTools);
console.log(experimentObjects);

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



