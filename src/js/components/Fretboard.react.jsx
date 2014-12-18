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
var _state;
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
    return _state.map(function(frets,index){ 
      return ( <FretboardString key={"string-"+index} frets={ frets }/> )}
    )
  },

  render: function () {
    _state = Utils.createImmutableDataMap( Utils.stringToArray(this.props.strings), Utils.parseScaleOrChord( this.props.name) )
       
    return <div className="fretboard">{ this.getStrings().toJS() }</div>
  },
});

////////////////////////////////////////////////////////////////////////////////
/////////// FRETBOARD STRING COMPONENT  
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

var FretboardString = React.createClass({
  
  propTypes: {
    frets: React.PropTypes.array.isRequired,
  },

  _openStringUI:function(){
     // this.setState({stringUIState:"show-ui"});
  },
  _closeStringUI:function(){
    //this.setState({stringUIState:""});
  },
  render: function () {
    
    return (
    
          <div className="string" >
              { 
              this.props.frets.map(function(fret, index){
               return (<Fret 
                          key={"fret-"+index} 
                          chroma={fret.chroma}
                          interval={fret.interval}
                          noteName={fret.name}/>)
              }) 
            }
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

  render: function() {
    
    return (
     <div className="fret-wrapper">
        <div className={ "fret " + ( this.props.interval ? " active " + this.props.interval  : "")} data-note-id={ this.props.chroma } >
          <Note noteName={ this.props.noteName } />
        </div>
     </div>
    )
  }
});

var Note = React.createClass({
  propTypes:{
    noteName : React.PropTypes.string.isRequired,
    active   : React.PropTypes.bool,
    interval : React.PropTypes.string
  },
  _onClick:function(event, value){
    Actions.updateRoot({ root: this.props.noteName })
  },

  render:function(){
    
     return(
      <div className="note" onClick={ this._onClick }>
        <span >
          { this.props.noteName }
        </span>
        </div>
      )
  }
})

// Attaching classes to the module export for test?
Fretboard.FretboardString = FretboardString;
Fretboard.StringUI        = StringUI;
Fretboard.Fret            = Fret;
Fretboard.Note            = Note;

module.exports = Fretboard;



