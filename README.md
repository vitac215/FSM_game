# FSM based target game + game engine

A FSM based game and mini game engine written in javascript.

## Installation
It can be accessed on [GitHub page](https://vitac215.github.io/FSM_game/halloween.html).

## Game Control
* <b>Drag</b>
   * Drag the crosshair to the target candy
* <b>Shoot</b>
   * Click the "Run and Catch" button to shoot the target

## Game Engine Usage
* A game is defined by a Game object, which models a game using state machines on an HTML5 Canvas. A game object is composed of several actors, which each have their own state machines.
* The engine handles input and event dispatch (dragging, focus and positional dispatch).
* To use this game engine, the user needs to write the state machines for the game's actors. The state machines will be described in JSON in the following format:
```
  var sampleFSM = {
      "start": {
          // Event type names
          "mousedown": {
              // Actions to be called
              actions: [{
                  func: record_down_location
              }],
          // Predicate to be called (action stops if return false)
              predicate: function(event) {return true},
              // End state name
              endState: "down"
      },
      "down": {
          "mouseup": {
              actions: [{
                  func: do_foo
              }],
              endState: "start"
          },
          "mousemove": {
              actions: [{
                  func: move_bar,
                  params: {bar: 'icon.png'}
              }],
              endState: "down"
          }
      }
  };
```

## TODO
* Keyboard control
