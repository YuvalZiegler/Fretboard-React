var Fretboard = require('./Fretboard.react');

var Debug = require('./Debug.react');

var FretboardStore = require('../stores/FretboardStore');

var React = require('react/addons');

var App = React.createClass({
    
    getDebugView:function(){
        return process.env.NODE_ENV == "development" ? <Debug/> : null
    },
    render: function() {
        
        return ( 
          <div id="application">
            {this.getDebugView()}
            <Fretboard/>
            
         </div>
        )
    }
});

module.exports = App;