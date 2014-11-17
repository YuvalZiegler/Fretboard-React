var FretboardString = require('./String.react');
var FretboardStore = require('../stores/FretboardStore');

var React = require('react/addons');

function getStateFromStores() {
  return FretboardStore.getState()
}


var Fretboard = React.createClass({
  getInitialState: function () {
    return {loaded: false}
  },

  getStringComponents: function () {

    var strings = [];
    // TODO: Make strings configuration selectable
    var stringsRoots = this.state.fretboardStrings[this.state.stringConfiguration]
    
    for (var l = stringsRoots.length; l--;) {
      strings.push(
          <FretboardString
              key={"String_" + l}
              note={stringsRoots[l]}
          ></FretboardString>
      )
    }

    return (
        <div id="fretboard">{strings}</div>
    );
  },
  getLoadingCompoent: function () {
    return (<div className="loading">loading</div>);
  },
  render: function () {
    console.log("View:" + __filename, this.state);
    return this.state.loaded ? this.getStringComponents() : this.getLoadingCompoent();
  },

  componentDidMount: function () {
    FretboardStore.addChangeListener(this._onChange);
  },

  _onChange: function () {
    console.log("on change triggered");
    this.setState(getStateFromStores());
  }

});

module.exports = Fretboard;