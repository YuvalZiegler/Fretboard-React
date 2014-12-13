var expect = require('chai').expect;


describe('Fretboard', function() {
  var React = require('react/addons');
  var Fretbroad = require('../../src/js/components/Fretboard.react.jsx');
  var TestUtils = React.addons.TestUtils;
  var instance;

  it('it should mount with no props', function() {
    inst = TestUtils.renderIntoDocument(
        <Fretbroad/>
    );
    expect( TestUtils.isElement(<Fretbroad/>) ).to.equal( true );
    expect( TestUtils.isCompositeComponent(inst) ).to.equal( true );
    expect( inst.isMounted() ).to.equal( true );
  });
  
  
});

