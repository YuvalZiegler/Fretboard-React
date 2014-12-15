var expect = require('chai').expect;
var Teoria = require('Teoria')
var Immutable =  require('Immutable');


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

  describe('Immutable Data tests',function(){
    
    var stringArray =   ["e","a","d","g"]; 
    var cMajorScale = Utils.parseScaleOrChord("c major")
    var cChord = Utils.parseScaleOrChord("c")
    var fretboardMap; 
    
    describe('_mapActiveNotes',function(){
        it('should return an Immutable.List of active notes', function(){
          expect( cMajorScale.notes().length).to.equal(Utils._mapActiveNotes( cMajorScale ).size)
          expect( cChord.notes().length).to.equal(Utils._mapActiveNotes( cChord).size)
          
          
        })

    });
    describe('_getIntervalByChroma',function(){
        it('return interval name by chroma if found', function(){
          var activeNotes  = Utils._mapActiveNotes( cChord)
          expect(Utils._getIntervalByChroma(activeNotes,0)).to.equal("P1")
          expect(Utils._getIntervalByChroma(activeNotes,7)).to.equal("P5")
        })
        it('return undefined if not found', function(){
          var activeNotes  = Utils._mapActiveNotes( cChord)
          expect(Utils._getIntervalByChroma(activeNotes,1)).to.equal(undefined)
        })
    });
    describe('createImmutableDataMap',function(){
      var data = Utils.createImmutableDataMap( stringArray , cMajorScale )
      it('data should be defined', function(){
        expect(data).to.be.defined
        console.log(data.toJS())
      })
      
     
   
    })



  })

});
