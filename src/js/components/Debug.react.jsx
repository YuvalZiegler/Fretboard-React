var React = require('react/addons');
if ("development" == process.env.NODE_ENV && window){
  window.React = React;
  window.Teoria = require('teoria');
}

var Debug = React.createClass({

  render: function() {
    return ( 
      <div id="debug">
        React {React.version}, Env: {process.env.NODE_ENV}
      </div>
    )
  }

});

module.exports = Debug;