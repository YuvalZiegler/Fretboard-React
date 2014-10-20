var React = require('react');
var FretboardStore = require('../stores/FretboardStore');
var Actions = require('../actions/FretboardActions');
var Teoria = require('Teoria')

var Fret = React.createClass({
  
  _onClick:function(event, value){
    Actions.updateState({ tonic: (this.props.note.name()).toUpperCase() + this.props.note.accidental()})
  },
  
  render: function() {

    var text =  ( this.props.note.name() ).toUpperCase() + this.props.note.accidental();
    
    return ( 
      
      <li className={ this.props.classes } data-note-id={ this.props.chroma } >

        <div className="note" onClick={ this._onClick }>{ text }</div>

      </li>
    )
  }


});

module.exports = Fret;


