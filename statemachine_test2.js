// Provides the state machine descriptions and creates a new game

//First, load in all of our images
var loadCounter = 0;
var totalImg = 0;

var candy = new Image();
totalImg++;
candy.onload = function() {
  loadCounter++;
}
candy.src = 'imgs/candy.png';

var specialcandy = new Image();
totalImg++;
specialcandy.onload = function() {
  loadCounter++;
}
specialcandy.src = 'imgs/candy2.png';

var kids = new Image();
totalImg++;
kids.onload = function() {
  loadCounter++;
}
kids.src = 'imgs/kids.png';

var kid = new Image();
totalImg++;
kid.onload = function() {
  loadCounter++;
}
kid.src = 'imgs/kid.png';

var crosshair = new Image();
totalImg++;
crosshair.onload = function() {
  loadCounter++;
}
crosshair.src = 'imgs/crosshair.png';

// function for randomly generating position
// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Score multiplier, so you get bonuses for multiple hits
var multiplier = 1;

//Create our actors and their FSMs
var kidscrowd = new Actor({
  name: "kidscrowd",
  height: 100,
  width: 100,
  x: 150,
  y: 200,
  img: kids
}); 

var sight = new Actor({
  name: "sight",
  height: 50,
  width: 50,
  x: 175,
  y: 125,
  img: crosshair
}); 

var kidrunning = new Actor({
  name: "kid",
  height: 80,
  width: 60,
  x: 150,
  y: 200,
  img: null
}); 

var target1 = new Actor({
  name: "target1",
  height: 30,
  width: 30,
  x: getRandomIntInclusive(0,350),
  y: getRandomIntInclusive(0,200),
  img: candy
}); 

var target2 = new Actor({
  name: "target2",
  height: 30,
  width: 30,
  x: getRandomIntInclusive(0,350),
  y: getRandomIntInclusive(0,200),
  img: candy
}); 

var target3 = new Actor({
  name: "target3",
  height: 30,
  width: 30,
  x: getRandomIntInclusive(0,350),
  y: getRandomIntInclusive(0,200),
  img: candy
}); 

var target4 = new Actor({
  name: "target4",
  height: 30,
  width: 30,
  x: getRandomIntInclusive(0,350),
  y: getRandomIntInclusive(0,200),
  img: candy
}); 

var targetSpecial = new Actor({
  name: "targetSpecial",
  height: 30,
  width: 30,
  x: getRandomIntInclusive(0,350),
  y: getRandomIntInclusive(0,200),
  img: specialcandy
}); 


kidscrowd.setFSM('start', { 
    'start': { }
});

targetFSM = {
    'ready': {
        'tick': {
            actions: [{ func: Actions.changeImg,
                        params: { img: candy }},
                      { func: function(event, params, actor){
                            var coords =  { targetAbsoluteX: getRandomIntInclusive(0,350),
                                            targetAbsoluteY: getRandomIntInclusive(0,200) };
                            Actions.moveTo(event, coords, actor); 
                        },
                      }],
            endState: 'ready'
        },
        'message': {
            predicate: function(event, actor){ 
                return event.message == "boom" },
            actions: [{ func: Actions.changeImg,
                        params: { img: null }},
                      { func: function(event, params, actor){
                             var score_ele = document.getElementById("score");
                             var score = parseInt(score_ele.innerHTML) + (100 * multiplier);
                             score_ele.innerHTML = "" + score;},
                      },
                      { func: function(event, params, actor){
                          multiplier += 1;
                          setTimeout(function(){ 
                              multiplier -= 1;
                          }, 1000);
                          setTimeout(function(){ 
                              actor.parent.directDispatch({type: 'tick'}, actor);
                          }, 300);
                      }}],
            endState: 'exploded'
        }
    },
    'exploded': {
        'tick': {
            actions: [{ func: Actions.changeImg,
                        params: { img: candy }},
                      { func: function(event, params, actor){
                            var coords =  { targetAbsoluteX: getRandomIntInclusive(0,350),
                                            targetAbsoluteY: getRandomIntInclusive(0,200) };
                            Actions.moveTo(event, coords, actor); 
                        },
                      }],
            endState: 'ready'
        }
    }
};

targetSpecialFSM = {
    'ready': {
        'tick': {
            actions: [{ func: Actions.changeImg,
                        params: { img: specialcandy }},
                      { func: function(event, params, actor){
                            var coords =  { targetAbsoluteX: getRandomIntInclusive(0,350),
                                            targetAbsoluteY: getRandomIntInclusive(0,200) };
                            Actions.moveTo(event, coords, actor); 
                        },
                      }],
            endState: 'ready'
        },
        'message': {
            predicate: function(event, actor){ 
                return event.message == "boom" },
            actions: [{ func: Actions.changeImg,
                        params: { img: null }},
                      { func: function(event, params, actor){
                             var score_ele = document.getElementById("score");
                             var score = parseInt(score_ele.innerHTML) + 1000;
                             score_ele.innerHTML = "" + score;},
                      },
                      { func: function(event, params, actor){
                          multiplier += 1;
                          setTimeout(function(){ 
                              multiplier -= 1;
                          }, 1000);
                          setTimeout(function(){ 
                              actor.parent.directDispatch({type: 'tick'}, actor);
                          }, 300);
                      }}],
            endState: 'exploded'
        }
    },
    'exploded': {
        'tick': {
            actions: [{ func: Actions.changeImg,
                        params: { img: specialcandy }},
                      { func: function(event, params, actor){
                          console.log("here");
                            var coords =  { targetAbsoluteX: getRandomIntInclusive(0,350),
                                            targetAbsoluteY: getRandomIntInclusive(0,200) };
                            Actions.moveTo(event, coords, actor); 
                        },
                      }],
            endState: 'ready'
        }
    }
};

target1.setFSM('ready', targetFSM);
target2.setFSM('ready', targetFSM);
target3.setFSM('ready', targetFSM);
target4.setFSM('ready', targetFSM);
targetSpecial.setFSM('ready', targetSpecialFSM);

kidrunning.setFSM('start', { 
    'start': {
        'buttonpress': {
            predicate: function(event, actor){ 
                return event.target.id == "fire" },
            actions: [{ func: Actions.changeImg,
                        params: { img: kid }},
                      { func: Actions.runAnim,
                        params: { movingActor: kidrunning,
                                  targetActor: sight,
                                  duration: 2000,
                                  passOverMessage: "boom",
                                  endMessage: "hit"}}
                        ],
            endState: "start",
        },
        "message": {
            predicate: function(event, actor){ 
                return event.message == "hit" },
            actions: [{ func: Actions.moveTo,
                        params: { targetAbsoluteX: 150,
                                  targetAbsoluteY: 200 }}],
            endState: "start",
        },
        "animstart": {
            actions: [{ func: Actions.changeImg,
                        params: { img: kid }}], 
            endState: "start"
        },
        "animmove": {
            actions: [{ func: Actions.followEventPosition }],
            endState: "start"
        },
        "animend": {
            actions: [{ func: Actions.followEventPosition },
                      { func: Actions.changeImg },
                      { func: Actions.moveTo,
                        params: { targetAbsoluteX: 150,
                                  targetAbsoluteY: 200 }}],
            endState: "start"
        }
        
    }

});

sight.setFSM('unfocused', { 
    'unfocused': {
        "mousedown": {
            actions: [{ func: Actions.getDragFocus }],
            endState: "focused"
        }
    },
    'focused': {
        "dragmove": {
            actions: [{ func: Actions.followEventPosition }],
            endState: "focused"
        },
        "dragend": {
            actions: [{ func: Actions.dropDragFocus  },
                      { func: Actions.changeImg,
                        params: { img: crosshair }}],
            endState: "unfocused"
        }
    }
});

//When the DOM has loaded, actually setup our game
window.onload = function() { 
  var game = new Game(document.getElementById("game"));
  game.addActor(targetSpecial);
  game.addActor(target1);
  game.addActor(target2);
  game.addActor(target3);
  game.addActor(target4);
  game.addActor(kidscrowd);
  game.addActor(kidrunning);
  game.addActor(sight);

  document.getElementById("fire").addEventListener("click", function(event) {
    event = _.clone(event);
    event.type = "buttonpress";
    game.dispatchToAll(event);
  });
  
  //Wait for all of the images to load in before we start the game
  var runGame = function() {
    if (loadCounter >= totalImg) {
      game.run();
    }
    else {
      setTimeout(function() { runGame() }, 200);
    }
  }
  runGame();

  // Move the candies every 5 secs, and the special candy every 2 secs
  setInterval(function(){ 
        target1.parent.directDispatch({type: 'tick'}, target1);
  }, 5000);

  setInterval(function(){ 
        target2.parent.directDispatch({type: 'tick'}, target2);
  }, 5000);

  setInterval(function(){ 
        target3.parent.directDispatch({type: 'tick'}, target3);
  }, 5000);

  setInterval(function(){ 
        target4.parent.directDispatch({type: 'tick'}, target4);
  }, 5000);

  setInterval(function(){ 
      targetSpecial.parent.directDispatch({type: 'tick'}, targetSpecial);
  }, 2000);

};



