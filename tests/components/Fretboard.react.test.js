var expect = require('chai').expect;
/* Component Attributes:

   <Fretbroad  
      strings="{[ "e","a","d","g","b", "e" ]}
      frets=12 
      activeNotes={["c","e","g"]}
      display=("notes" or "intervals")
   />

*/

describe('Fretboard', function() {
  var React = require('react/addons');
  var Fretbroad = require('../../src/js/components/Fretboard.react.js');
  var TestUtils = React.addons.TestUtils;
  var instance;
  beforeEach(function(done){
      
      instance = TestUtils.renderIntoDocument(
        <Fretbroad strings={["a","e","c","d"]}/>
      );

      done()
  })
  it('its alive', function() {
    
    expect( instance.isMounted() ).to.equal( true );
  });
  
  
});
