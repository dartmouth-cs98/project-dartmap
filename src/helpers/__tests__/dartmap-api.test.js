// dartmap-api.test.js

import postNewEvent from '../dartmap-api';

var nock = require('nock');
var mockapi;
const apiSuccessMessage = 'Event Created';

describe('postNewEvent', () => {
  beforeEach(() => {
    mockapi = nock('https://dartmapapi.herokuapp.com').post('/submitevent/').reply(201, apiSuccessMessage);
  });
  it('should POST data to the database', () => {
    const eventData = { name: 'test event 1' };
    const response = postNewEvent(eventData);
    console.log(response);
    console.log(response.getResponseHeader);
    console.log(response.getAllResponseHeaders);
    expect(response).toContain(apiSuccessMessage);
  });
});
