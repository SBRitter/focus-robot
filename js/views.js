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
    setTimeout(function() {
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
    }, displayTime*3);

    // uncomment this for faster testing
    //$("#introduction-end").fadeIn("slow");

  $('#continue-btn').on('click', function() {
    exp.getNextView();
  });
  return view;
};

var initTrialView = function(tools, objects) {

  var view = {};
  view.name = 'trial';
  view.template = $('#trial-templ').html();
  var rendered = Mustache.render(view.template);
  $('#main').html(rendered);

  // load initial robi pictures
  $("#robiX").html('<img src="img/robiX.png" width="300px" id="robiX-image"/>');
  $("#robiY").html('<img src="img/robiY-armdown.png" width="300px" id="robiY-image"/>');

  // count...
  // ...tools	
  var i = 0;
  // ...objects
  var j = 0;

  // load the first tool & object
  $("#robiX-tool").html('<img src="img/' + tools[i] + '.png" width="150px"/>');
  $("#object").html('<img src="img/' + objects[j] + '.png" width="180px"/>');

  // keypress actions (1, 2, 3)
  $(document).keydown(function(e){

    if (e.keyCode == 49) { // key '1'

      // robiX enters the room with tool
      $("#robiX-tool").animate({ 
        left: 680
      }, 1000);

      $("#robiX").animate({ 
        left: 520
      }, 1000);

      // robiX puts down the tool on the object
      setTimeout(function() {
        /* very important for use in firefox: alter src attribute
        instead of hide/show of div or .html() */
        $("#robiX-image").attr("src", "img/robiX-armout.png");
        $("#robiX-tool").stop().css({
          top: 230,
          left: 700
        });
      }, 2000);

      // robiX stays there for some time then moves back
      setTimeout(function() {
        $("#robiX-image").attr("src", "img/robiX.png");
        $("#robiX").stop().animate({ 
          left: -320
        }, 1000);
      }, 3000);

      // robiY enters the scene (outside room) and asks the question
      setTimeout(function() {
        $("#robiY").stop().animate({ 
          left: 90
        }, 2000);
      },  4000);

      /* todo: 
      * - animate mouth
      * - play sound ("wo hat er den hammer hingelegt?"
      * - display sentence ("er hat den hammer auf die maame gelegt.")
      */
      
    } else if (e.keyCode == 50) { // key '2'

      // second robi moves to the object
      $("#robiY").stop().animate({ 
        left: 520,
        top: 220
      }, 1500);

      // gets the tool
      setTimeout(function() {
        $("#robiY-image").attr("src", "img/robiY-armout.png");
      }, 2000);

      // holds it up in the air
      setTimeout(function() {
        $("#robiY-image").attr("src", "img/robiY-armup.png");
        $("#robiX-tool").css({
          top: 180,
          left: 650
        });
      }, 3000);

      // leaves the room with the tool
      setTimeout(function() {
          $("#robiX-tool").stop().animate({ 
            left: -160,
            top: 140
          }, 1000);
          $("#robiY").stop().animate({ 
            left: -300,
            top: 180
          }, 1000);
      }, 4000);

      setTimeout(function() {
          $("#robiX-tool").stop().animate({
            top: 200
          }, 0);
      }, 5000);

    } else if (e.keyCode == 51) { // key '3'

      $("#robiY-image").attr("src", "img/robiY-armdown.png");

      // get a new tool
      i++;
      if (i < tools.length) {
        $("#robiX-tool").html('<img src="img/' + tools[i] + '.png" width="150px"/>'); 
      } else {
        console.log("no more tools.");
      }

      // get a new object
      j++;
      if (j < objects.length) {
        $("#object").html('<img src="img/' + objects[j] + '.png" width="180px"/>');
      } else {
        // when all objects are through, go to next view
        exp.getNextView();
        j = 0;
      }	
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
