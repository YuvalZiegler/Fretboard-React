'use strict'

var Actions = require('../actions/FretboardActions');
var React = require('react/addons');
var Teoria = require('Teoria');
var TeoriaNote = Teoria.TeoriaNote;
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
    var activeNotes = this.stringToArray(this.props.activeNotes).map( function( noteName ){
        return Teoria.note(noteName).chroma()
    })

    for (var index = stringsArray.length; index--;) {
     
      strings.push(
          <FretboardString
              key = { "String_" + index   }
              note= { stringsArray[index] }
              activeNotes = { activeNotes }
          ></FretboardString>
      )

    }

    return strings;
  },

  render: function () {
    
    return <div id="fretboard">{ this.getStrings() }</div>
  },
});

var FretboardString = React.createClass({
  propTypes: {
    note: React.PropTypes.string.isRequired
  },
  getFrets  : function (noteName) {
    
    var tonic      = Teoria.note.fromString(noteName);
    var scale      = Teoria.scale(tonic, "chromatic");
    
    return scale.notes().map(function(note){
        return ( Teoria.note.fromFrequency( note.fq() ) ).note;
    });
  },
  
  _getIntervalName : function(note){
    
    var tonic = Teoria.note.fromString(this.props.note);
    var semitones = Teoria.interval(tonic,note).semitones()
    
    if (semitones<0){ semitones+=12; } else if(semitones==12){semitones=0};
    return Teoria.interval( Teoria.scale.scales.chromatic[semitones] ).name();
  },
  getCssClasses    : function(note){
    var classes= "fret"
    
    if ( this.props.activeNotes &&  this.props.activeNotes.indexOf( note.chroma() ) >= 0) {
      classes +=" active " + this._getIntervalName( note )
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
          <ReactTransitionGroup component="string" className="string" data-tune={ this.props.note } >
            { frets }
          </ReactTransitionGroup>
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
    note:React.PropTypes.instanceOf(TeoriaNote).isRequired
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


