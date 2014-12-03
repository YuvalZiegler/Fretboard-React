var keyMirror = require('react/lib/keyMirror');

module.exports = {
  
  CHANGE_EVENT: 'change',
  
  ActionTypes: keyMirror({
    RECEIVE_INITIAL_STATE: null,
    UPDATE_STATE:null
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};