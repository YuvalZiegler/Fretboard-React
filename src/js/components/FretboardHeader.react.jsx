var React = require('react/addons');

var FretboardHeader = React.createClass({
  render:function(){
    return (
      <header>
        <h1>Fretboard: {this.props.name}</h1>
      </header>
    )
  }

})
module.exports = FretboardHeader;

