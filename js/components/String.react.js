var StringUI = require('./StringUI.react');
var Fret = require('./Fret.react');
var FretboardStore = require('../stores/FretboardStore');
var React = require('react');
var Teoria = require('Teoria');

function getStateFromStores() {
  return FretboardStore.getState()
}

var FretboardString = React.createClass({

  getInitialState: function () {

    var tonic      = Teoria.note.fromString(this.props.note);
    
    var scale      = Teoria.scale(tonic, "chromatic");
    
    var notes      = scale.notes().map(function(note){
        
        return ( Teoria.note.fromFrequency( note.fq() ) ).note;
    
    });
    
    return { notes: notes };
  },
  _getIntervalName:function(note){

    var note = Teoria.note.fromString( note.name() + note.accidental()+"2" );
    var tonic = Teoria.note.fromString(FretboardStore.get("tonic")+"2");
    var semitones = Teoria.interval(tonic,note).semitones()

    if (semitones<0){ semitones+=12; } else if(semitones==12){semitones=0};
    return Teoria.interval( Teoria.scale.scales.chromatic[semitones] ).name();
  },
  getCssClasses: function(note){
    var classes= "fret"
    
    if ( FretboardStore.get("activeNotes").indexOf( note.chroma() ) >= 0) {
      classes +=" active " +this._getIntervalName(note)
    }
    
    return classes;
  },
  render: function () {

    var frets = [];
    for (var i = 0, l = this.state.notes.length; i < l; i++)

      frets.push(
              <Fret
                key     = { this.state.notes[i].chroma() } 
                chroma  = { this.state.notes[i].chroma() }
                note    = { this.state.notes[i] } 
                classes = { this.getCssClasses( this.state.notes[i] ) } />
      );

    return (
        <div>
          <StringUI/>
          <ul className="string" data-tune={ this.props.note } onClick={ this._onClick }>
             {frets}
          </ul>
        </div>
    )
  },
  componentDidMount: function () {
    FretboardStore.addChangeListener(this._onChange);
  },
 
  _onChange: function () {
    this.setState(getStateFromStores());
  }

});

module.exports = FretboardString;