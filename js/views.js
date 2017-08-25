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
	var view = {};
	view.name = 'presentation';
	view.template = $('#presentation-templ').html();
	var rendered = Mustache.render(view.template);
	$('#main').html(rendered);
	
	displayTime = 1200;
	
	/* sequence of introduction presentation steps */
	setTimeout(function() {
      $("#introduce-robots").hide();
      $("#introduce-workshop").fadeIn("slow");
    }, displayTime);
    
    // uncomment this
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
    
    // delete this
    $("#introduction-end").fadeIn("slow");
    
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
	
	var i = 0;
	var j = 0;
	
	$("#robiX-tool").html('<img src="img/' + tools[i] + '.png" width="150px"/>');
	$("#object").html('<img src="img/' + objects[j] + '.png" width="180px"/>');
	
	$(document).keydown(function(e){
	  
	  if (e.keyCode == 49) { // key '1'

      /* tool and robiX enter the room
      robiX puts down the tool */
	    $("#robiX-tool").stop().animate({ 
        left: "+=820px"
      }, 1500);
      
      $("#robiX").stop().animate({ 
        left: "+=820px"
      }, 1500);
      
      setTimeout(function() {
        $("#robiX").html('<img src="img/robiX-armout.png" width="300px"/>');
        $("#robiX-tool").stop().css({
          top: 230,
          left: 700
        });
      }, 1500);
      
      // robiX stays there for some time then moves back
      setTimeout(function() {
        $("#robiX").html('<img src="img/robiX.png" width="300px"/>');
        $("#robiX").stop().animate({ 
          left: "-320px"
        }, 1000);
      }, 3000);
      
      // robiY enters the scene and asks the question
      setTimeout(function() {
        $("#robiY").stop().animate({ 
          left: "+=390px"
        }, 2000);
      }, 5000);
      
    } else if (e.keyCode == 50) { // key '2'
      
      // second robi moves to the object
      $("#robiY").stop().animate({ 
        left: "+=430px",
        top: "220px"
      }, 1500);
      
      // gets the tool
      setTimeout(function() {
        $("#robiY").html('<img src="img/robiY-armout.png" width="300px"/>');
      }, 2000);
      
      // holds it up in the air
      setTimeout(function() {
        $("#robiY").html('<img src="img/robiY-armup.png" width="300px"/>');
        $("#robiX-tool").css({
          top: "-=50",
          left: "-=50"
        });
      }, 3000);
        
      // leaves the room with the tool
      setTimeout(function() {
          $("#robiX-tool").stop().animate({ 
            left: -160,
            top: "-=40px"
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
    
      $("#robiY").html('<img src="img/robiY-armdown.png" width="300px"/>');
    
      // get a new tool
      i++;
      if (i < tools.length) {
        $("#robiX-tool").html('<img src="img/' + tools[i] + '.png" width="150px"/>'); 
      } else {
        // ...?
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
