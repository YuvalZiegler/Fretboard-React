var expect = require('chai').expect;
/* Component Attributes:

   <Fretbroad  
      strings=e2,a2,d2,g3,b3,e3"
      frets=12 
      activeNotes="c,g,e"
      display=("notes" or "intervals")
   />

*/

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
