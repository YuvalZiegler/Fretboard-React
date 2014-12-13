var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('react/lib/Object.assign');
var CHANGE_EVENT = 'change';
var ActionTypes = require('../constants/AppConstants').ActionTypes;
var Utils = require('../utilities/FretboardUtilityFunctions')
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
  
  update_root: function(payload){
    var spacer = _state.name.indexOf(" ") > 0 ? " " : "";
    var newName = payload.root + spacer +  Utils.extractSymbol(_state.name)
    _state = objectAssign( _state, {name:newName} )
  }
});


FretboardStore.dispatchToken = AppDispatcher.register(function(payload) {
  
  console.log("❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤")
  console.log("❤ ︎ STORE      :: " +  payload.source + " :: " + payload.action.type)
  console.log("❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤")
  
  var action = payload.action;
  
  switch(action.type) {
    case ActionTypes.UPDATE_ROOT:
      FretboardStore.update_root(action.payload)
      break
    case ActionTypes.RECEIVE_INITIAL_STATE:
    case ActionTypes.UPDATE_STATE:
      _state = objectAssign( _state, action.payload )
      FretboardStore.emitChange();
      break;

    default:
      // do nothing
  }
  
  FretboardStore.emitChange();

});


module.exports = FretboardStore;