'use strict'

var Actions = require('../actions/FretboardActions');
var React = require('react/addons');
var Teoria = require('Teoria');
var ReactTransitionGroup = React.addons.TransitionGroup;

/*********************************
//  FRETBOARD COMPONENT
//  Properties:
//  strings ( Array / String ) :  ["c","e","g"] or "e,a,d,g,a,e"
//  activeNotes ( Array / String ) :  ["c","e","g"] or "c,e,f,g,a,b,c"
//  display ('notes','intervals')
**********************************/

var Fretboard = React.createClass({

  propTypes:{
    strings: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.array
    ]),
    activeNotes: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array
    ]),
    display: React.PropTypes.oneOf(['notes', 'intervals'])
  },

  getDefaultProps: function(){
    return {
      strings:"e,a,d,g,b,e",
      activeNotes:"c,e,g"
    };
  },

  // convert string to array if needed
  stringToArray:function(stringOrArray){
    return ( "string" != typeof stringOrArray ?  stringOrArray : (stringOrArray).split(",") );
  },
  getStrings: function () {
    var strings = [];

    // convert string to array if needed
    var stringsArray = this.stringToArray(this.props.strings)
    
    // convert active notes to chromas
    var activeNotes = this.stringToArray( this.props.activeNotes )
    // create an array of chromas for active note comparison
    var activeNotesChromas = activeNotes.map( function( noteName ) {
        return Teoria.note(noteName).chroma()
    })

    var tonic = Teoria.note.fromString(activeNotes[0])
    
    // populate string array with FretboardString Component
    for (var index = stringsArray.length; index--;) {
      strings.push(
          <FretboardString
              key = { "String_" + index   }
              tonic = { tonic }
              note= { stringsArray[index] }
              activeNotes = { activeNotes }
              activeNotesChromas = { activeNotesChromas }
          ></FretboardString>
      )

    }

    return strings;
  },

  render: function () {

    return <div className="fretboard">{ this.getStrings() }</div>
  },
});

var FretboardString = React.createClass({
  propTypes: {
    tonic: React.PropTypes.instanceOf(Teoria.TeoriaNote),
    note: React.PropTypes.string.isRequired,
    activeNotes: React.PropTypes.array
  },

  getFrets  : function (noteName) {

    var stringRoot = Teoria.note.fromString(noteName);
    var scale      = Teoria.scale(stringRoot, "chromatic");

    return scale.notes().map(function(note){
        return ( Teoria.note.fromFrequency( note.fq() ) ).note;
    });
  },
  getIntervalName:function(note){
    var interval = Teoria.interval(this.props.tonic, note)
    console.log(interval)
    return interval.base()
  },

  getCssClasses    : function(note){
    var classes= "fret"
    
    if ( this.props.activeNotesChromas &&  this.props.activeNotesChromas.indexOf( note.chroma() ) >= 0) { 
      
      classes +=" active " + this.getIntervalName(note)
    }

    return classes;
  },
  render: function () {

    var notes = this.getFrets(this.props.note)
    var frets = [];

    for (var i = -1, l = notes.length; l > ++i; )

      frets.push(
              <Fret
                key     = { notes[i].chroma() }
                chroma  = { notes[i].chroma() }
                note    = { notes[i] }
                classes = { this.getCssClasses( notes[i] ) } />
      );

    return (
        <div>
           <StringUI/>
          <div className="string">
           
              { frets }
          </div>
        </div>
    )
  }
});

var StringUI = React.createClass({
    render:function(){
        return (
            <div className="ui-wrapper">
                <i className="delete">+</i>
                <i className="add">+</i>
            </div>
        )
    }
});

var Fret = React.createClass({
  propTypes:{
    note:React.PropTypes.instanceOf(Teoria.TeoriaNote).isRequired
  },

  render: function() {

    var noteName =  ( this.props.note.name() ).toUpperCase() + this.props.note.accidental();

    return (
     <div className="fret-wrapper">
        <div className={ this.props.classes } data-note-id={ this.props.chroma } >
          <Note  name={ noteName } />
        </div>
     </div>
    )
  }
});

var Note = React.createClass({
  propTypes:{
    name     : React.PropTypes.string.isRequired,
    active   : React.PropTypes.bool,
    interval : React.PropTypes.string
  },
  _onClick:function(event, value){
    Actions.updateState({ tonic: this.props.name })
  },

  render:function(){
     return(
      <div className="note" onClick={ this._onClick }>
        <span >
          { this.props.name }
        </span>
        </div>
      )
  }
})

module.exports = Fretboard;
