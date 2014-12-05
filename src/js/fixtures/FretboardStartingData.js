module.exports = {

  init: function () {

    localStorage.setItem('fretboardConfig', JSON.stringify({
          name: "C major",         
          // display: name / interval
          display: "name",
          // string configuration from lowest to highest
          strings:"e,a,d,g,b,e"
        })
    )
  }
}