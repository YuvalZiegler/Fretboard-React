'use strict';

var FretboardActions = require('../actions/FretboardActions');

module.exports = {

  getState: function() {
    // simulate retrieving data from a database
    var payload = JSON.parse(localStorage.getItem('fretboardConfig'));
    
    // simulate success callback
    FretboardActions.recieveInitialState(payload);
  }

};