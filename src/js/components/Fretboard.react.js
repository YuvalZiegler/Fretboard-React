'use strict'

var Actions = require('../actions/FretboardActions');
var React = require('react/addons');
var Teoria = require('Teoria');
var Utils = require('../utilities/FretboardUtilityFunctions');
var _ = require('lodash');
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
    name: React.PropTypes.string,
    display: React.PropTypes.oneOf(['notes', 'intervals'])
  },

  getDefaultProps: function(){
    return {
      strings:"e,a,d,g,b,e",
      name:"C major"
    };
  },

  // convert string to array if needed
  stringToArray:function(stringOrArray){
    return ( "string" != typeof stringOrArray ?  stringOrArray : (stringOrArray).split(",") );
  },
  
  getStrings: function () {
    var strings = [];

    // convert string to array if needed
    var stringsArray            = Utils.stringToArray(this.props.strings);
    var parsedNameScaleOrChord  = Utils.parseScaleOrChord(this.props.name)
    
    // populate string array with FretboardString Component
    for (var index = stringsArray.length; index--;) {
      strings.push(
          <FretboardString
              key = { "String_" + index   }
              stringRoot  = { stringsArray[index] }
              activeNotes = { parsedNameScaleOrChord.notes() }
              intervals   = { parsedNameScaleOrChord.intervals || parsedNameScaleOrChord.scale  }
          ></FretboardString>
      )
    }

    return strings;
  },

  render: function () {

    return <div className="fretboard">{ this.getStrings() }</div>
  },
});
/////////// FRETBOARD STRING COMPONENT
var FretboardString = React.createClass({
  
  propTypes: {
    stringRoot: React.PropTypes.string.isRequired,
  },

  getFrets  : function (noteName) {

    var stringRoot = Teoria.note.fromString(noteName);
    var fretsList  = Teoria.scale(stringRoot, "chromatic");

    return fretsList.notes().map(function(note){
        return ( Teoria.note.fromFrequency( note.fq() ) ).note;
    });
  },

  noteIsActive:function(note){
    return _.find( this.props.activeNotes, function(activeNote){
      return activeNote.chroma() == note.chroma()
    });
  },
  getIntervalName:function(note){   
    return this.props.intervals[ _.findIndex(this.props.activeNotes,function(activeNote){
      return activeNote.chroma() === note.chroma();
    }) ]

  },

  getCssClasses : function(note){
    
    var classes= "fret"
    
    if (this.noteIsActive(note)){
      classes +=" active " + this.getIntervalName(note);
    }

    return classes;
  },

  render: function () {

    var notes = this.getFrets(this.props.stringRoot)
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

/////////// STRING UI
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
/////////// FRET COMPONENT
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
    Actions.updateRoot({ root: this.props.name })
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


