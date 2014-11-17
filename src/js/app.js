var App = require('./components/App.react');
var FretboardStartingData = require('./fixtures/FretboardStartingData');
var FretboardAPI = require('./utilities/FretboardAPI');

// attached to window to enable debugging with devTools
var React =  require('react/addons');

React.render(
  <App/>,
  document.getElementById('react')
);

FretboardStartingData.init();
FretboardAPI.getState();

 if ("development" == process.env.NODE_ENV && window){
  window.React = React;
  window.Teoria = require('teoria');
 }
