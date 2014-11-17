var React = require('react/addons');
var FretboardStore = require('../stores/FretboardStore');
var Actions = require('../actions/FretboardActions');
var TeoriaNote = require('teoria').TeoriaNote

var Fret = React.createClass({
  propTypes:{
    note:React.PropTypes.instanceOf(TeoriaNote).isRequired
  },
  _onClick:function(event, value){
    Actions.updateState({ tonic: (this.props.note.name()).toUpperCase() + this.props.note.accidental()})
  },

  componentWillEnter:function(callback){
    console.log("Component Will Enter");
  },

  componentDidEnter:function(){
    console.log("component Did Enter");
  },

  render: function() {
    
    var text =  ( this.props.note.name() ).toUpperCase() + this.props.note.accidental();
    
    return ( 
     <div className="fret-wrapper">
        <div className={ this.props.classes } data-note-id={ this.props.chroma } >
          <div className="note" onClick={ this._onClick }>{ text }</div>
        </div>
     </div>
    )
  }


});

module.exports = Fret;


