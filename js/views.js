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
	view.template = $('#trial-templ').html();
	var rendered = Mustache.render(view.template);
	$('#main').html(rendered);
	
	var i = 0;
	var j = 0;
	var currentTool = tools[1];
	var currentObject = objects[1];
	
	$("#object").html('<img src="img/' + objects[j] + '.png" width="180px"/>');
	$("#robiX-tool").html('<img src="img/' + tools[i] + '.png" width="150px"/>');
	
	$(document).keypress(function(e){
	  
	  if (e.keyCode == 49) { // key '1'

      /* tool and robi enter the room
      robi puts down the tool */
	    $("#robiX-tool").stop().animate({ 
        left: "+=520px"
      }, 1500);
      $("#robiX").stop().animate({ 
        left: "+=520px"
      }, 1500);
      setTimeout(function() {
        $("#robiX").html('<img src="img/robiX-armout.png" width="300px"/>');
        $("#robiX-tool").stop().css({
          top: 230,
          left: 700
        });
      }, 1500);
      
      // robi stays there for some time then moves back
      setTimeout(function() {
        $("#robiX").stop().animate({ 
          left: "0px"
        }, 1000);
      }, 3000);
      
      // second robi entries the room and asks the question
      // ...
      
    } else if (e.keyCode == 50) { // key '2'
      
      // second robi moves to the object and gets the tool
      // not ready yet
      $("#robiX-tool").stop().animate({ 
        left: 130,
        top: 180
      }, 0);

       
    } else if (e.keyCode == 51) { // key '3'
    
      // get a new tool
      if (i < tools.length-1) {
        i++;
        $("#robiX-tool").html('<img src="img/' + tools[i] + '.png" width="150px"/>');
        $("#robiX").html('<img src="img/robiX-armup.png" width="300px"/>');
    
      } else {
        // ...?
      }
      
      // get a new object
      if (j < objects.length-1) {
        j++;
        $("#object").html('<img src="img/' + objects[j] + '.png" width="180px"/>');
      } else {
        // when all objects are through, go to next view
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

var initEndView = function() {
	var view = {};
	view.name = 'end';
	view.template = $('#end-templ').html();
	var rendered = Mustache.render(view.template);
	$('#main').html(rendered);
	return view;
};
