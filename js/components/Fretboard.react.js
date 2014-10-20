var FretboardString = require('./String.react');
var FretboardStore = require('../stores/FretboardStore');

var React = require('react');

function getStateFromStores() {
  return FretboardStore.getState()
}


var Fretboard = React.createClass({
  getInitialState: function () {
    return {loaded: false}
  },

  getStringView: function () {

    var strings = [];
    // TODO: Make strings configuration selectable
    var stringsRoots = this.state.fretboardStrings.guitar;

    for (var l = stringsRoots.length; l > 0; l--) {

      strings.push(
          <FretboardString
              key={"String" + l}
              note={stringsRoots[(l - 1)]}
          />
      )
    }

    return (
        <div id="fretboard">{strings}</div>
    );
  },
  getLoadingView: function () {
    return (<div className="loading">loading</div>);
  },
  render: function () {
    console.log("View:" + __filename, this.state);
    return this.state.loaded ? this.getStringView() : this.getLoadingView();
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