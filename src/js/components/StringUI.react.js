var React = require('react/addons');

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