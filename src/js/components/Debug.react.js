var React = require('react');

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