var App = require('./components/App.react');
var FretboardStartingData = require('./fixtures/FretboardStartingData');
var FretboardAPI = require('./utilities/FretboardAPI');

// attached to window to enable debugging with devTools
var React  = window.React = require('react');

React.render(
  <App/>,
  document.getElementById('react')
);

FretboardStartingData.init();
FretboardAPI.getState();
