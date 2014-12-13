var expect = require('chai').expect;
var Teoria = require('Teoria')

describe('FretboardUtilities', function() {
  
  var Utils = require('../../src/js/utilities/FretboardUtilityFunctions.js');

  describe('stringToArray', function() {
    var stringToArray = Utils.stringToArray
    it('should return an array when passed a string', function() {
      expect( stringToArray("a,b,c,d") ).to.eql( ["a","b","c","d"] );
    });
  });
  
  describe('extractRoot', function() {
    var extractRoot = Utils.extractRoot

    it('given cm7 should return C', function(){
      expect(extractRoot("cm7")).to.eql("C")
    })
    
    it('given c#m7 should return C#', function(){
      expect(extractRoot("c#m7")).to.eql("C#")
    })
    
    it('given cb major should return Cb', function(){
      expect(extractRoot("cb major")).to.eql("Cb")
    })
    
    it('given c should return C', function(){
      expect(extractRoot("c")).to.eql("C")
    })
  
  });
  
  describe('extractSymbol', function() {
    var extractSymbol = Utils.extractSymbol
    it('given c should return an empty string',function(){
      expect( extractSymbol("c") ).to.eql('' )
    })

    it('given cm7 should return m7',function(){
      expect( extractSymbol("cm7") ).to.eql("m7" )
    })

    it('given c#m7 should return m7',function(){
      expect( extractSymbol("c#m7") ).to.eql("m7" )
    })

    it('given c major should return major',function(){
      expect( extractSymbol("c major") ).to.eql("major" )
    })

    it('given c# major should return major',function(){
      expect( extractSymbol("c# major") ).to.eql("major" )
    })

  });

  describe('parseScaleOrChord', function() {
    var parseScaleOrChord = Utils.parseScaleOrChord

    it('given c should return c chord',function(){
      expect( parseScaleOrChord("c") ).to.eql( Teoria.chord("c") )
    })

    it('given cm7 should return cm7 chord',function(){
      expect( parseScaleOrChord("cm7") ).to.eql( Teoria.chord("cm7") )
    })

    it('given c major should return c major scale',function(){
      expect( parseScaleOrChord("c major") ).to.eql( Teoria.scale("C","major") )
    })

    it('given c# dorian should return c# dorian scale',function(){
      expect( parseScaleOrChord("c# dorian") ).to.eql( Teoria.scale("C#","dorian") )
    })

  });

  describe('createImmutableDataMap',function(){
    
    var stringArray =   ["e","a","d","g"]; 
    var parsedScaleOrChord = Utils.parseScaleOrChord("c")
    var createImmutableDataMap = Utils.createImmutableDataMap;


    it('should show me the money', function(){
      expect( createImmutableDataMap( stringArray , parsedScaleOrChord ) )
      .to.eql( false )

    })

  })

});
