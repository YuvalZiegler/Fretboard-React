var React = require('react');

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

module.exports = StringUI;