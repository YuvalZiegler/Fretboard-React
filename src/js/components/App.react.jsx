var Fretboard = require('./Fretboard.react.jsx');
var Debug = require('./Debug.react.jsx');
var FretboardStore = require('../stores/FretboardStore');

var React = require('react/addons');

function getStateFromStores() {
  return FretboardStore.getState()
}

var App = React.createClass({

    getDebugView:function(){
        return process.env.NODE_ENV == "development" ? <Debug/> : null
    },

    getInitialState:function(){
        return {
            name   : "C major",
            strings : "a,b,c,d,e,f,g"
        }
    },

    render: function() {
        
        return ( 
          <div id="application">
            {this.getDebugView()}
            <Fretboard strings={ this.state.strings } name={ this.state.name }  />
            
         </div>
        )
    },

    componentDidMount: function () {
        FretboardStore.addChangeListener(this._onChange);
    },
     
    _onChange: function () {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        console.log("~~ App ::  _onChange ")
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        this.setState( getStateFromStores() );
    }

});

module.exports = App;