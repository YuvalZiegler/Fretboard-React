var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('react/lib/Object.assign');
var Teoria = require('Teoria');
var CHANGE_EVENT = 'change';
var ActionTypes = require('../constants/AppConstants').ActionTypes;
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
  }

});


FretboardStore.dispatchToken = AppDispatcher.register(function(payload) {
  
  console.log( ":: STORE :: ", payload.source, payload.action)

  var action = payload.action;
  
  _state = objectAssign( _state, action.payload )
  
  
  if (process.env.NODE_ENV == "development") console.log("Store:", action);
  

  switch(action.type) {
    case ActionTypes.RECEIVE_INITIAL_STATE:
      FretboardStore.emitChange();
      break;

    case ActionTypes.UPDATE_STATE:
      FretboardStore.emitChange();
      break;

    default:
      // do nothing
  }

});


module.exports = FretboardStore;