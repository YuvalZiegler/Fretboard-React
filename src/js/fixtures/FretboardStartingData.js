module.exports = {

  init: function () {

    localStorage.setItem('fretboardConfig', JSON.stringify({
          name: "cm7b5",         
          // display: name / interval
          display: "name",
          // string configuration from lowest to highest
          stringConfiguration:["e,a,b,c,d"],
          fretboardStrings: {
            guitar: ["e2", "a2", "d3", "g3", "b3", "e4"],
            bass: ["e2", "a2", "d3", "g3"],
            singleString: ["f#"],
            testBoard:["c","g","f#","bb","ab"]
          }

        })
    )
  }
}