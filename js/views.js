var j = 0;
var scores = 0;
var data = null;
var skipIntro = "off";

var openFile = function(event) {
  var input = event.target;
  var reader = new FileReader();
  var text;
  reader.onload = function(e){
    text = reader.result;
    data = text.split("\n");
  };
  reader.readAsText(input.files[0]);
};

var processData = function() {
  console.log(data);
  var line;
  for (var l = 0; l < data.length; l++) {
    line = data[l].split(",");
    experimentObjects[l] = line[0];
    experimentTools[l] = line[1];
    experimentCompetitors[l] = line[2];
    experimentFocus[l] = line[3];
  }
  allTools = trainingTools.concat(experimentTools);
  allObjects = trainingObjects.concat(experimentObjects);
  allFocus = trainingFocus.concat(experimentFocus);
  allCompetitors = trainingCompetitors.concat(experimentCompetitors);
}

var initConfigView = function() {
  var view = {};
  view.name = 'config';
  view.template = $('#config-templ').html();
  var rendered = Mustache.render(view.template);
  $('#main').html(rendered);

  $('#go-btn').on('click', function() {
    if ($("#start-trial").val() > 0) {
      j = $("#start-trial").val() - 1 + 8;
      scores = $("#start-trial").val() - 1;
    }
    if ($("#skip-intro").is(":checked")) {
      skipIntro =  "on";
    }
    processData();
    exp.getNextView();
  });
  
  return view;
};

var initIntroductionView = function() {
  var view = {};
  view.name = 'intro';
  view.template = $('#intro-templ').html();
  var rendered = Mustache.render(view.template);
  $('#main').html(rendered);
  $('#start-presentation-btn').on('click', function() {
    exp.getNextView();
  });

  return view;
};

var initPresentationView = function(items) {

  var view = {};
  view.name = 'presentation';
  view.template = $('#presentation-templ').html();
  var rendered = Mustache.render(view.template);
  $('#main').html(rendered);
  
  $("#introduce-robots").fadeIn("slow");

  // sequence of introduction presentation steps
  $('#go-to-workshop-btn').on('click', function() {
    $("#introduce-robots").hide();
    $("#introduce-workshop").fadeIn("slow");
  });

  $('#go-to-items-presentation-btn').on('click', function() {
    $("#introduce-workshop").hide();
    setTimeout(function() {
      $("#introduce-all-items").fadeIn("slow");
    }, 600);
    $("#introduce-all-items").html("<h2>" + deDoubleVowel(firstCap(items[0])) + "</h2>" + "<img src='img/objects/" + items[0] + ".png' height='400px'/>");
    var i = 1;
    loopitems();
    function loopitems() {

      setTimeout(function() {
        $("#introduce-all-items").fadeIn("slow");
      }, 600);
      if (i < 34) {
        $("#introduce-all-items").html("<h2>" + deDoubleVowel(firstCap(items[i])) + "</h2>" + "<img src='img/objects/" + items[i] + ".png' height='400px'/>");
      } else {
        $("#introduce-all-items").html("<h2>" + deDoubleVowel(firstCap(items[i])) + "</h2>" + "<img src='img/tools/" + items[i] + ".png' height='400px'/>");
      }

      i++;

      $("#introduce-all-items").append("<br><br><br><p style='text-align: left'><button type='submit' id='next-item-btn' class='btn btn-default'>>></button></p>");
        
      $('#next-item-btn').on('click', function() {
        if (i < items.length) {
          $("#introduce-all-items").fadeOut("fast");
          setTimeout(function(){ loopitems() }, 500);
        } else {
          $("#introduce-all-items").hide();
          $("#introduction-end").fadeIn("slow");
        }
      }); 
    }
  });
  
  $('#continue-btn').on('click', function() {
    exp.getNextView();
  });
  return view;
};

var initTrialView = function(tools, objects, focus, competitors, trainingSequences) {

  var view = {};
  view.name = 'trial';
  view.template = $('#trial-templ').html();
  var rendered = Mustache.render(view.template);
  $('#main').html(rendered);

  $("#scores-number").html(scores);
  
  var tool_destination = 790;
  var robiX_destination = 670;
  var robiY_first_stop = 180;
  var robiY_second_stop = 680;

  // audio
  var audioElement = document.createElement('audio');

  // load initial robi pictures
  $("#robiX").html('<img src="img/robots/robiX.png" width="290px" id="robiX-image"/>');
  $("#robiY").html('<img src="img/robots/robiY-armdown.png" width="320px" id="robiY-image"/>');

  // load the first tool & object
  $("#robiX-tool").html('<img src="img/tools/' + tools[j] + '.png" width="300px"/>');
  $("#object").html('<img src="img/objects/' + objects[j] + '.png" width="250px"/>');
  $("#sign").html(deDoubleVowel(firstCap(objects[j])));

  setTimeout(function() {
    firstMovement();
  }, 2000);
  
  /* "First Movement" 
  * where the red robot comes in and places the obect 
  * and the blue robot comes in and asks his question 
  */
  var firstMovement = function() {
    // door opens
    door("open");

    // robiX enters the room with tool
    // 1. up
    $("#robiX").animate({
      top: 220
    }, 1000);
    $("#robiX-tool").animate({ 
      top: 200
    }, 1000);
    // 2. left
    setTimeout(function() {
      $("#robiX-tool").animate({ 
        left: tool_destination
      }, 1000);
      $("#robiX").animate({
        left: robiX_destination
      }, 1000);
    }, 1500)

    // robiX puts down the tool on the object
    setTimeout(function() {
      setTimeout(function() {
        $("#robiX-tool").css({
          top: 230,
          left: tool_destination + 40
        });
      }, 75);
      /* very important for use in firefox: alter src attribute
      instead of hide/show of div or .html() */
      $("#robiX-image").attr("src", "img/robots/robiX-armout.png");
    }, 2500);

    // robiX stays there for some time then moves back
    setTimeout(function() {
      $("#robiX-image").attr("src", "img/robots/robiX.png");
      $("#robiX").stop().animate({
        left: 90
      }, 800);
    }, 3000);
    setTimeout(function() {
      $("#robiX").stop().animate({
        top: 1000
      }, 1000);
    }, 4000);

    
    // door closes
    setTimeout(function() {
      door("close");
    }, 4000); 

    // robiY enters the scene (outside room) and asks the question
    setTimeout(function() {
      $("#robiY").stop().animate({ 
        left: robiY_first_stop
      }, 1000);
    },  5500);
    
    // display thought bubble and animate mouth
    setTimeout(function() {
      populateBubble(focus[j], tools[j], objects[j], competitors[j]);
      $("#bubble").fadeIn("slow");
      
      // play question
      if (focus[j] === "broad") {
        audioElement.setAttribute('src', "audio/" + focus[j] + ".mp3");
      } else if (focus[j] === "narrow") {
        audioElement.setAttribute('src', "audio/" + tools[j] + "-" + focus[j] + ".mp3");
      } else {
        audioElement.setAttribute('src', "audio/" + objects[j] + "-" + focus[j] + ".mp3");
      }
      audioElement.play();
      
      if (focus[j] === "broad") {
        setTimeout(function() { speak(3) }, 200);
      } else if (focus[j] === "narrow" ) {
        setTimeout(function() { speak(6) }, 200);
      } else {
        setTimeout(function() { speak(8) }, 200);
      }
      
      // for EMA sweep control
      $("#black-field").show();
      setTimeout(function() {
        $("#black-field").hide();
      }, 500)
      
    }, 7000);

    // display sentence which the participant is supposed to say
    setTimeout(function() {
      // make sure that RobiY smiles again
      $("#robiY-image").attr("src", "img/robots/robiY-armdown.png");
      $("#sentence").html("<br><br>" + constructSentence(tools[j], objects[j]));
      $("#sentence").fadeIn("slow");
    }, 8500);
  }
  
  /* "Second Movement"
  * where the blue robot gets the object and leaves
  */
  var secondMovement = function() {
    $("#sentence").fadeOut("fast");
    $("#bubble").fadeOut("fast");

    // for EMA sweep control
      $("#black-field").show();
      setTimeout(function() {
        $("#black-field").hide();
      }, 500)

    // door opens
    door("open");
    
    // second robi moves to the object
    $("#robiY").stop().animate({ 
      left: robiY_second_stop,
      top: 215
    }, 1000);

    // gets the tool
    setTimeout(function() {
      $("#robiY-image").attr("src", "img/robots/robiY-armout.png");
    }, 1000);

    // holds it up in the air
    setTimeout(function() {
      $("#robiY-image").attr("src", "img/robots/robiY-armup.png");
      $("#robiX-tool").css({
        top: 180,
        left: tool_destination - 20
      });
      
      // count points!
      scores++;
      $("#scores-number").html(scores);
      $("#scores-number").animate({top:'-=20px'}, 150);
      $("#scores-number").animate({top:'+=20px'}, 150);
      $("#scores-number").animate({top:'-=10px'}, 110);
      $("#scores-number").animate({top:'+=10px'}, 110);
      $("#scores-number").animate({top:'-=5px'}, 90);
      $("#scores-number").animate({top:'+=5px'}, 90);
    }, 1500);

    // leaves the room with the tool
    setTimeout(function() {
      $("#robiX-tool").stop().animate({ 
        left: -280,
        top: 145
      }, 980);
      $("#robiY").stop().animate({ 
        left: -390,
        top: 180
      }, 1000);
    }, 2000);

    setTimeout(function() {
      $("#robiX-tool").stop().animate({
        top: 980,
        left: 200
      }, 0);
      
      // door closes
      door("close");
    }, 3000);
    
    setTimeout(function() {
      thirdMovement();
    }, 5000);
  }
  
  /* "Third Movement"
  * where everything is set into place again
  * and the next trial is started
  */
  var thirdMovement = function() {
  
    // fancy transition
    var firstTransitionColors = ["#94c7c6","#b094d8","#b5c794", "#d6b6a5"];
    var secondTransitionColors = ["848abd","#8abdbf","#b88796", "#8cc3a5"];
    var firstTransitionColor = firstTransitionColors[Math.floor(Math.random() * firstTransitionColors.length)];
    var secondTransitionColor = secondTransitionColors[Math.floor(Math.random() * secondTransitionColors.length)];
    $("#curtain-wall").fadeIn("slow");
    setTimeout(function() {
      $("#curtain-wall").css({
        transition: 'background-color 1.7s ease-in', "background-color": firstTransitionColor
      });
    }, 200);
    setTimeout(function() {
      $("#curtain-wall").css({
        transition: 'background-color 1.7s ease-in-out', "background-color": secondTransitionColor
      });
    }, 1500);
    setTimeout(function() {
      $("#curtain-wall").css({
        transition: 'background-color 2s ease-in', "background-color": "#FFF"
      });
    }, 3000);
    
    setTimeout(function() {
      $("#robiY-image").attr("src", "img/robots/robiY-armdown.png");

      /* get a new object & and a new tool
      go to next screen if no more objects available*/
      j++;
      if (j < objects.length) {

        /* after the training sequences, display message to inform
        participant that the experiment is about to start */
        if (j === trainingSequences) {
          $("#curtain-wall").hide();
          $("#ready-to-take-off-screen").show();
          $("#start-exp-btn").on('click', function() {
            $("#ready-to-take-off-screen").fadeOut();
            $("#object").html('<img src="img/objects/' + objects[j] + '.png" width="250px"/>');
            $("#sign").html(deDoubleVowel(firstCap(objects[j])));
            setTimeout(function() {
            firstMovement();
          }, 3000);
          });
          scores = 0;
          $("#scores-number").html(scores);
        } else {
          $("#object").html('<img src="img/objects/' + objects[j] + '.png" width="250px"/>');
          $("#sign").html(deDoubleVowel(firstCap(objects[j])));
          setTimeout(function() {
            firstMovement();
          }, 4000);
        }
      } else {
        // when all objects are through, go to next view
        exp.getNextView();
      }

      if (j < tools.length) {
        $("#robiX-tool").html('<img src="img/tools/' + tools[j] + '.png" width="300px"/>'); 
      } else {
        console.log("no more tools.");
      }
    
      $("#sentence").html("");
    }, 500);

    setTimeout(function() {
      $("#curtain-wall").fadeOut(2000);
    }, 4000)
  }

  // keypress actions ('a', 'l')
  $(document).keydown(function(e){
    if (e.keyCode == 65) { // key 'a'
      secondMovement();
    } else if (e.keyCode == 76) { // key 'l' = rescue button
      $("#sentence").hide();
      $("#bubble").hide();
      $("#robiX-tool").css({ 
          left: 200,
          top: 980
        }, 980);
        $("#robiY").css({ 
          left: -390,
          top: 200
      }, 1000);
      $("#curtain-wall").fadeIn("fast");
      $("#robiY-image").attr("src", "img/robots/robiY-armdown.png");
      $("#object").html('<img src="img/objects/' + objects[j] + '.png" width="250px"/>');
      $("#sign").html(deDoubleVowel(firstCap(objects[j])));
      setTimeout(function() {
        $("#curtain-wall").hide();
        firstMovement();
      }, 1000);
    }
  });
  return view;
};

var initReadyToTakeOffView = function() {
  var view = {};
  view.name = 'ready-to-take-off';
  view.template = $('#ready-to-take-off-templ').html();
  var rendered = Mustache.render(view.template);
  $('#main').html(rendered);
  $('#start-experiment-btn').on('click', function() {
    exp.getNextView();
  });
  return view;
};

var initEndView = function() {
  var view = {};
  view.name = 'end';
  view.template = $('#end-templ').html();
  var rendered = Mustache.render(view.template);
  $('#main').html(rendered);
  return view;
};

var constructSentence = function(tool, object) {
  var determiner1 = "die";
  var determiner2 = "die";
  if (tool === "amboss"
    || tool === "hammer"
    || tool === "nagel"
    || tool === "pinsel"
    || tool === "zirkel"
    || tool === "schraubenschlüssel"
    || tool === "stift"
    || tool === "bohrer"
    || tool === "besen") {
    determiner1 = "den";
  } else if (tool === "lineal") {
    determiner1 = "das";
  }
  if (object === "hocker"
    || object === "tisch" 
    || object === "stuhl" ) {
    determiner2 = "den";
  }
  return "Er hat " + determiner1 + " " + firstCap(tool) + " auf " + determiner2 + " " + deDoubleVowel(firstCap(object)) + " gelegt.";
}

/* Capitalises the first letter of a string 
and returns the whole string */
function firstCap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function deDoubleVowel(string) {
  for (var i = 0; i < string.length-1; i++) {
    if ((string.charAt(i) === "a" 
    || string.charAt(i) === "o"
    || string.charAt(i) === "e")
    && string.charAt(i) === string.charAt(i+1)) {
      return string.substring(0,i+1) + "h" + string.substring(i+2,string.length);
    }
  }
  return string
}

function populateBubble(focus, tool, object, competitor) {
  $("#bubble-object-div").show();
  $("#bubble-tool-div").show();
  $("#bubble-tool-div").css({left: 25});
  $("#bubble-text").css({left: 150, top: 100});
  $("#bubble-content").css({"font-size": 72});
  if (focus === "background") {
    $("#bubble-tool").attr("src", "img/tools/" + competitor + ".png");
    $("#bubble-object").attr("src", "img/objects/" + object + ".png");
    $("#bubble-text").html("?");
  } else if (focus === "broad") {
    $("#bubble-tool-div").hide();
    $("#bubble-object-div").hide();
    $("#bubble-text").css({left: 90, top: 80});
    $("#bubble-text").html("?");
  } else if (focus === "narrow") {
    $("#bubble-object-div").hide();
    $("#bubble-tool").attr("src", "img/tools/" + tool + ".png");
    $("#bubble-text").html("wo?");
    $("#bubble-content").css({"font-size": 54});
    $("#bubble-text").css({left: 90, top: 100});
  } else if (focus === "corrective") {
    $("#bubble-tool").attr("src", "img/tools/" + tool + ".png");
    $("#bubble-object").attr("src", "img/objects/" + competitor + ".png");
    $("#bubble-text").html("?");
  }
}

var speak = function(intervals) {
  if (intervals == 0) {
    setTimeout(function() { $("#robiY-image").attr("src", "img/robots/robiY-armdown.png"); }, 0);
  } else {
    setTimeout(function() { $("#robiY-image").attr("src", "img/robots/robiY-talking1.png"); }, 75);
    setTimeout(function() { $("#robiY-image").attr("src", "img/robots/robiY-talking2.png"); }, 150);
    setTimeout(function() { speak(intervals - 1); }, 225);
  }
}

var door = function(action) {
  let left;
  let top;
  let height;
  if (action === "open") {
    left = 650;
    top = 120;
    height = 400;
  } else if (action === "close") {
    left = 570;
    top = 90;
    height = 500;
  }
  $("#door").animate({ 
    left: left,
    top: top
  }, 1100);
  $("#door-img").animate({
    height: height
  }, 1100);
}
