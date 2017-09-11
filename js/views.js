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

var tool_destination = 790;
var robiX_destination = 670;
var robiY_first_stop = 180;
var robiY_second_stop = 680;

var initPresentationView = function() {

  /* specifies how long the parts of the introductory
  presentation are displayed */
  displayTime = 1200;
   
  var view = {};
  view.name = 'presentation';
  view.template = $('#presentation-templ').html();
  var rendered = Mustache.render(view.template);
  $('#main').html(rendered);

  // sequence of introduction presentation steps
  setTimeout(function() {
      $("#introduce-robots").hide();
      $("#introduce-workshop").fadeIn("slow");
    }, displayTime);
    
    // comment this for faster testing
    /*setTimeout(function() {
      $("#introduce-workshop").hide();
      $("#introduce-all-objects").fadeIn("slow");
      var objects = ["Maame", "Wiele", "Loole"];
      var i = 0;
      loopObjects();
      function loopObjects() {
        setTimeout(function() {
          $("#introduce-all-objects").html(objects[i]);
          i++;
          if (i <= objects.length) {
            loopObjects();
          } else {
            $("#introduce-all-objects").hide();
            $("#introduction-end").fadeIn("slow");
          }
        }, 1000);
      }
    }, displayTime*3);*/

    // uncomment this for faster testing
    //
    $("#introduction-end").fadeIn("slow");

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

  // audio
  var audioElement = document.createElement('audio');

  // load initial robi pictures
  $("#robiX").html('<img src="img/robots/robiX.png" width="290px" id="robiX-image"/>');
  $("#robiY").html('<img src="img/robots/robiY-armdown.png" width="320px" id="robiY-image"/>');

  // count objects
  var j = 0;
  
  // count scores
  var scores = 0;

  // load the first tool & object
  $("#robiX-tool").html('<img src="img/tools/' + tools[j] + '.png" width="300px"/>');
  $("#object").html('<img src="img/objects/' + objects[j] + '.png" width="250px"/>');
  $("#sign").html(firstCap(objects[j]));

  // keypress actions (1, 2, 3)
  $(document).keydown(function(e){

    if (e.keyCode == 49) { // key '1'

      // door opens
      door("open");

      // robiX enters the room with tool
      $("#robiX-tool").animate({ 
        left: tool_destination
      }, 1000);

      $("#robiX").animate({ 
        left: robiX_destination
      }, 1000);

      // robiX puts down the tool on the object
      setTimeout(function() {
        /* very important for use in firefox: alter src attribute
        instead of hide/show of div or .html() */
        $("#robiX-image").attr("src", "img/robots/robiX-armout.png");
        $("#robiX-tool").stop().css({
          top: 230,
          left: tool_destination + 40
        });
      }, 1500);

      // robiX stays there for some time then moves back
      setTimeout(function() {
        $("#robiX-image").attr("src", "img/robots/robiX.png");
        $("#robiX").stop().animate({
          left: -390
        }, 1000);
      }, 2500);

      
      // door closes
      setTimeout(function() {
        door("close");
      }, 2700); 

      // robiY enters the scene (outside room) and asks the question
      setTimeout(function() {
        $("#robiY").stop().animate({ 
          left: robiY_first_stop
        }, 1000);
      },  3500);
      
      // display thought bubble and animate mouth
      setTimeout(function() {
        populateBubble(focus[j], tools[j], objects[j], competitors[j]);
        $("#bubble").fadeIn("slow");
        
        /* todo: 
        * - play sound 
        */
        if (focus[j] === "broad") {
          audioElement.setAttribute('src', "audio/" + focus[j] + ".mp3");
        } else if (focus[j] === "narrow") {
          audioElement.setAttribute('src', "audio/" + tools[j] + "-" + focus[j] + ".mp3");
        } else {
          audioElement.setAttribute('src', "audio/" + objects[j] + "-" + focus[j] + ".mp3");
        }
        //audioElement.play();
        
        setTimeout(function() {
          moveMouthStart()
        }, 300);
        moveMouthStop(2300);
      }, 5000);

      // display sentence which the participant is supposed to say
      setTimeout(function() {
        // make sure that RobiY smiles again
        $("#robiY-image").attr("src", "img/robots/robiY-armdown.png");
        $("#sentence").html("<br><br>" + constructSentence(tools[j], objects[j]));
        $("#sentence").fadeIn("slow");
      }, 6500);

    } else if (e.keyCode == 50) { // key '2'

      $("#sentence").fadeOut("fast");
      $("#bubble").fadeOut("fast");
      
      // door opens
      door("open");
      
      // second robi moves to the object
      $("#robiY").stop().animate({ 
        left: robiY_second_stop,
        top: 215
      }, 1500);

      // gets the tool
      setTimeout(function() {
        $("#robiY-image").attr("src", "img/robots/robiY-armout.png");
      }, 1500);

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
      }, 2000);

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
      }, 3000);

      setTimeout(function() {
          $("#robiX-tool").stop().animate({
            top: 200
          }, 0);
          // door closes
          door("close");
      }, 4000);

    } else if (e.keyCode == 51) { // key '3'

      $("#curtain-wall").fadeIn("fast")
      
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
            });
            scores = 0;
            $("#scores-number").html(scores);
          }
          $("#object").html('<img src="img/objects/' + objects[j] + '.png" width="250px"/>');
          $("#sign").html(firstCap(objects[j]));
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
        $("#curtain-wall").fadeOut("slow");
      }, 1000)
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
    || tool === "stift") {
    determiner1 = "den";
  } else if (tool === "lineal") {
    determiner1 = "das";
  }
  if (object === "hocker"
    || object === "tisch" 
    || object === "stuhl" ) {
    determiner2 = "den";
  }
  return "Er hat " + determiner1 + " " + firstCap(tool) + " auf " + determiner2 + " " + firstCap(object) + " gelegt.";
}

/* Capitalises the first letter of a string 
and returns the whole string */
function firstCap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function populateBubble(focus, tool, object, competitor) {
  $("#bubble-content").css({top: -30});
  if (focus === "background") {
    $("#bubble-content").css({
      top: -100
    });
    $("#bubble-content").html("<div style='position: relative; top: 44px'><img src='img/tools/" + competitor + ".png' width='100px'/></div>" +
      "<img src='img/objects/" + object + ".png' width='100px'/><br>?");
  } else if (focus === "broad") {
     $("#bubble-content").html("<br>?");
  } else if (focus === "narrow") {
    $("#bubble-content").html("<img src='img/tools/" + tool + ".png' width='100px'/>" + "<br>wo?");
  } else if (focus === "corrective") {
    $("#bubble-content").css({top: -100});
    $("#bubble-content").html("<div style='position: relative; top: 44px'><img src='img/tools/" + tool + ".png' width='100px'/></div>" +
      "<img src='img/objects/" + competitor + ".png' width='100px'/><br>?");
  }
}

moveMouthStart = function() {
  mouthInterval = setInterval(function() {
    setTimeout(function() { $("#robiY-image").attr("src", "img/robots/robiY-talking1.png"); }, 75);
    setTimeout(function() { $("#robiY-image").attr("src", "img/robots/robiY-talking2.png"); }, 150);
  }, 225);
}

moveMouthStop = function(timeLag) {
  setTimeout(function() {
    $("#robiY-image").attr("src", "img/robots/robiY-armdown.png");
    clearTimeout(mouthInterval);
   }, timeLag);
}

door = function(action) {
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
