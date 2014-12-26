'use strict';

var Teoria = require('Teoria');
var Immutable = require('Immutable');

var Utils = {
  chromaticScale: ['C','C#/Db','D','D#/Eb','E','F','F#/Gb', 'G', 'G#/Ab', 'A','A#/Bb','B'],
  
  stringToArray:function(stringOrArray){
    return ( "string" !== typeof stringOrArray ?  stringOrArray : (stringOrArray).split(",") );
  },
  
  extractRoot:function(name){
    var root = name.charAt(0).toUpperCase();
    if (name.charAt(1) === "#" || name.charAt(1) === "b") { root+=name.charAt(1); }
    return root;
  },
  
  extractSymbol:function(name){
    var index = 1;
    if (name.charAt(index) === "#" || name.charAt(index) === "b"){
      index+=1;
    }
    if (name.charAt(index) === " "){
      index+=1;
    }
    return name.slice(index);
  },

  // takes a name and return Teoria Scale or Teoria Chord
  parseScaleOrChord:function(name){
    
    var root = Utils.extractRoot.call(this, name);
    var symbol = Utils.extractSymbol.call(this, name);
    
    return name.indexOf(" ") > 0  ? Teoria.scale(root, symbol) : Teoria.chord(root + symbol);
     
  },

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
                };
              });
              
      return Immutable.List(activeNotes);

  },
  _getIntervalByChroma: function(activeNotes,chroma){
    
    var note = activeNotes.find(function(note){
      return note.chroma === chroma;
    });

    return note ? note.interval : undefined;
  },
  _mapNote:function (activeNotes, note) {
    
    var _chroma =  note.chroma();
    var noteName = this.chromaticScale[_chroma];
  
    return {
      name    : noteName,
      chroma  : _chroma,
      interval: this._getIntervalByChroma(activeNotes,_chroma)
    };
  },
  _getChromaticScale:function (activeNotes, stringRoot) {
    
    return Teoria.scale(stringRoot , "chromatic" ).notes().map(this._mapNote.bind(this,activeNotes));
  },
  createImmutableDataMap:function(stringRootsArray, parsedScaleOrChord ){

    var activeNotes = this._mapActiveNotes( parsedScaleOrChord );
      
    var fretboardMap = Immutable.List( stringRootsArray ).reverse().map( this._getChromaticScale.bind( this, activeNotes) );
    
    return fretboardMap;
  }
};

module.exports = Utils;