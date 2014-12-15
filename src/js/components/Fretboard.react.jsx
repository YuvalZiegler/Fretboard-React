///////////////////////////////////
// TODO: 
// - numberOfFrets 
// - display Intervals
// - delete add retune string
// - Immutable map
////////////////////////////////////

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
    display: React.PropTypes.oneOf(['notes', 'intervals']),
    numberOfFrets:React.PropTypes.number
  },

  getDefaultProps: function(){
    return {
      strings:"e,a,d,g,b,e",
      name:"C major",
      numberOfFrets:11
    };
  },

  // convert string to array if needed
  stringToArray:function(stringOrArray){
    return ( "string" != typeof stringOrArray ?  stringOrArray : (stringOrArray).split(",") );
  },

  getStrings: function () {
    var strings = [];

    // convert string to array if needed
    var stringRootsArray        = Utils.stringToArray(this.props.strings); 
    // convert string to array if needed
    var parsedScaleOrChord  = Utils.parseScaleOrChord(this.props.name)
    
    // var dataMap = Utils.createImmutableDataMap( stringRootsArray, parsedScaleOrChord )    
    

    // Populate string array with FretboardString Component

    for (var index = stringRootsArray.length; index--;) {
      strings.push(
          <FretboardString
              key = { "String_" + index   }
              stringRoot  = { stringRootsArray[index] }
              activeNotes = { parsedScaleOrChord.notes() }
              intervals   = { parsedScaleOrChord.intervals || parsedScaleOrChord.scale  }
          ></FretboardString>
      )
    }

    return strings;
  },

  render: function () {

    return <div className="fretboard">{ this.getStrings() }</div>
  },
});

////////////////////////////////////////////////////////////////////////////////
/////////// FRETBOARD STRING COMPONENT  
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

var FretboardString = React.createClass({
  
  propTypes: {
    stringRoot: React.PropTypes.string.isRequired,
  },
  getInitialState:function(){
    return {
      stringUIState:""
    }
  },
  getFrets  : function () {

    var stringRoot = Teoria.note.fromString(this.props.stringRoot);
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
  _openStringUI:function(){
      this.setState({stringUIState:"show-ui"});
  },
  _closeStringUI:function(){
    this.setState({stringUIState:""});
  },
  render: function () {

    var notes = this.getFrets()
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
        <div  className={"string-wrapper " + this.state.stringUIState }  
              onMouseEnter={ this._openStringUI } 
              onMouseLeave={ this._closeStringUI} >
          <StringUI/> 
          <div className="string" >
              { frets }
          </div>
          
        </div>
    )
  }
});

/////////////////////////////////////////////////////////////////////////////
/////////// STRING UI ///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

var StringUI = React.createClass({
    removeString:function(){
      console.log("••• removeString •••",arguments)
    },
    addString:function(){
      console.log("••• addString •••",arguments)
      
    },
    retuneString:function(){
        console.log("••• retuneString •••",arguments );
    },
    render:function(){
        return (
          <div className="string-ui-wrapper-anchor">
            <div className="string-ui-wrapper">
                <div className="string-ui-icon-anchor">
                  <i className="delete"     onClick={ this.removeString     }   >x</i>
                  <i className="add"        onClick={ this.addString        }   >+</i>
                  <i className="tune-down"  onClick={ this.retuneString.bind(this, -1) }   >«</i>
                  <i className="tune-up"    onClick={ this.retuneString.bind(this,  1) }   >»</i>
                </div>
            </div>
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



