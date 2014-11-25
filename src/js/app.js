var App = require('./components/App.react');
var FretboardStartingData = require('./fixtures/FretboardStartingData');
var FretboardAPI = require('./utilities/FretboardAPI');

var React =  require('react/addons');

React.render(
  <App/>,
  document.getElementById('react')
);

// FretboardStartingData.init();
// FretboardAPI.getState();

