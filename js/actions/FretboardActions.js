var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/FretboardConstants').ActionTypes;

var FretboardActions = {

  consumeConfiguration: function (payload) {

    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_INITIAL_STATE,
      payload: payload
    });
  },

  updateState: function (payload) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.UPDATE_STATE,
      payload: payload
    });
  }


};

module.exports = FretboardActions;