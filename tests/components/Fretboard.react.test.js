var expect = require('chai').expect;

describe('Fretboard', function() {
  it('is working', function() {
    var React = require('react/addons');
    var Fretbroad = require('../../js/components/Fretboard.react.js');
    var TestUtils = React.addons.TestUtils;

    // Render a checkbox with label in the document
    var fretboard = TestUtils.renderIntoDocument(
      <Fretbroad  />
    );

    expect('Off').to.equal('On');
  });
});
