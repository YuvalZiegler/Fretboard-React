var FretboardString = require('./String.react');
var FretboardStore = require('../stores/FretboardStore');
var Teoria = require('teoria');
var React = require('react/addons');

var Fretboard = React.createClass({
  
  propTypes:{
    strings: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.array
    ])
  },
  getDefaultProps: function(){
    return {
      strings:"e,a,b,c"
    }
  },
  
  getStrings: function () {

    var strings = [];
    
    // convert string to array if needed
    var arr = typeof this.props.strings ===  ("string") ? 
              (this.props.strings).split(",") : this.props.strings

    for (var l = arr.length; l--;) {
     
      strings.push(
          <FretboardString
              key= {"String_" + l}
              note={ arr[l] }
          ></FretboardString>
      )

    }

    return strings;
  },

  render: function () {
    return <div id="fretboard">{this.getStrings()}</div>
  },

});

module.exports = Fretboard;