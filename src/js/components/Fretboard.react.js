'use strict'

var FretboardString = require('./String.react');
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
      strings:"e,a,d,g,b,e",
      activeNotes:null
    };
  },
  
  getStrings: function () {

    var strings = [];
    
    // convert string to array if needed
    var stringsArray = typeof this.props.strings ===  ("string") ? 
              (this.props.strings).split(",") : this.props.strings

    for (var index = stringsArray.length; index--;) {
     
      strings.push(
          <FretboardString
              key= { "String_" + index}
              note={ stringsArray[index]  }
              activeNotes = { this.props.activeNotes }
          ></FretboardString>
      )

    }

    return strings;
  },

  render: function () {

    return <div id="fretboard">{this.getStrings()}</div>
  }

});

module.exports = Fretboard;