var expect = require('chai').expect;


describe('Fretboard', function() {
  var React = require('react/addons');
  var Fretbroad = require('../../src/js/components/Fretboard.react.js');
  var TestUtils = React.addons.TestUtils;
  var instance;

  it('its should mount with no props', function() {
    instance = TestUtils.renderIntoDocument(
        <Fretbroad/>
    );
    expect( instance.isMounted() ).to.equal( true );
  });
  
  
});
