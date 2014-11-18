var expect = require('chai').expect;
/* Component Attributes:

   <Fretbroad  
      strings=e2,a2,d2,g3,b3,e3"
      frets=12 
      activeNotes="c,g,e"
      display=("notes" or "intervals")
   />

*/

describe('FretboardString', function() {
  var React = require('react/addons');
  var FretboardString = require('../../src/js/components/String.react.js');
  var TestUtils = React.addons.TestUtils;
  var instance;

  it('its should not mount with no note prop', function() {
    instance = TestUtils.renderIntoDocument(
        <FretboardString note="a"/>
    );
    expect( instance.isMounted() ).to.equal( true );
  });
  
  
});
