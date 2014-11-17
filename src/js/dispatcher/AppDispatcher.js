var FretboardConstants = require('../constants/FretboardConstants');
var Dispatcher = require('flux').Dispatcher;
var PayloadSources = FretboardConstants.PayloadSources;
var objectAssign = require('react/lib/Object.assign');

var AppDispatcher = objectAssign(new Dispatcher(), {

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the server.
   */
  handleServerAction: function(action) {
    
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    console.log("Dispatcher: " + payload.source , payload)
    
    this.dispatch(payload);
    
  },

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the view.
   */
  handleViewAction: function(action) {
    var payload = {
      source:  PayloadSources.VIEW_ACTION,
      action: action
    };
    console.log("Dispatcher: " + payload.source , payload)
    this.dispatch(payload);
    
  }

});

module.exports = AppDispatcher;