var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('react/lib/Object.assign');
var Teoria = require('Teoria');
var CHANGE_EVENT = 'change';
var ActionTypes = require('../constants/FretboardConstants').ActionTypes;
var _state = {};


var FretboardStore = objectAssign(EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  get: function(key) {
    return _state[key];
  },

  getState: function() {
    return _state;
  },
  // maps chord or scale to a note array
  getActiveNotes: function(data){
    var activeNotes = [];
    var data = data || _state;
    
    switch(data.mode){
        case "chord":
            activeNotes = Teoria.chord( data.tonic + data.name )
                                .notes()
                                .map(function(note){ return note.name()});
            break;
        case "scale":
            activeNotes = Teoria.scale( data.tonic, data.name )
                                .notes()
                                .map(function(note){ return note.name()});
            break;
        default:
            activeNotes = [];
    }
    console.log(activeNotes)
    return activeNotes;
  }
});


FretboardStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  
  if (process.env.NODE_ENV == "development") console.log("Store:", action);
  
  switch(action.type) {
    case ActionTypes.RECEIVE_INITIAL_STATE:
      _state = objectAssign( action.payload,
                       { 
                         loaded:true,
                         activeNotes:FretboardStore.getActiveNotes(action.payload)
                       });
      FretboardStore.emitChange();
      break;

    case ActionTypes.UPDATE_STATE:

      _state = objectAssign( 
        objectAssign( _state, action.payload ), 
        {activeNotes: FretboardStore.getActiveNotes()} 
      );
      
      FretboardStore.emitChange();
      break;

    default:
      // do nothing
  }

});


module.exports = FretboardStore;