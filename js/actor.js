/**
 * @constructor
 * @param {props} An object containing properties for the actor
 */
function Actor(props) {
  this.name = props.name; // added by Vita
  this.parent = null; //Set in the game.addActor method
  //TODO add additional properties for each eactor
  this.height = props.height;
  this.width = props.width;
  this.x = props.x;
  this.y = props.y;
  this.img = props.img;
};

/**
 * Sets the FSM for the particular actor. 
 * @param {Object} FSM object as detailed in the instructions
 */
Actor.prototype.setFSM = function(startState, fsm) {
  this.states = fsm;
  this.currentState = startState;
}

/**
 * Recieves an event from dispatch and transitions the FSM appropriately
 * @param {Event} The event object recieved, which includes certain information
 *  depending on the event type
 * @return {boolean} True if the event was consumed by the actor, false if it
 *  was not consumed
 */
Actor.prototype.deliverEvent = function(event) {
  //TODO
  //console.log(event.type);
  var consumed = false;

  // Get all available transitions in this current state for that actor
  var alltrans = this.states[this.currentState];

  for (var i in alltrans) {
    // For each transition
    var trans = alltrans[i];

    //Check if the transition matches that event
    if (event.type == i) {
      // Check predicate
      if (trans.predicate) {
        // If satisfies predicate
        if (!trans.predicate(event, this)) {
          return consumed;
        }    
      }
      consumed = true;
      this.makeTransition(event, trans);
      return consumed;
    }
  }
  return consumed;
}

/**
 * Transitions the FMS for a particular transition and event
 * @param {Event} event object recieved, which includes certain information
 *  depending on the event type
 */
Actor.prototype.makeTransition = function(event, transition) {
  //TODO

  // Execute each action 
  var actions = transition.actions;
  for (var i in actions) {
    var action = actions[i];
    action.func(event, action.params, this);
  }


  // Transition to the endstate
  this.currentState = transition.endState;
  this.parent.onDraw();
}

/**
 * Draws the actor on the canvas based on its parameters
 * @param {Context} The HTML5 canvas context object to be drawn on. 
 */
Actor.prototype.draw = function(context) {
  //TODO
  if (this.img != null) {
    context.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
