var width = window.innerWidth;
var height = window.innerHeight;

var offset, stage, line, figureArea, touchArea, buttonOne, output = {},
  buttonTwo = {},
  mousedown = false;

_init();


function _init() {
  stage = new createjs.Stage("gameCanvas");
  //stage.autoClear = true;
  createjs.Touch.enable(stage);


  stage.canvas.width = width;
  stage.canvas.height = height;

  offset = {
    x: stage.canvas.width / 2,
    y: stage.canvas.height / 2
  };

  stage.mouseMoveOutside = true;
  stage.x = offset.x;
  stage.y = offset.y;

  buttonOne = new createjs.Shape();
  buttonTwo = new createjs.Shape();
  line = new createjs.Shape();

  buttonOne.on("pressmove", function(evt) {
    evt.target.x = evt.stageX - offset.x;
    evt.target.y = evt.stageY - offset.y;
    update(buttonOne, buttonTwo);
  });
  buttonTwo.on("pressmove", function(evt) {
    evt.target.x = evt.stageX - offset.x;
    evt.target.y = evt.stageY - offset.y;
    update(buttonOne, buttonTwo);
  });
  
  var undo = document.getElementById('clear');
  undo.addEventListener("click", undoLine);

  stage.on("stagemousedown", stageMouseDown , null, true);
  stage.on("stagemouseup", stageMouseUp , null, true);
  stage.addChild(line);

  ctx = stage.canvas.getContext('2d');   

  function load(){
    var obj = document.getElementById("dragdrop");
    obj.style.position = "fixed";
    obj.style.top = 50;
    obj.style.left = 10;
  }



  //var backround = new Image();
  //backround.src = "images/graph.png";
  //backround.onload = function(){
  	//ctx.drawImage(backround,0,0);
  //}

      /*window.onload = function() {
        var c = document.getElementById("gameCanvas");
        var ctx = c.getContext("2d");
        var img = document.getElementById("gate");
        ctx.drawImage(img, 10, 10);
      }*/

    
      // start Code droppable
      let currentDroppable = null;

      drop1.onmousedown = function(event) {

      let shiftX = event.clientX - drop1.getBoundingClientRect().left;
      let shiftY = event.clientY - drop1.getBoundingClientRect().top;

      drop1.style.position = 'absolute';
      drop1.style.zIndex = 1000;
      document.body.append(drop1);

      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        drop1.style.left = pageX - shiftX + 'px';
        drop1.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        drop1.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        drop1.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest('.droppable');
        if (currentDroppable != droppableBelow) {
          if (currentDroppable) { // null when we were not over a droppable before this event
            leaveDroppable(currentDroppable);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable) { // null if we're not coming over a droppable now
            // (maybe just left the droppable)
            enterDroppable(currentDroppable);
          }
        }
      }

      document.addEventListener('mousemove', onMouseMove);

      drop1.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        drop1.onmouseup = null;

        /*$(document).on("onmouseup", ".droppable", function(e) {
          bootbox.alert("Hello" function() {
            console.log("Alert Callback");
          });
        });*/

      };

    };

    function enterDroppable(elem) {
      elem.style.background = 'pink';

    }

    function leaveDroppable(elem) {
      elem.style.background = '';  

    }

    drop1.ondragstart = function() {
      return false;
    };
    //end Code dropabble
}


function stageMouseDown(evt) {
  stage.on("stagemousemove", stageMouseMove);
  buttonOne.x = evt.stageX - offset.x;
  buttonOne.y = evt.stageY - offset.y;
  stage.addChild(buttonOne);
  mousedown = true;
  stage.update();
}

  function stageMouseMove(evt) {
  if (mousedown) {
    var posTwo = {
      x: evt.stageX - offset.x,
      y: evt.stageY - offset.y
    }
    update(buttonOne, posTwo);
  }
}

  function stageMouseUp(evt) {
    buttonTwo.x = evt.stageX - offset.x;
    buttonTwo.y = evt.stageY - offset.y;
    stage.addChild(buttonTwo);
    mousedown = false;
  
    buttonOne.graphics.beginFill("rgba(0,0,0,0.3)").drawCircle(0, 0, 5);
    buttonTwo.graphics.beginFill("rgba(0,0,0,0.3)").drawCircle(0, 0, 5);
    update(buttonOne, buttonTwo);
  
    stage.removeAllEventListeners("stagemousemove");
  }

function undoLine() {
	console.log('undo clicked');
	//stage.removeChildAt(stage.children.length - 3);      // undo just the last step
	stage.removeChild(line, buttonOne, buttonTwo);
	stage.update();

	var again = document.getElementById('pressmove');
  	again.addEventListener("pressmove", stageMouseDown);

}



function update(posOne, posTwo) {
  line.graphics.clear().s("#000").ss(2, "round").mt(posOne.x, posOne.y).lt(posTwo.x, posTwo.y);
  stage.update();

  //document.getElementById('clear').addEventListener('click', function() {
  	//line.graphics.clear();
  	//buttonOne.graphics.clear();
  	//buttonTwo.graphics.clear();
  	//stage.update();
  //})

  //stage.on("stagemousedown", stageMouseDown , null, true);
  //stage.on("stagemouseup", stageMouseUp , null, true);


}




