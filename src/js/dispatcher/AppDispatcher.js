var FretboardConstants = require('../constants/AppConstants');
var Dispatcher = require('flux').Dispatcher;
var ActionSources = FretboardConstants.ActionSources;
var objectAssign = require('react/lib/Object.assign');

var AppDispatcher = objectAssign(new Dispatcher(), {

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the server.
   */
  handleServerAction: function(action) {
    
    var payload = {
      source: ActionSources.SERVER_ACTION,
      action: action
    };
    console.log(":: DISPATCHER :: " + payload.source + ": "  , payload.action)
    
    this.dispatch(payload);
    
  },

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the view.
   */
  handleViewAction: function(action) {
    var payload = {
      source:  ActionSources.VIEW_ACTION,
      action: action
    };
    console.log(":: DISPATCHER :: " + payload.source + ": "  +  payload.action.type, payload.action.payload )
    this.dispatch(payload);
    
  }

});

module.exports = AppDispatcher;