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
    
	$('#continue-btn').on('click', function() {
		exp.getNextView();
	});
	return view;
};

var initTrialView = function(tools, objects) {
	var view = {};
	view.name = 'trial';
	view.template = $('#training-trial-templ').html();
	var rendered = Mustache.render(view.template);
	$('#main').html(rendered);
	
	var i = 0;
	var j = 0;
	var currentTool = tools[1];
	var currentObject = objects[1];
	
	$("#object").html('<img src="img/' + objects[j] + '.png" width="180px"/>');
	
	$(document).keypress(function(e){
	  
	  if (e.keyCode == 49) { // key '1'

	    $("#robiX-tool").html('<img src="img/' + tools[i] + '.png" width="150px"/>');

      // tool and robi enter the room
	    $("#robiX-tool").animate({ 
        left: "+=600px",
      }, 2500);
      $("#robiX").animate({ 
        left: "+=600px",
      }, 2500);
      
      // robi stays there for some time then moves back
      setTimeout(function() {
        $("#robiX").animate({ 
          left: "-=600px",
        }, 1000);
      }, 3000);
      
      // second robi entries the room and asks the question
      // ...
      
    } else if (e.keyCode == 50) { // key '2'
      
      // second robi moves to the object and gets the tool
      $("#robiX-tool").animate({ 
        left: "-=600px",
      }, 0);
       
    } else if (e.keyCode == 51) { // key '3'
    
      // get a new tool
      if (i < tools.length-1) {
        i++;
        currentTool = tools[i];
      } else {
        // ...?
      }
      
      // get a new object
      if (j < objects.length-1) {
        j++;
        currentObject = objects[j];
        $("#object").html('<img src="img/' + objects[j] + '.png" width="180px"/>');
      } else {
        exp.getNextView();
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
