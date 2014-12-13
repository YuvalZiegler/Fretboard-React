var Teoria = require('Teoria')
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

  createImmutableDataMap:function(stringRootsArray, parsedScaleOrChord ){
      
    console.log("✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿")
    console.log("✿ createImmutableDataMap ✿ ")
    console.log("✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿✿")

    // // Array of strings
    // [  
    //     // Array of notes sorted by string root 
    //    [
    //       {name:"c",  interval:"P"       },
    //       {name:"c#", interval:undefined },
    //       {name:"d",  interval:undefined },
    //       {name:"d#", interval:undefined },
    //       {name:"e",  interval:"M3"      },
    //       {name:"f",  interval:undefined },
    //       {name:"f#", interval:undefined },
    //       {name:"g",  interval:"P5"      },
    //       ...
    //    ],
    //    [...]
    // ]

    return "No implementation"
  },
}

module.exports = Utils