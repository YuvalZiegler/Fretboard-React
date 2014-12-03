var Fretboard = require('./Fretboard.react');

var Debug = require('./Debug.react');

var FretboardStore = require('../stores/FretboardStore');

var React = require('react/addons');

var FretboardStore = require('../stores/FretboardStore');

function getStateFromStores() {
  return FretboardStore.getState()
}

var App = React.createClass({
    
    getDebugView:function(){
        return process.env.NODE_ENV == "development" ? <Debug/> : null
    },
    getInitialState:function(){
        return {
            tonic: "e",
            strings:"a,b,c,d,e,f,g",
            activeNotes:"e,c,g"
        }
    },
    render: function() {
        
        return ( 
          <div id="application">
            {this.getDebugView()}
            <Fretboard strings={ this.state.strings } activeNotes={ this.state.activeNotes }  />
            
         </div>
        )
    },
    componentDidMount: function () {
        FretboardStore.addChangeListener(this._onChange);
    },
     
    _onChange: function () {
        console.log("_onChange Called on App Component")
        console.log("getStateFromStores(): ", getStateFromStores() )
        this.setState( getStateFromStores() );
    }

});

module.exports = App;