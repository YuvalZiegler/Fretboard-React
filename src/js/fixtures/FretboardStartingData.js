'use strict';

module.exports = {

  init: function () {

    localStorage.setItem('fretboardConfig', JSON.stringify({
          name: "C7b5",         
          // display: name / interval
          display: "name",
          // string configuration from lowest to highest
          strings:"e,a,d,d,a,e"
        })
    );
  }
}