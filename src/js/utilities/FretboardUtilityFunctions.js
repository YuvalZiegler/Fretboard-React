
var Teoria = require('Teoria')
var Immutable = require('Immutable');

if(window){
  window.Immutable = Immutable;
  window.Teoria    = Teoria;
}

var _ = require ('lodash')
Utils = {
  stringToArray:function(stringOrArray){
    return ( "string" != typeof stringOrArray ?  stringOrArray : (stringOrArray).split(",") );
  },
  extractRoot:function(name){
    var root = name.charAt(0).toUpperCase();
    if (name.charAt(1) == "#" || name.charAt(1) == "b") root+=name.charAt(1) 
    return root
    
  },
  extractSymbol:function(name){
    var index = 1;
    if (name.charAt(index) == "#" || name.charAt(index) == "b"){
      index+=1
    }
    if (name.charAt(index) == " "){
      index+=1
    }
    return name.slice(index)
  },

  // takes a name and return Teoria Scale or Teoria Chord
  parseScaleOrChord:function(name){
    
    var root = Utils.extractRoot.call(this, name)
    var symbol = Utils.extractSymbol.call(this, name)
    
    return name.indexOf(" ") > 0  ? Teoria.scale(root, symbol) : Teoria.chord(root + symbol) 
     
  },

  ////////////////////////////////////////////////////////////////////////////////
  //////////
  //////////
  //////////    TODO: CREATE IMMUTABLE OBJECT WITH COMPLETE GRID DATA (???)
  //////////
  //////////
  ////////////////////////////////////////////////////////////////////////////////
  _mapActiveNotes:function(parsedScaleOrChord){
    
      var activeNotes =  parsedScaleOrChord
              .notes()
              .map( function(note,index) { 
                // normalize Teoria inconsistencies
                var intervals = parsedScaleOrChord.intervals || parsedScaleOrChord.scale;
                return {
                  "name" : note.toString(true), 
                  "interval":intervals[index].toString(), 
                  "chroma" : note.chroma()
                }
              })
              
      return Immutable.List(activeNotes)        

  },
  _getIntervalByChroma: function(activeNotes,chroma){
    
    var note = activeNotes.find(function(note){
      return note.chroma == chroma
    })

    return note ? note.interval : undefined
  },
  _mapNote:function (activeNotes, note) {
    var _chroma =  note.chroma();
    return {
      name    : note.toString(true),
      chroma  : _chroma,
      interval: this._getIntervalByChroma(activeNotes,_chroma)
    }
  },
  _getChromaticScale:function (activeNotes, stringRoot) {
    
    return (Teoria.scale(stringRoot , "chromatic" ).notes()).map(this._mapNote.bind(this,activeNotes))
  },
  createImmutableDataMap:function(stringRootsArray, parsedScaleOrChord ){
      
    console.log("✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿")
    console.log("✿ createImmutableDataMap ✿")
    console.log("✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿")
    
    // Data Structure
    // // Array of strings
    // [  
    //     // Array of notes sorted by string root 
    //    [
    //       {name:"c",  chroma:0 ,interval:"P1"       },
    //       {name:"c#", chroma:1 ,interval:undefined },
    //       {name:"d",  chroma:2 ,interval:undefined },
    //       {name:"d#", chroma:3 ,interval:undefined },
    //       {name:"e",  chroma:4 ,interval:"M3"      },
    //       {name:"f",  chroma:5 ,interval:undefined },
    //       {name:"f#", chroma:6 ,interval:undefined },
    //       {name:"g",  chroma:7 ,interval:"P5"      },
    //       ...
    //    ],
    //    [...]
    // ]  

    var activeNotes = this._mapActiveNotes( parsedScaleOrChord )
       
    var fretboardMap = Immutable.List( stringRootsArray ).map(this._getChromaticScale.bind( this, activeNotes) ) 
    
    return fretboardMap
  },
}

module.exports = Utils